console.log("yeet")
console.log(`currently on page ${getStrippedUrl()}`)

function getStrippedUrl() {
	const activeURL = window.location.href.match(/^[\w]+:\/{2}([\w\.:-]+)/)
	if (activeURL != null) {
		const strippedURL = activeURL[1].replace('www.', '')
		return strippedURL
	}

	// no url?
	return ''
}

const port = chrome.runtime.connect({ name: "onBadWebsite" })
function isOnBadWebsite(websiteURL) {
	port.postMessage({ url: websiteURL })
}

isOnBadWebsite(getStrippedUrl())