// pages/index.js

import { useState } from "react";

export default function Home() {
    const [message, setMessage] = useState("");
    const [reply, setReply] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!message.trim()) return;

        setLoading(true);
        setReply("");

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            const data = await response.json();
            setReply(data.reply);
        } catch (error) {
            console.error(error);
            setReply("Maaf, terjadi kesalahan. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center" }}>
            <h1>Chatbot OpenAI</h1>
            <textarea
                rows="4"
                cols="50"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tulis pesan Anda..."
                style={{ width: "100%", marginBottom: "10px" }}
            ></textarea>
            <br />
            <button onClick={sendMessage} disabled={loading}>
                {loading ? "Mengirim..." : "Kirim"}
            </button>
            <div style={{ marginTop: "20px", textAlign: "left", whiteSpace: "pre-wrap" }}>
                <h3>Balasan:</h3>
                <p>{reply || "Belum ada balasan."}</p>
            </div>
        </div>
    );
}
