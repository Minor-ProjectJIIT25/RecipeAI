import pandas as pd
import pymongo
from pymongo import MongoClient

# Load CSV file
csv_file = "./Dataset1/Cleaned_Indian_Food_Dataset.csv"  # Change this to your CSV file path
df = pd.read_csv(csv_file)

# Connect to MongoDB
MONGO_URI = "mongodb://localhost:27017"  # Change if using a different URI
db_name = "recipeAI"
collection_name = "recipes"

client = MongoClient(MONGO_URI)
db = client[db_name]
collection = db[collection_name]

# Convert DataFrame to Dictionary
recipes = df.to_dict(orient="records")

# Insert Data into MongoDB
collection.insert_many(recipes)

print(f"Inserted {len(recipes)} recipes into MongoDB")



