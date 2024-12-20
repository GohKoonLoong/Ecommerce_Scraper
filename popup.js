document.addEventListener("DOMContentLoaded", () => {
    const extractButton = document.querySelector("#extract-btn");
    const outputElement = document.querySelector("#output");

    async function injectContentScript(tabId) {
        try {
            await chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ["content.js"]
            });
            console.log("Content script injected!");
        } catch (error) {
            console.error("Failed to inject content script:", error);
        }
    }

    async function extractData() {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (!tab) {
            console.error("No active tab found!");
            return;
        }

        // Ensure content script is injected
        await injectContentScript(tab.id);

    
        // Send a message to the content script
        chrome.tabs.sendMessage(tab.id, { action: "extractData" }, (response) => {
            if (chrome.runtime.lastError) {
                console.error("Error sending message:", chrome.runtime.lastError.message);
                outputElement.textContent = "Error: Unable to connect to content script.";
                return;
            }
            outputElement.textContent = JSON.stringify(response, null, 2);
        });
    }

    extractButton.addEventListener("click", extractData);
});
