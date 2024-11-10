/**
 * Shows some info about the output: lines, words, chars, etc.
 */
function _info(arr,cmd) {
	let info = document.getElementById('info')

	// Create a <ul> to list the URLs
	let h2 = document.createElement('h2')
	h2.innerHTML = 'Info'
	info.replaceChildren(h2)

	let dl = document.createElement('dl')
	info.appendChild( dl )

	// Count the lines
	datum( dl, 'Lines', arr.length )

	cc = 0
	wc = 0
	for ( let ar of arr ) {
		cc = cc + ar.length
		wc = wc + ar.split( ' ' ).length
	}

	datum( dl, 'Words', wc )
	datum( dl, 'Characters', cc )

	// Make the UI visible
	info.classList.remove('hidden')
	document.getElementById('out').classList.add('hidden')
}

/**
 * Inserts a <dt><dd> tuple for the _info command.
 */
function datum( dl, label, value ) {
	let dt = document.createElement('dt')
	dt.innerHTML = label
	dl.appendChild(dt)
	let dd = document.createElement('dd')
	dd.innerHTML = value
	dl.appendChild(dd)	
}