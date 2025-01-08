import { requestMicrophonePermission, startRecognition, stopRecognition, setOnInputCallback, tts } from './microphone.js';
import { addMessage, clearChat, loadChatHistory } from './chatHistory.js';
import { getPageHtml, getPageText, testReplacer } from './pageParser.js'
import { queryGroq, queryCerebras } from './llm.js'

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

        if (message === '/clear') clearChat();

        if (message === '/html') {
            getPageHtml((pageHtml, error) => {
                addMessage(`La pagina html è lunga ${pageHtml.length} caratteri.`, 'response-message');
                if (error?.length > 0) addMessage(error, 'error-message');
            });
        }

        if (message === '/text') {
            getPageText((pageText, error) => {
                const pageExtract = pageText.slice(0, 1000);
                addMessage(`Ecco un estratto del testo: ${pageText}.`, 'response-message');
                if (error?.length > 0) addMessage(error, 'error-message');
            });
        }

        if (message.startsWith('/set')) {
            const [varName, ...varValueParts] = message.slice(4).trim().split(' ');
            const varValue = varValueParts.join(' ');
            if (varName && varValue) {
                localStorage.setItem(varName, varValue);
                addMessage(`Successfully set variable "${varName}" with value "${varValue}".`, 'response-message');
            } else {
                addMessage('Error: Provide both a variable name and a value. Example: /set myVar myValue', 'error-message');
            }
        }
        
        if (message.startsWith('/get')) {
            const varName = message.slice(4).trim();
            if (varName) {
                const varValue = localStorage.getItem(varName);
                if (varValue !== null) {
                    addMessage(`Value of "${varName}": ${varValue}`, 'response-message');
                } else {
                    addMessage(`Error: Variable "${varName}" not found.`, 'error-message');
                }
            } else {
                addMessage('Error: Provide a variable name. Example: /get myVar', 'error-message');
            }
        }
        

        if (message.startsWith('/llm')) {
            const userInput = message.slice(4).trim();

            getPageText((pageText, error) => {
                if (error?.length > 0) {
                    addMessage(error, 'error-message');
                    return;
                }

                const fullPrompt = `${userInput}\n\nContenuto della pagina:\n${pageText}`;
                queryCerebras(fullPrompt, function (error, response) {
                    if (error) {
                        console.error('Errore:', error);
                        addMessage(`Si è verificato un errore durante la richiesta: ${error}`, 'error-message');
                    } else {
                        addMessage(response, 'response-message');
                        tts(response);
                    }
                });
            });
        }

        if (message === '/testedit') {
            // Test di modifica della pagina.
            testReplacer((error, response) => { addMessage(response, 'response-message'); })
        }



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
            alert('Per utilizzare il microfono, devi concedere i permessi.');
            return;
        }

        startRecognition();
    });

});
