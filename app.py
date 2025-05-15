from flask import Flask, render_template, request, redirect, flash, make_response
import pandas as pd
import os
os.environ["USE_TF"] = "0"
import hashlib
from textblob import TextBlob
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from transformers import pipeline
from fpdf import FPDF




app = Flask(__name__)
app.secret_key = 'secret123'

# Load recipe data
df = pd.read_csv('data/cleaned_output.csv')
df['text'] = df['Name'].fillna('') + ' ' + df['RecipeIngredientParts'].fillna('') + ' ' + df['Keywords'].fillna('')

# TF-IDF preprocessing
vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = vectorizer.fit_transform(df['text'])

# File paths
reviews_file = 'data/user_reviews.csv'

if not os.path.exists(reviews_file):
    pd.DataFrame(columns=['UserID', 'RecipeID', 'RecipeName', 'Rating', 'ReviewText', 'Sentiment']).to_csv(reviews_file, index=False)

def get_user_reviews():
    return pd.read_csv(reviews_file)

def save_user_review(userid, recipe_id, recipe_name, rating, review_text):
    sentiment = TextBlob(review_text).sentiment.polarity if review_text else 0
    new_entry = {
        'UserID': userid,
        'RecipeID': recipe_id,
        'RecipeName': recipe_name,
        'Rating': int(rating),
        'ReviewText': review_text,
        'Sentiment': sentiment
    }
    reviews = get_user_reviews()
    reviews = pd.concat([reviews, pd.DataFrame([new_entry])], ignore_index=True)
    reviews.to_csv(reviews_file, index=False)

@app.route('/')
def home():
    return redirect('/dashboard')

@app.route('/dashboard')
def dashboard():
    all_recipes = df.dropna(subset=['RecipeId', 'Name', 'Images'])[['RecipeId', 'Name', 'Images']].head(200).to_dict(orient='records')
    return render_template('dashboard.html', recipes=all_recipes, user_id='guest')

@app.route('/recipe/<int:recipe_id>', methods=['GET', 'POST'])
def recipe_details(recipe_id):
    recipe_row = df[df['RecipeId'] == recipe_id]
    if recipe_row.empty:
        flash("Recipe not found.")
        return redirect('/dashboard')

    recipe = recipe_row.iloc[0].to_dict()

    # Provide a default image if missing
    if not recipe.get('Images'):
        recipe['Images'] = 'https://via.placeholder.com/300?text=No+Image+Available'

    # Summarize Recipe Instructions using HuggingFace's BART or GPT-3
    summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6", framework="pt")
    recipe_instructions = recipe.get('RecipeInstructions', 'No instructions available.')
    summary = summarizer(recipe_instructions, max_length=50, min_length=30, do_sample=False)[0]['summary_text']

    similar = []

    nutritional_values = {
        'Calories': recipe.get('Calories', 'N/A'),
        'FatContent': recipe.get('FatContent', 'N/A'),
        'SaturatedFatContent': recipe.get('SaturatedFatContent', 'N/A'),
        'CholesterolContent': recipe.get('CholesterolContent', 'N/A'),
        'SodiumContent': recipe.get('SodiumContent', 'N/A'),
        'CarbohydrateContent': recipe.get('CarbohydrateContent', 'N/A'),
        'FiberContent': recipe.get('FiberContent', 'N/A'),
        'SugarContent': recipe.get('SugarContent', 'N/A'),
        'ProteinContent': recipe.get('ProteinContent', 'N/A'),
    }

    if request.method == 'POST':
        rating = int(request.form['rating'])
        review_text = request.form['review_text']
        save_user_review('guest', recipe_id, recipe['Name'], rating, review_text)

        flash("Review submitted successfully!")

        sentiment = TextBlob(review_text).sentiment.polarity if review_text else 0
        if rating >= 4 and sentiment >= 0.1:
            idx = recipe_row.index[0]
            cosine_sim = cosine_similarity(tfidf_matrix[idx], tfidf_matrix).flatten()
            similar_indices = cosine_sim.argsort()[-6:-1][::-1]
            similar = df.iloc[similar_indices][['RecipeId', 'Name', 'Images', 'AggregatedRating']].dropna(subset=['Images']).to_dict(orient='records')

    return render_template(
        'recipe_details.html',
        recipe=recipe,
        similar=similar,
        nutritional_values=nutritional_values,
        recipe_instructions=recipe_instructions,
        recipe_summary=summary  # Pass summary to template
    )


@app.route('/download_shopping_list/<int:recipe_id>')
def download_shopping_list(recipe_id):
    recipe_row = df[df['RecipeId'] == recipe_id]
    if recipe_row.empty:
        flash("Recipe not found.")
        return redirect('/dashboard')

    recipe = recipe_row.iloc[0].to_dict()
    ingredients = recipe.get('RecipeIngredientParts', '').split(',')

    # Create PDF
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    
    pdf.cell(200, 10, txt="Shopping List for " + recipe['Name'], ln=True, align="C")
    
    for ingredient in ingredients:
        pdf.cell(200, 10, txt=ingredient.strip(), ln=True, align="L")
    
    # Save PDF to response
    response = make_response(pdf.output(dest='S').encode('latin1'))
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = f'attachment; filename={recipe["Name"]}_shopping_list.pdf'

    return response

if __name__ == '__main__':
    app.run(debug=True,port=5000)