import { tts } from './microphone.js';
import { addMessage, clearChat } from './chatHistory.js';
import { getPageHtml, getPageText, testReplacer } from './pageParser.js'
import { queryLLM } from './llm.js'
import { config_get } from './config_system.js';

export function handleCommands(message) {

    if (message === '/clear') clearChat();

    if (message.startsWith('/help') || message.startsWith('/?')) {
        const helpUrl = 'https://github.com/artsakenos/BrowserMcWingspan?tab=readme-ov-file#-usage-guide';
        chrome.tabs.create({ url: helpUrl }, () => {
            if (chrome.runtime.lastError) {
                addMessage('Error: Unable to open the help page. Please check your internet connection or try again later.', 'error-message');
            } else {
                addMessage('Opening the usage guide in a new tab...', 'response-message');
            }
        });
    }

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

    if (message.startsWith('/config')) {
        const args = message.slice(7).trim().split(' '); // Rimuove "/config" e divide i parametri
        const varName = args[0]; // Nome della variabile (primo parametro)
        const varValue = args.slice(1).join(' '); // Valore della variabile (tutto il resto)

        // 1. Se non ci sono parametri, mostra tutte le variabili
        if (!varName) {
            const allVariables = { ...localStorage }; // Copia tutte le variabili dal localStorage
            let output = 'No Variables in localStorage.\n';
            if (Object.keys(allVariables).length !== 0) {
                output = 'Variables in localStorage:\n';
                for (const [key, value] of Object.entries(allVariables)) {
                    output += `- <b>${key}</b>: ${value}\n`;
                }
            }
            output += '\n<i>/config locale</i> ' + config_get('locale');
            output += '\n<i>/config model_main</i> ' + config_get('model_main');
            addMessage(output, 'response-message');

        }
        // 2. Se c'è solo il nome della variabile, mostra il valore
        else if (!varValue) {
            if (/^[a-zA-Z0-9._]+$/.test(varName)) { // Regex aggiornata
                const storedValue = localStorage.getItem(varName);
                if (storedValue !== null) {
                    addMessage(`Value of "${varName}": ${storedValue}`, 'response-message');
                } else {
                    addMessage(`Error: Variable "${varName}" not found.`, 'error-message');
                }
            } else {
                addMessage('Error: Variable name must be alphanumeric and can include dots (.) and underscores (_).', 'error-message');
            }
        }
        // 3. Se ci sono nome e valore, imposta la variabile
        else {
            if (/^[a-zA-Z0-9._]+$/.test(varName)) { // Regex aggiornata
                localStorage.setItem(varName.trim(), varValue.trim());
                addMessage(`Successfully set variable <b>"${varName}"</b> with value <b>"${varValue}"</b>.`, 'response-message');
            } else {
                addMessage('Error: Variable name must be alphanumeric and can include dots (.) and underscores (_).', 'error-message');
            }
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

    if (message === '/clearls') {
        localStorage.clear();
        addMessage('Tutto il localStorage è stato cancellato.', 'response-message');
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