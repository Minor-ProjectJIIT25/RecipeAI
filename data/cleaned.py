import pandas as pd
import re

# Load your CSV
df = pd.read_csv("recipes.csv")

# Function to clean and extract all items from c(...) style strings
def clean_all(value):
    if pd.isna(value) or str(value).strip() in ["character(0)", "c()", "[]", ""]:
        return pd.NA
    value = str(value).strip()
    if value.startswith("c(") and value.endswith(")"):
        return ", ".join(re.findall(r'["\'](.*?)["\']', value[2:-1]))
    return value.strip('"').strip("'")

# Function to extract only the first item (for Images column)
def extract_first(value):
    if pd.isna(value) or str(value).strip() in ["character(0)", "c()", "[]", ""]:
        return pd.NA
    value = str(value).strip()
    if value.startswith("c(") and value.endswith(")"):
        matches = re.findall(r'["\'](.*?)["\']', value[2:-1])
        return matches[0] if matches else pd.NA
    return value.strip('"').strip("'")

# Apply extract_first only to 'Images' column
df['Images'] = df['Images'].apply(extract_first)

# Apply clean_all to all other object columns except 'Images'
for col in df.select_dtypes(include=['object']).columns:
    if col != 'Images':
        df[col] = df[col].apply(clean_all)

# Save the cleaned DataFrame
df.to_csv("cleaned_output.csv", index=False)

