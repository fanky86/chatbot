// File: chatbot.js

const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Tampilkan pesan pengguna
    addMessage("user", message);
    userInput.value = "";

    try {
        // Kirim permintaan ke OpenAI API
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer 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` // Ganti dengan API key Anda
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }]
            })
        });

        if (!response.ok) {
            throw new Error("Gagal mendapatkan respons dari server.");
        }

        const data = await response.json();
        const reply = data.choices[0].message.content;

        // Tampilkan pesan dari bot
        addMessage("bot", reply);
    } catch (error) {
        addMessage("bot", "Maaf, terjadi kesalahan. Silakan coba lagi.");
        console.error(error);
    }
}

function addMessage(sender, text) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);

    const textElement = document.createElement("div");
    textElement.classList.add("text");
    textElement.textContent = text;

    messageElement.appendChild(textElement);
    chatMessages.appendChild(messageElement);

    // Scroll ke bawah
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
