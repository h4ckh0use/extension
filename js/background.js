var webAppTabId = -1;

// listen for new pages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {	
	if (request.onWebApp) {
		webAppTabId = sender.tab.id
	} else {
		sendToWebApp(request.url)
	}

	sendResponse({ status: "ok" });
});

function sendToWebApp(url) {
	if (webAppTabId != -1) {
		console.log(`triggering emergency meeting: ${url}`)
		// send message for emergency meeting
		chrome.tabs.sendMessage(webAppTabId, {url: url});
	}
}