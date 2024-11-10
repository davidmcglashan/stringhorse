/**
 * Pretend that everyline in the output is a URL and render a list of <a> tags.
 */
function _wwwify(urls) {
	let info = document.getElementById('info')
	let mono = document.createElement('div')
	mono.classList.add('mono')
	mono.classList.add('webify')
	info.replaceChildren(mono)

	// Create a <ul> to list the URLs
	let ul = document.createElement('ul')
	mono.appendChild(ul)

	for ( let url of urls ) {
		if ( url.length > 0 ) {
			let li = document.createElement('li')
			ul.appendChild(li)
			let a = document.createElement('a')
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
