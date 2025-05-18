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
		recipe.clearLog()

		// Output starts off as the source text. It is transformed by each command in the recipe.
		let output = document.getElementById('src').value.split('\n')

		// Get the recipe text, split by newlines so we can parse each one in turn. Get the variables too ...
		let recipeLines = document.getElementById('rec').value.split('\n')
		let vars = recipe.parseVariables()
		let error = null

		for ( let line of recipeLines ) {
			// Ignore comments and blank lines
			if ( line.length === 0 || line.startsWith('//') ) {
				continue
			}

			// Split the line at its first space. The first entry is our command, the rest are its parameters.
			let input = line.split(/ (.*)/)
			let cmd = command.find( input[0] )

			if ( cmd ) {
				// Execute the command, storing the new version of the source text in
				// result, ready for the next command to process it
				try {
					let result = cmd.func( output, input, vars );

					// If a command returned NULL then we abort the whole recipe.
					if ( result === undefined ) {
						return
					} else if ( result instanceof String ) {
						recipe.addToLog( result, input[0] )
					} else {
						output = result
					}
				} catch ( e ) {
					recipe.addToLog( 'Something went wrong with this command. Check the console.', input[0] )
					error = e
				}
			} else {
				recipe.addToLog( 'Unknown command: <strong>' + input[0] + '</strong' )
			}
		}

		// Finished looping. Better print the results ...
		let textarea = document.getElementById('out')
		textarea.value = ''

		// If we only got a blank string array then don't embellish with line returns
		if ( output.length === 1 && output[0] === '' ) {
			return
		}

		// Otherwise show each line in the result array with a line return
		for ( let line of output ) {
			textarea.value = textarea.value + line + '\n'
		}

		if ( error ) { throw error }
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
	},

	/**
	 * Clear the log down, usually in readiness for a new recipe execution!
	 */
	clearLog: () => {
		let log = document.getElementById( 'log' )
		log.innerHTML = ''
	},

	/**
	 * Writes a new message to the error log
	 */
	addToLog: ( msg, cmd ) => {
		// If a command was included, safely format and add it to the message
		if ( cmd ) {
			msg = '<strong>' + cmd.replaceAll( '<','&lt;' ) + '</strong> &mdash; ' + msg
		}

		// Build the error UI
		let entry = document.createElement( 'li' )
		entry.innerHTML = msg
		let log = document.getElementById( 'log' )
		log.appendChild( entry )
	}
}