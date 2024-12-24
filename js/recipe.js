const recipe = {
	/*
	* Executes the currently entered recipe.
	*/
	execute: () => {
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
		let vars = recipe.parseVariables()

		// This is the main loop, then. Get the recipe text, split by newlines and parse each one ...
		try {
			for ( let line of document.getElementById('rec').value.split('\n') ) {
				if ( line.length > 0 && !line.startsWith('//') ) {
					// Split the line at its first space. The first entry is our command, the rest are its parameters.
					let input = line.split(/ (.*)/)

					for ( let cmd of command.commands ) {
						if ( cmd.command === input[0] ) {
							// Execute. If a command returns NULL then we abort the whole recipe.
							result = cmd.func( result, input, vars );
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
		} catch( err ) {
			throw err
			result = []
			if ( err instanceof TypeError ) {
				result.push( recipe + ': unknown or badly configured command' )
			} else {
				result.push(err)
			}
		}

		// Finished looping. Better print the results ...
		let output = document.getElementById('out')
		if ( result instanceof String ) {
			output.value = result
		} else {
			output.value = ''
			for ( let line of result ) {
				output.value = output.value + line + '\n'
			}
		}
	},

	/**
	 * Parse the variables from the textarea, returing a dictionary of variable vrs value
	 */
	parseVariables: () => {
		let dict = {}

		// Take the contents of the variables text area. If there's an equals we can use it.
		let lines = document.getElementById( 'vars' ).value.split( '\n' )
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
	},

	/**
	 * Returns the variable value of the match variable, or match back again if no variable is found.
	 */
	getVariable: ( vars, match ) => {
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
}