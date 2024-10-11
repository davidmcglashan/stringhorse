/**
 * Focuses the passed-in element (makes it big on the UI).
 */
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
 * Clears a textarea
 */
function clear(ta) {
	document.getElementById(ta).value = ''
	localStorage.src = document.getElementById('src').value
	localStorage.recipe = document.getElementById('rec').value
	recipe()
}

/**
 * Swaps the output pane for the help one
 */
function help() {
	document.getElementById('output').classList.toggle('hidden')
	document.getElementById('help').classList.toggle('hidden')
}

/**
 * Shows an example based on the page source.
 */
function example() {
	document.getElementById('src').value = '<!DOCTYPE html>\n' + document.getElementById('html').outerHTML
	document.getElementById('rec').value = '// The Original Text pane on the left now shows the HTML source of this page, dynamically inserted.\n' +
		'\n' +
		'// This central pane holds the recipe. The commands in here are executed to provide the output.\n' +
		'\n' +
		'// <-- Two slashes like this is a comment. Lines beginning with these (like this one) are ignored.\n' +
		'\n' +
		'// Remove the comments from the recipe lines below, one-at-a-time to see stringhorse in action. The recipe will run after a short pause and the output will appear in the right hand pane ...\n' +
		'\n' +
		'//trim\n' +
		'//grep <li><a\n' +
		'//rbefore #\n' +
		'//r # https://www.google.com/search?q=\n' +
		'//rafter "\n' +
		'//rtail 1\n' +
		'//wwwify'

	localStorage.src = document.getElementById('src').value
	localStorage.recipe = document.getElementById('rec').value
	recipe()
}
