const { Configuration, OpenAIApi } = require("openai");

// Konfigurasi OpenAI dengan API key
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Pastikan API key disimpan sebagai Environment Variable
});

const openai = new OpenAIApi(configuration);

// Handler untuk permintaan API
export default async function handler(req, res) {
    if (req.method === "POST") {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Pesan tidak boleh kosong." });
        }

        try {
            const response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }],
            });

            const botReply = response.data.choices[0].message.content;
            return res.status(200).json({ reply: botReply });
        } catch (error) {
            console.error("Error dengan OpenAI API:", error);
            return res.status(500).json({ error: "Terjadi kesalahan pada server." });
        }
    } else {
        return res.status(405).json({ error: "Metode tidak diizinkan." });
    }
}
