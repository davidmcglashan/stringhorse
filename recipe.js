/*
 * Executes the currently entered recipe.
 */
function recipe() {
	// Our working objects.
	var source = document.getElementById('src').value.split('\n');
	var result = []

	// This is the main loop, then. Get the recipe text, split by newlines and parse each one ...
	for ( let recipe of document.getElementById('rec').value.split('\n') ) {
		if ( recipe.length > 0 ) {
			source = window[recipe](source);
		}
	}

	// Finished looping. Better print the results ...
	var tout = document.getElementById('out')
	tout.value = ''
	for ( let line of source ) {
		tout.value = tout.value + line + '\n'
	}
}
