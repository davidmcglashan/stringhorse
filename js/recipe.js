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
	var result = document.getElementById('src').value.split('\n')
	var vars = parseVariables()
	var recipe

	// This is the main loop, then. Get the recipe text, split by newlines and parse each one ...
	try {
		for ( recipe of document.getElementById('rec').value.split('\n') ) {
			if ( recipe.length > 0 && !recipe.startsWith('//') ) {
				// Split the recipe line at its first spaces. The first entry is our command, the rest are its parameters.
				cmd = recipe.split(/ (.*)/)

				// Do the replacements for chars not allowed in Javascript function names
				cmd[0] = cmd[0].replaceAll('+','plus')
				cmd[0] = cmd[0].replaceAll('<','lt')
				cmd[0] = cmd[0].replaceAll('>','gt')
				cmd[0] = cmd[0].replaceAll('-','minus')
				cmd[0] = cmd[0].replaceAll('*','star')
				cmd[0] = cmd[0].replaceAll('!','not')
				cmd[0] = cmd[0].replaceAll('=','equals')
				cmd[0] = cmd[0].replaceAll('|','pipe')

				// Execute. If a command returns NULL then we abort the whole recipe.
				result = window['_'+cmd[0]](result,cmd,vars);
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

/**
 * Parse the variables from the textarea, returing a dictionary of variable vrs value
 */
function parseVariables() {
	var dict = {}

	// Take the contents of the variables text area. If there's an equals we can use it.
	var lines = document.getElementById('vars').value.split('\n')
	for ( line of lines ) {
		if ( line.length > 0 && line.indexOf( '=' ) > 0 ) {
			var bits = line.split(/=(.*)/)
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

buildHelp()
restoreState()
fixTabIndex()