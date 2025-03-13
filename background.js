chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleExtensions") {
        console.log("Received request to toggle extensions.");
        chrome.management.getAll(extensions => {
            const enabledExtensions = extensions.filter(ext => ext.enabled && ext.id !== chrome.runtime.id);
            const isAnyEnabled = enabledExtensions.length > 0;

            extensions.forEach(ext => {
                if (ext.type === 'extension' && ext.id !== chrome.runtime.id) {
                    chrome.management.setEnabled(ext.id, !isAnyEnabled, () => {
                        if (chrome.runtime.lastError) {
                            console.error("Error toggling extension:", chrome.runtime.lastError);
                        }
                    });
                }
            });

            sendResponse({ status: "done", disabled: isAnyEnabled });
        });

        return true; // Indicates response will be sent asynchronously
    }
});
