import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,  // Pastikan API key diset di environment variable
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { message } = req.body;

        try {
            // Mengirim permintaan ke OpenAI
            const completion = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo', // Atau model terbaru lainnya
                messages: [{ role: 'user', content: message }],
            });

            // Mengambil pesan balasan dari OpenAI
            const botReply = completion.data.choices[0].message.content;
            res.status(200).json({ reply: botReply });
        } catch (error) {
            console.error("Error with OpenAI API:", error);
            res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
        }
    } else {
        res.status(405).json({ error: 'Metode tidak diizinkan' });
    }
}
