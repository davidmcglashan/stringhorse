/**
 * Pretend that everyline in the output is a URL and render a list of <a> tags.
 */
function _wwwify(urls) {
	var info = document.getElementById('info')
	var mono = document.createElement('div')
	mono.classList.add('mono')
	info.replaceChildren(mono)

	// Create a <ul> to list the URLs
	var ul = document.createElement('ul')
	mono.appendChild(ul)

	for ( let url of urls ) {
		if ( url.length > 0 ) {
			var li = document.createElement('li')
			ul.appendChild(li)
			var a = document.createElement('a')
			li.appendChild(a)

			a.title = url
			a.href = url
			a.innerHTML = url
			a.target = '_blank'
		}
	}

	// Make the UI visible
	info.classList.remove('hidden')
	document.getElementById('out').classList.add('hidden')
}

/**
 * Takes whatever array is passed in and encodeURIs it
 */
function _encode(arr) {
	result = []
	for ( let ar of arr ) {
		result.push( encodeURI(ar) )
	}
	return result
}

/**
 * Takes whatever array is passed in and encodeURIs it
 */
function _decode(arr) {
	result = []
	for ( let ar of arr ) {
		result.push( decodeURI(ar) )
	}
	return result
}
