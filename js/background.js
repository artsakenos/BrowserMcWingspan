// Service Worker
chrome.action.onClicked.addListener(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0].id;
        chrome.sidePanel.open({ tabId }, () => {
            if (chrome.runtime.lastError) {
                console.error(JSON.stringify(chrome.runtime.lastError));
            } else {
                console.log('Side panel opened successfully.');
            }
        });
    });
});