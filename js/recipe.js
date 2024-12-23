/*
 * Executes the currently entered recipe.
 */
function recipe() {
	// Store things in localstorage for future us.
	localStorage.recipe = document.getElementById('rec').value
	localStorage.src = document.getElementById('src').value
	localStorage.variables = document.getElementById('vars').value
	localStorage.stabs = document.getElementById('checkbox-stab').checked

	// Tidy up the UI if wwwify or info was used previously.
	document.getElementById('info').classList.add('hidden')
	document.getElementById('out').classList.remove('hidden')

	// Our working object is a copy of the source text.
	let result = document.getElementById('src').value.split('\n')
	let vars = parseVariables()
	let recipe

	// This is the main loop, then. Get the recipe text, split by newlines and parse each one ...
//	try {
		for ( recipe of document.getElementById('rec').value.split('\n') ) {
			if ( recipe.length > 0 && !recipe.startsWith('//') ) {
				// Split the recipe line at its first spaces. The first entry is our command, the rest are its parameters.
				let input = recipe.split(/ (.*)/)

				for ( let cmd of command.commands ) {
					if ( cmd.command === input[0] ) {
						// Execute. If a command returns NULL then we abort the whole recipe.
						result = cmd.func(result,input,vars);
						if ( result === undefined ) {
							return
						} else if ( result instanceof String ) {
							break
						}
						break
					} 
				}
			}
		}
//	} catch( err ) {
//		throw err
//		result = []
//		if ( err instanceof TypeError ) {
//			result.push( recipe + ': unknown or badly configured command' )
//		} else {
//			result.push(err)
//		}
//	}

	// Finished looping. Better print the results ...
	let tout = document.getElementById('out')
	if ( result instanceof String ) {
		tout.value = result
	} else {
		tout.value = ''
		for ( let line of result ) {
			tout.value = tout.value + line + '\n'
		}
	}
}

/**
 * Parse the variables from the textarea, returing a dictionary of variable vrs value
 */
function parseVariables() {
	let dict = {}

	// Take the contents of the variables text area. If there's an equals we can use it.
	let lines = document.getElementById('vars').value.split('\n')
	for ( line of lines ) {
		if ( line.length > 0 && line.indexOf( '=' ) > 0 ) {
			let bits = line.split(/=(.*)/)
			dict[bits[0].trim()] = bits[1].trim()
		}
	}

	// Add TAB and space in there too?
	if ( document.getElementById('checkbox-stab').checked ) {
		dict['spc'] = ' '
		dict['tab'] = '\t'
	}

	return dict
}

/**
 * Returns the variable value of the match variable, or match back again if no variable is found.
 */
function getVariable( vars, match ) {
	// Check all the variables
	if ( match[0] === '$' ) {
		let name = match.substring(1)
		if ( vars[name] !== undefined ) {
			return vars[name]
		}
	}

	// Return the original parameter
	return match
}

buildHelp()
restoreState()
fixTabIndex()