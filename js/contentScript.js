console.log("yeet")
console.log(`currently on page ${getStrippedUrl()}`)

const port = chrome.runtime.connect({ name: "onBadWebsite" })

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
	port.postMessage({ url: websiteURL })
}