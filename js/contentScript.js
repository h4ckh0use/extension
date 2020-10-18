console.log(`currently on page ${getStrippedUrl()}`)

const blockedSites = ['facebook.com', 'twitter.com', 'instagram.com', 'youtube.com', 'reddit.com']

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
	const url = getStrippedUrl()
	if (onWebApp()) {
		chrome.runtime.sendMessage({ url: url, onWebApp: true});
		return
	}

	blockedSites.forEach((element) => {
		if (url.includes(element)) {
			isOnBadWebsite(url)
		}
	})
}

function isOnBadWebsite(websiteURL) {
	chrome.runtime.sendMessage({ url: websiteURL, onWebApp: false });
}

// receive emergency meeting messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	console.log('EMERGENCY MEETING')
	var emergencySound = new Audio(chrome.runtime.getURL("/emergencySound.mp3"));
	emergencySound.play();
	window.postMessage({ type: "from_extension", url: getStrippedUrl() }, "*");
});

// check blockage on page load
document.addEventListener("DOMContentLoaded", () => {
	checkIfBlocked()
	window.addEventListener('focus', checkIfBlocked)
});

// check if current page is web app
function onWebApp() {
	return !!document.getElementById("imHackHouse")
}