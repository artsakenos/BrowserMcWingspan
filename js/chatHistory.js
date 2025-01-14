let displayedMessages = new Set();
let isStorageOperation = false;

export function addMessage(text, messageClass = 'user-message', messageId = null) {
    const id = messageId || Date.now() + Math.random() * 10;

    if (displayedMessages.has(id)) {
        return;
    }

    const chatContainer = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(messageClass);
    // messageDiv.textContent = text;
    messageDiv.innerHTML = `<div style="white-space: pre-wrap;">${text}</div>`;
    messageDiv.dataset.messageId = id;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    displayedMessages.add(id);

    const checkAndSave = () => {
        if (isStorageOperation) {
            setTimeout(checkAndSave, 50);
            return;
        }

        isStorageOperation = true;
        chrome.storage.local.get(['chatHistory'], (result) => {
            const chatHistory = result.chatHistory || [];
            chatHistory.push({ text, messageClass, id });
            chrome.storage.local.set({ chatHistory }, () => {
                isStorageOperation = false;
            });
        });
    };

    checkAndSave();
}

export function clearChat() {
    const checkAndClear = () => {
        if (isStorageOperation) {
            setTimeout(checkAndClear, 50);
            return;
        }

        isStorageOperation = true;
        chrome.storage.local.set({ chatHistory: [] }, () => {
            isStorageOperation = false;
            const chatContainer = document.getElementById('chat-container');
            chatContainer.innerHTML = '';
            displayedMessages.clear();
            addMessage('Chat Cleared!', 'system-message');
        });
    };

    checkAndClear();
}

export function loadChatHistory() {
    chrome.storage.local.get(['chatHistory'], (result) => {
        if (result && result.chatHistory) {
            displayedMessages.clear();
            result.chatHistory.forEach((msg) => {
                addMessage(msg.text, msg.messageClass, msg.id);
            });
        }
    });
}