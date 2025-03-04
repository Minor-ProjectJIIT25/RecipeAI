from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from recommend import get_similar_recipes

app = Flask(__name__)
CORS(app)  # Allow all origins

df = pd.read_csv("./Dataset1/Cleaned_Indian_Food_Dataset.csv")

@app.route("/api/recipes/<recipe_id>/like", methods=["POST"])
def like_recipe(recipe_id):
    try:
        recommended_recipes = get_similar_recipes(recipe_id)
        
        # Ensure it's a list (if None, return empty list)
        if not isinstance(recommended_recipes, list):
            recommended_recipes = []

        return jsonify({
            "message": "Recipe liked successfully!",
            "recommended_recipes": recommended_recipes
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)




