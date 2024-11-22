import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState(""); // Menyimpan pesan pengguna
  const [conversation, setConversation] = useState([]); // Menyimpan riwayat percakapan
  const [loading, setLoading] = useState(false); // Status loading

  // Fungsi untuk mengirim pesan
  const sendMessage = async (e) => {
    e.preventDefault(); // Mencegah reload halaman

    if (!message.trim()) {
      alert("Pesan tidak boleh kosong!");
      return;
    }

    setLoading(true);

    // Tambahkan pesan pengguna ke riwayat percakapan
    setConversation((prev) => [...prev, { role: "user", content: message }]);

    try {
      // Kirim pesan ke API backend
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Gagal menghubungi server.");
      }

      const data = await response.json();

      // Tambahkan balasan bot ke riwayat percakapan
      setConversation((prev) => [...prev, { role: "bot", content: data.reply }]);
    } catch (error) {
      console.error(error);
      setConversation((prev) => [
        ...prev,
        { role: "bot", content: "Maaf, terjadi kesalahan. Silakan coba lagi." },
      ]);
    } finally {
      setMessage(""); // Reset input pesan
      setLoading(false); // Selesai loading
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Chatbot OpenAI</h1>
      <div style={styles.chatBox}>
        {conversation.map((chat, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: chat.role === "user" ? "flex-end" : "flex-start",
              backgroundColor: chat.role === "user" ? "#daf8e3" : "#f1f1f1",
            }}
          >
            {chat.content}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} style={styles.form}>
        <input
          type="text"
          style={styles.input}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tulis pesan Anda..."
          disabled={loading}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Mengirim..." : "Kirim"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  chatBox: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    marginBottom: "20px",
    height: "400px",
    overflowY: "scroll",
    display: "flex",
    flexDirection: "column",
  },
  message: {
    padding: "10px 15px",
    borderRadius: "10px",
    marginBottom: "10px",
    maxWidth: "70%",
  },
  form: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: "1",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
