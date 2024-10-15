/*
 * Executes the currently entered recipe.
 */
function recipe() {
	// Store things in localstorage for future us.
	localStorage.recipe = document.getElementById('rec').value
	localStorage.src = document.getElementById('src').value

	document.getElementById('info').classList.add('hidden')
	document.getElementById('out').classList.remove('hidden')

	// Our working object is a copy of the source text.
	var result = document.getElementById('src').value.split('\n');
	var recipe

	// This is the main loop, then. Get the recipe text, split by newlines and parse each one ...
	try {
		for ( recipe of document.getElementById('rec').value.split('\n') ) {
			if ( recipe.length > 0 && !recipe.startsWith('//') ) {
				// Split the recipe line by its spaces. The first entry is our command, the rest are its parameters.
				cmd = recipe.split(' ')

				// Execute. If a command returns NULL then we abort the whole recipe.
				result = window['_'+cmd[0]](result,cmd);
				if ( result === undefined ) {
					return
				} else if ( result instanceof String ) {
					break
				}
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
	if ( result instanceof String ) {
		tout.value = result
	} else {
		tout.value = ''
		for ( let line of result ) {
			tout.value = tout.value + line + '\n'
		}
	}
}

restoreState()
