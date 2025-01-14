import { requestMicrophonePermission, startRecognition, stopRecognition, setOnInputCallback, tts } from './microphone.js';
import { addMessage, clearChat, loadChatHistory } from './chatHistory.js';
import { handleCommands } from './handle_commands.js';

document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const sendButton = document.getElementById('send-button');
    const micButton = document.getElementById('mic-button');

    loadChatHistory();

    function handleInput(text) {
        const message = text || textInput.value.trim();
        if (message) {
            addMessage(message, 'user-message');
            handleResponse(message);
            textInput.value = '';
        }
    }

    function handleResponse(message) {
        handleCommands(message);
        // Import here further custom commands
    } // End handleResponse

    sendButton.addEventListener('click', () => handleInput());
    textInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleInput();
        }
    });

    // Callback per dopo il riconoscimento vocale
    setOnInputCallback((text) => handleInput("/llm " + text));

    // Gestione microfono
    micButton.addEventListener('click', async () => {
        const isRecording = micButton.classList.contains('recording');
        if (isRecording) {
            stopRecognition();
            return;
        }

        const hasPermission = await requestMicrophonePermission();
        if (!hasPermission) {
            alert('To use the microphone please authorize the App.');
            return;
        }

        startRecognition();
    });

});
