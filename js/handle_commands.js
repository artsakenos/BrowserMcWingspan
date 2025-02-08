import { tts } from './microphone.js';
import { addMessage, clearChat } from './chatHistory.js';
import { getPageHtml, getPageText, testReplacer } from './pageParser.js'
import { queryLLM } from './llm.js'

export function handleCommands(message) {

    if (message === '/clear') clearChat();

    if (message === '/html') {
        getPageHtml((pageHtml, error) => {
            addMessage(`Html page is ${pageHtml.length} characters long.`, 'response-message');
            if (error?.length > 0) addMessage(error, 'error-message');
        });
    }

    if (message === '/text') {
        getPageText((pageText, error) => {
            const pageExtract = pageText.slice(0, 1000);
            addMessage(`Page Text Excerpt: ${pageText}.`, 'response-message');
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

            const fullPrompt = `${userInput}\n\n#Page Content#:\n${pageText}`;

            queryLLM(fullPrompt, function (error, response) {
                if (error) {
                    console.error('Errore:', error);
                    addMessage(`Error while querying LLM: ${error}`, 'error-message');
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

    if (!message.startsWith('/')) {
        const fullPrompt = message;

        queryLLM(fullPrompt, function (error, response) {
            if (error) {
                console.error('Errore:', error);
                addMessage(`Error while querying the LLM: ${error}`, 'error-message');
            } else {
                addMessage(response, 'response-message');
                tts(response);
            }
        });
    }

} 