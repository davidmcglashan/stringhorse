/*
 * Executes the currently entered recipe.
 */
function recipe() {
	// Our working object is a copy of the source text.
	var result = document.getElementById('src').value.split('\n');
	var recipe

	// This is the main loop, then. Get the recipe text, split by newlines and parse each one ...
	try {
		for ( recipe of document.getElementById('rec').value.split('\n') ) {
			if ( recipe.length > 0 ) {
				// Split the recipe line by its spaces. The first entry is our command, the rest are its parameters.
				cmd = recipe.split(' ')
				result = window[cmd[0]](result,cmd);
			}
		}
	} catch( err ) {
		result = []
		if ( err instanceof TypeError ) {
			result.push( recipe + ': unknown or badly configured command' )
		} else {
			result.push(err)
		}
	}

	// Finished looping. Better print the results ...
	var tout = document.getElementById('out')
	tout.value = ''
	for ( let line of result ) {
		tout.value = tout.value + line + '\n'
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
 * Detect Enter presses on the recipe textarea and run the recipe when we do
 */
var recipetext = document.getElementById('rec')
var timerId = 0;

recipetext.addEventListener("keyup", function(event) {
    clearTimeout(timerId);
    timerId = setTimeout( recipe, 750 );
});
