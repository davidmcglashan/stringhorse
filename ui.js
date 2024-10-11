function focus(element) {
	var ui = document.getElementById('ui')

	// The normal class means the UI is in 'three panes' mode and we can replace it with the element passed in.
	if ( ui.classList.contains('normal') ) {
		ui.className = element;		
	} else {
		// if UI doesn't have a 'normal' class then we're reverting to it.
		ui.className = 'normal';		
	}
}

/**
 * Copy the output text into the original.
 */
function copyToOriginal() {
	var tout = document.getElementById('out')
	var toriginal = document.getElementById('src')
	toriginal.value = tout.value
}

/**
 * Pretend that everyline in the output is a URL and render a list of <a> tags.
 */
function wwwify(urls) {
	var www = document.getElementById('www')

	// Create a <ul> to list the URLs
	var ul = document.createElement('ul')
	www.replaceChildren(ul)

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
	www.classList.remove('hidden')
	document.getElementById('out').classList.add('hidden')
}
