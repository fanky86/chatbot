document.getElementById('send-btn').addEventListener('click', async () => {
  const userInput = document.getElementById('user-input').value;
  if (userInput.trim()) {
    appendMessage('user', userInput);
    document.getElementById('user-input').value = '';
    
    const botResponse = await getBotResponse(userInput);
    appendMessage('bot', botResponse);
  }
});

async function getBotResponse(message) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  const data = await response.json();
  return data.reply || "Tunggu sebentar, saya sedang berpikir...";
}

function appendMessage(sender, message) {
  const chatBox = document.getElementById('chat-box');
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender === 'user' ? 'user-msg' : 'bot-msg');
  msgDiv.textContent = message;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
