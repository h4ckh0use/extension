var webAppTabId = -1;

// listen for new pages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	console.log(`on website ${request.url}`)
	
	if (request.onWebApp) {
		webAppTabId = sender.tab.id
	} else {
		sendToWebApp(request.url)
	}

	sendResponse({ status: "ok" });
});

function sendToWebApp() {
	if (webAppTabId != -1) {
		console.log('triggering emergency meeting')
		// send message for emergency meeting
		chrome.tabs.sendMessage(webAppTabId, {});
	}
}