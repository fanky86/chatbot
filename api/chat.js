import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,  // Menggunakan environment variable untuk API key
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    try {
      // Mengirimkan permintaan ke OpenAI API
      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',  // Anda bisa mengganti model sesuai kebutuhan (misalnya gpt-4)
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: message },
        ],
      });

      const reply = completion.data.choices[0].message.content;

      // Mengirimkan balasan dari OpenAI API
      return res.status(200).json({ reply });

    } catch (error) {
      console.error('Error with OpenAI API:', error);
      return res.status(500).json({ error: 'Error with OpenAI API.' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
