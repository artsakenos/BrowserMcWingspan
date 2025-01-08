
/**
 * Gets the HTML of the current active tab.
 * @param {function} callback A callback function that takes the HTML string as a parameter and an optional error message.
 */
export function getPageHtml(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0]?.id;
        if (!tabId) {
            console.error('No active tab found.');
            callback('', 'No active tab found.');
            return;
        }

        chrome.scripting.executeScript(
            {
                target: { tabId },
                func: () => document.documentElement.outerHTML
            },
            (results) => {
                if (chrome.runtime.lastError) {
                    console.error('Error executing script:');
                    console.error(JSON.stringify(chrome.runtime.lastError));
                    callback('', 'Error executing script: ' + JSON.stringify(chrome.runtime.lastError));
                } else {
                    callback(results[0]?.result || '', '');
                }
            }
        );
    });
}

export function getPageText(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0]?.id;
        if (!tabId) {
            console.error('No active tab found.');
            callback('', 'No active tab found.');
            return;
        }

        chrome.scripting.executeScript(
            {
                target: { tabId },
                func: () => {
                    return document.body ? document.body.innerText || "" : "";
                }
            },
            (results) => {
                if (chrome.runtime.lastError) {
                    console.error('Error executing script:');
                    console.error(JSON.stringify(chrome.runtime.lastError));
                    callback('', 'Error executing script: ' + JSON.stringify(chrome.runtime.lastError));
                } else {
                    callback(results[0]?.result || '', '');
                }
            }
        );
    });
}

export function testReplacer(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0]?.id;
        if (!tabId) {
            console.error('No active tab found.');
            callback('No active tab found.');
            return;
        }

        chrome.scripting.executeScript(
            {
                target: { tabId },
                func: () => {
                    function replaceTextInPage() {
                        const body = document.body;
                        if (body) {
                            body.innerHTML = body.innerHTML.replace(/Sardegna/gi, 'Regno di Gallura');
                        }
                    }

                    replaceTextInPage();
                    return 'Sostituzione completata: "Sardegna" → "Gallura"';
                }
            },
            (results) => {
                if (chrome.runtime.lastError) {
                    console.error('Error executing script:');
                    console.error(JSON.stringify(chrome.runtime.lastError));
                    callback('Error executing script: ' + JSON.stringify(chrome.runtime.lastError));
                } else {
                    callback(results[0]?.result || 'Modifiche effettuate.');
                }
            }
        );
    });
}