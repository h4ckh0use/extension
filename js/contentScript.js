console.log("yeet")

function getStrippedUrl() {
	const activeURL = window.location.href.match(/^[\w]+:\/{2}([\w\.:-]+)/)
	if (activeURL != null) {
		const strippedURL = activeURL[1].replace('www.', '')
		return strippedURL
	}

	// no url?
	return ''
}