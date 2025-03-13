document.getElementById('toggleButton').addEventListener('click', () => {
    console.log("Button clicked, sending message to background script.");
    chrome.runtime.sendMessage({ action: "toggleExtensions" }, response => {
        console.log("Response from background:", response);
    });
});
