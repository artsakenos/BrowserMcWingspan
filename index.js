import { requestMicrophonePermission, startRecognition, stopRecognition, setOnInputCallback } from './microphone.js';
import { addMessage, loadChatHistory } from './chatHistory.js';

document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const sendButton = document.getElementById('send-button');
    const micButton = document.getElementById('mic-button');

    // Carica la cronologia all'avvio
    loadChatHistory();

    // Gestione invio messaggi
    function handleInput(text) {
        const message = text || textInput.value.trim();
        if (message) {
            addMessage(message, true);
            simulateResponse(message);
            textInput.value = '';
        }
    }

    function simulateResponse(userText) {
        setTimeout(() => {
            const response = `Hai detto: "${userText}"`;
            addMessage(response, false);
        }, 500);
    }

    sendButton.addEventListener('click', () => handleInput());
    textInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleInput();
        }
    });

    // Configura la callback per dopo il riconoscimento vocale
    setOnInputCallback((text) => handleInput(text));

    // Gestione microfono
    micButton.addEventListener('click', async () => {
        const isRecording = micButton.classList.contains('recording');
        if (isRecording) {
            stopRecognition();
            return;
        }

        const hasPermission = await requestMicrophonePermission();
        if (!hasPermission) {
            alert('Per utilizzare il microfono, devi concedere i permessi.');
            return;
        }

        startRecognition();
    });
});
