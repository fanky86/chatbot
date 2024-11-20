from flask import Flask, render_template, request
import openai

app = Flask(__name__)

# Gunakan API key OpenAI yang baru
openai.api_key = "org-k4tKcm5XqbIOwx5aVE8xeO7X"

def chatbot_response(user_input):
    # Integrasi OpenAI GPT untuk menghasilkan respons
    try:
        response = openai.Completion.create(
            engine="text-davinci-003",  # Bisa ganti dengan GPT-4 jika tersedia di akunmu
            prompt=f"User: {user_input}\nAI:",
            max_tokens=150,
            temperature=0.7,
        )
        return response.choices[0].text.strip()
    except Exception as e:
        return "Maaf, saya mengalami masalah teknis."

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/get", methods=["GET"])
def get_bot_response():
    user_text = request.args.get("msg")
    return chatbot_response(user_text)

if __name__ == "__main__":
    app.run(debug=True)
