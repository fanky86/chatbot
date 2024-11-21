import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { message } = req.body;

      // Request ke OpenAI API
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      });

      const reply = completion.data.choices[0].message.content;
      res.status(200).json({ reply });
    } catch (error) {
      res.status(500).json({ error: 'Terjadi kesalahan dengan API OpenAI' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
