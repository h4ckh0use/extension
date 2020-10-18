console.log("yeet")
console.log(`currently on page ${getStrippedUrl()}`)

checkIfBlocked()

function getStrippedUrl() {
	const activeURL = window.location.href.match(/^[\w]+:\/{2}([\w\.:-]+)/)
	if (activeURL != null) {
		const strippedURL = activeURL[1].replace('www.', '')
		return strippedURL
	}

	// no url?
	return ''
}

function checkIfBlocked() {
	const blockedSites = ['facebook.com', 'twitter.com', 'instagram.com', 'youtube.com', 'reddit.com']
	blockedSites.forEach(function(element) {
		if (getStrippedUrl().includes(element)) {
			isOnBadWebsite(getStrippedUrl())
		}
	})
}

function isOnBadWebsite(websiteURL) {
	chrome.runtime.sendMessage({ url: websiteURL, onWebApp: onWebApp() });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	console.log('EMERGENCY MEETING')
	window.postMessage({ type: "from_extension", text: "" }, "*");
	sendResponse({ farewell: "goodbye" });
});

document.addEventListener("DOMContentLoaded", () => {
	isOnBadWebsite(getStrippedUrl())
});

// check if current page is web app
function onWebApp() {
	return !!document.getElementById("imHackHouse")
}