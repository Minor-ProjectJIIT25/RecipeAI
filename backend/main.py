from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from groq import Groq

app = Flask(__name__)
CORS(app)

# Initialize Groq client with your API key
client = Groq(api_key="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")

# System prompt for fashion stylist assistant
system_prompt = {
    "role": "system",
    "content": (
        "You are a helpful cooking assistant who specializes in food, cooking tips, recipes, ingredients, "
        "meal planning, and kitchen techniques. You provide short, accurate, and friendly responses related "
        "to food and cooking. If a question is not related to food, cooking, or recipes, politely respond with: "
        "'Sorry, I can only help with food and cooking related questions.'"
    )
}


# Initialize chat history with the system prompt
chat_history = [system_prompt]

# Serve the HTML frontend
@app.route("/")
def home():
    return send_from_directory(".", "index.html")

# Chat endpoint
@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_input = data.get("message")

    if not user_input:
        return jsonify({"error": "Message field is required."}), 400

    chat_history.append({"role": "user", "content": user_input})

    response = client.chat.completions.create(
        model="llama3-70b-8192",
        messages=chat_history,
        max_tokens=300,
        temperature=1.2
    )

    assistant_response = response.choices[0].message.content
    chat_history.append({
        "role": "assistant",
        "content": assistant_response
    })

    return jsonify({"reply": assistant_response})

# Optional route to reset the chat history
@app.route("/reset", methods=["POST"])
def reset_chat():
    global chat_history
    chat_history = [system_prompt]
    return jsonify({"message": "Chat history reset."})

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False, port=5000)
