import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load dataset
df = pd.read_csv("./Dataset1/Cleaned_Indian_Food_Dataset.csv")

# Convert ingredients to lowercase
df["TranslatedIngredients"] = df["TranslatedIngredients"].str.lower()

# TF-IDF Vectorization for ingredients
vectorizer = TfidfVectorizer(stop_words="english")
ingredient_matrix = vectorizer.fit_transform(df["TranslatedIngredients"])

def get_similar_recipes(recipe_id, top_n=5):
    try:
        # Find index of the liked recipe
        index = df[df["_id"] == recipe_id].index[0]
        
        # Compute cosine similarity
        similarities = cosine_similarity(ingredient_matrix[index], ingredient_matrix).flatten()
        
        # Get top N similar recipes (excluding itself)
        similar_indices = similarities.argsort()[-(top_n + 1):-1][::-1]
        
        # Return similar recipes as JSON
        recommended = df.iloc[similar_indices][["TranslatedRecipeName", "Cuisine"]].to_dict(orient="records")
        return recommended

    except Exception as e:
        return {"error": str(e)}

