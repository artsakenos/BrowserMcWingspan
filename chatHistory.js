let displayedMessages = new Set();

export function addMessage(text, isUser = true, messageId = null) {
    const id = messageId || Date.now().toString();

    if (displayedMessages.has(id)) {
        return;
    }

    const chatContainer = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'response-message');
    messageDiv.textContent = text;
    messageDiv.dataset.messageId = id;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    displayedMessages.add(id);

    chrome.storage.local.get(['chatHistory'], (result) => {
        const chatHistory = result.chatHistory || [];
        chatHistory.push({ text, isUser, id });
        chrome.storage.local.set({ chatHistory });
    });
}

export function loadChatHistory() {
    chrome.storage.local.get(['chatHistory'], (result) => {
        const chatContainer = document.getElementById('chat-container');
        if (result.chatHistory) {
            displayedMessages.clear();
            result.chatHistory.forEach((msg) => {
                addMessage(msg.text, msg.isUser, msg.id);
            });
        }
    });
}
