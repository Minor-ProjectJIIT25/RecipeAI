import streamlit as st
import pickle 
# BACKEND REQUIREMENTS
import matplotlib.pyplot as plt
import torch
import torch.nn as nn
import numpy as np
import os
from args import get_parser
from model import get_model
from torchvision import transforms
from utils.output_utils import prepare_output
from PIL import Image
import time
import random
import sys; sys.argv=['']; del sys

# Set up Streamlit app
st.set_page_config(page_title="SnapChef", page_icon=":pizza:")
# Inject custom CSS
st.markdown("""
    <style>
    .block-container {
        padding-left: 0rem !important;
        padding-right: 0rem !important;
    }

    .stApp {
        background: linear-gradient(to bottom right, #000000, #1c1c1c);
        color: white;
    }

    .st-emotion-cache-10trblm {
        color: #FFC300 !important;
        font-weight: bold !important;
        font-size: 3em !important;
        text-align: center;
    }

    .stFileUploader {
        background-color: rgba(255, 255, 255, 0.1);
        border: 2px dashed #FFC300;
        padding: 1rem;
        border-radius: 10px;
    }

    button {
        background-color: #FFC300 !important;
        color: black !important;
        border-radius: 6px !important;
        font-weight: bold !important;
    }

    input {
        background-color: #1a1a1a !important;
        color: white !important;
        border: 1px solid #FFC300 !important;
    }

    h2, h3, h4 {
        color: #FFC300 !important;
    }

    ul {
        color: white;
    }

    footer, header {visibility: hidden;}
    </style>
""", unsafe_allow_html=True)

st.header("Welcome To SnapChef!")

# Set device and data directory
use_gpu = False
device = torch.device('cuda' if torch.cuda.is_available() and use_gpu else 'cpu')
map_loc = None if torch.cuda.is_available() and use_gpu else 'cpu'

# Get the absolute path to the data directory
current_dir = os.path.dirname(os.path.abspath(__file__))
data_dir = os.path.join(current_dir, '..', 'data')

# Define file paths
ingr_vocab_path = os.path.join(data_dir, 'ingr_vocab.pkl')
instr_vocab_path = os.path.join(data_dir, 'instr_vocab.pkl')
model_path = os.path.join(data_dir, 'modelbest.ckpt')

# Check for required files
if not os.path.exists(ingr_vocab_path):
    st.error(f"File not found: {ingr_vocab_path}")
if not os.path.exists(instr_vocab_path):
    st.error(f"File not found: {instr_vocab_path}")
if not os.path.exists(model_path):
    st.error(f"File not found: {model_path}")

# Load data if files are present
if os.path.exists(ingr_vocab_path) and os.path.exists(instr_vocab_path):
    ingrs_vocab = pickle.load(open(ingr_vocab_path, 'rb'))
    vocab = pickle.load(open(instr_vocab_path, 'rb'))
    ingr_vocab_size = len(ingrs_vocab)
    instrs_vocab_size = len(vocab)
    output_dim = instrs_vocab_size
else:
    st.stop()

# Load and prepare the model
args = get_parser()
args.maxseqlen = 15
args.ingrs_only = False
model = get_model(args, ingr_vocab_size, instrs_vocab_size)

if os.path.exists(model_path):
    model.load_state_dict(torch.load(model_path, map_location=map_loc))
    model.to(device)
    model.eval()
    model.ingrs_only = False
    model.recipe_only = False
else:
    st.error("Model file not found, please check the path to 'modelbest.ckpt'")
    st.stop()

# Set up image transformations
transf_list_batch = [
    transforms.ToTensor(),
    transforms.Normalize((0.485, 0.456, 0.406), (0.229, 0.224, 0.225))
]
to_input_transf = transforms.Compose(transf_list_batch)

greedy = [True, False, False, False]
beam = [-1, -1, -1, -1]
temperature = 1.0
numgens = len(greedy)

# Upload image section
uploaded_file = st.file_uploader("Choose a Food image...", type=["jpg", "jpeg", "png"])
Recipe_details = ""

if uploaded_file is not None:
    image = Image.open(uploaded_file).convert('RGB')
    st.image(image, caption='Uploaded Food Image.', use_column_width=False, width=400)
    transf_list = [transforms.Resize(256), transforms.CenterCrop(224)]
    transform = transforms.Compose(transf_list)
    image_transf = transform(image)
    image_tensor = to_input_transf(image_transf).unsqueeze(0).to(device)

    for i in range(numgens):
        with torch.no_grad():
            outputs = model.sample(image_tensor, greedy=greedy[i], temperature=temperature, beam=beam[i], true_ingrs=None)
            ingr_ids = outputs['ingr_ids'].cpu().numpy()
            recipe_ids = outputs['recipe_ids'].cpu().numpy()
            outs, valid = prepare_output(recipe_ids[0], ingr_ids[0], ingrs_vocab, vocab)

            if valid['is_valid']:
                best_recipe = outs
                Recipe_details = f'<h2 style="color: #FF5733">RECIPE</h2>'
                Recipe_details += f'<h3 style="color: #900C3F">Title: {best_recipe["title"]}</h3>'
                Recipe_details += '<h4 style="color: white">Ingredients:</h4><ul style="color: white">'
                Recipe_details += '<li>' + '</li><li>'.join(best_recipe['ingrs']) + '</li></ul>'
                Recipe_details += '<h4 style="color: white">Instructions:</h4><ul style="color: white">'
                Recipe_details += '<li>' + '</li><li>'.join(best_recipe['recipe']) + '</li></ul>'
                Recipe_details += '<hr style="border-top: 2px solid #FF5733">'

                st.success(f"Accuracy: {valid['score'] * 100:.2f}%")

# Display recipe details
st.write(Recipe_details, unsafe_allow_html=True)

