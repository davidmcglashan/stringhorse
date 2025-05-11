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

		// Result starts off as the source text. It is transformed by each command in the recipe.
		let result = document.getElementById('src').value.split('\n')

		// Get the recipe text, split by newlines so we can parse each one in turn. Get the variables too ...
		let recipeLines = document.getElementById('rec').value.split('\n')
		let vars = recipe.parseVariables()
		
			for ( let line of recipeLines ) {
				// Ignore comments and blank lines
				if ( line.length === 0 || line.startsWith('//') ) {
					continue
				}

				// Split the line at its first space. The first entry is our command, the rest are its parameters.
				let input = line.split(/ (.*)/)

				for ( let cmd of command.commands ) {
					if ( cmd.command === input[0] ) {
						// Execute the command, storing the new version of the source text in
						// result, ready for the next command to process it
						result = cmd.func( result, input, vars );

						// If a command returned NULL then we abort the whole recipe.
						if ( result === undefined ) {
							return
						} else if ( result instanceof String ) {
							break
						}
						break
					} 
				}
			}

		// Finished looping. Better print the results ...
		let output = document.getElementById('out')
		if ( result instanceof String ) {
			output.value = result
		} else {
			output.value = ''

			// If we only got a blank string array then don't embellish with line returns
			if ( result.length === 1 && result[0] === '' ) {
				return
			}

			// Otherwise show each line in the result array with a line return
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

	getVariable: ( vars, ins ) => {
		for ( const [ key, value ] of Object.entries( vars ) ) {
			ins = ins.replaceAll( '$'+key, value )
		}

		return ins
	},

	/**
	 * Returns the variable value of the match variable, or match back again if no variable is found.
	 */
	getVariableX: ( vars, match ) => {
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