chrome.runtime.onConnect.addListener((port) => {
	console.assert(port.name == "onBadWebsite");
	port.onMessage.addListener((msg) => {
		console.log(`on website ${msg.url}`)
		sendToWebApp(msg.url)
	});
});

function sendToWebApp(url) {
	chrome.tabs.getAllInWindow(null, (tabs) => {
		tabs.forEach(tab => {
			console.log(tab)
		})
	});
}