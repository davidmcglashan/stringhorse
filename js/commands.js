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

/**
 * Reverses the line order of the original text.
 */
function _reverse(arr) {
	return arr.reverse()
}

/**
 * Sorts the original text's lines naturally (e.g. 1, 2, 10). [number] can be provided to sort by a column.
 */
function _nsort(arr,cmd) {
	let collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'})
	return doSort( arr, cmd, collator )
}

/**
 * Sorts the original text's lines alphabetically. [number] can be provided to sort by a column.
 */
function _sort(arr,cmd) {
	let collator = new Intl.Collator(undefined, {numeric: false, sensitivity: 'base'})
	return doSort( arr, cmd, collator )
}

/**
 * Performs the sort functions.
 */
function doSort(arr,cmd,collator) {
	// Simply sort if there's no parameter.
	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		return arr.sort( collator.compare )
	}

	// Which column to sort by?
	let col = parseInt(cmd[1]) || 1

	// Extract a little dictionary of lines by their column. Then we'll sort the keys and re-assemble the array.
	let dict = {}
	let unsortable = []

	for ( let line of arr ) {
		let i = 0

		for ( let word of line.trim().split( /\s+/ ) ) {
			i=i+1
			if ( i === col ) {
				if ( dict[word] === undefined ) {
					dict[word] = []
				}
				dict[word].push(line)
				break
			}
		}

		// If we didn't even make it to the column put it in unsortable
		if ( i < col ) {
			unsortable.push(line)
		}
	}

	let result = []
	keys = Object.keys(dict).sort( collator.compare )
	for ( let key of keys ) {
		for ( let line of dict[key] ) {
			result.push( line )
		}
	}

	// Re-include the unsortable ones at the bottom.
	for ( let line of unsortable ) {
		result.push( line )
	}

	return result
}

/**
 * Joins multiple lines together, starting a newline after number (or not at all if omitted).
 */
function _j(arr,cmd) {
	return join( arr,cmd,'' )
}

/**
 * Joins multiple lines together with a space in between joins, starting a newline after number (or not at all if omitted).
 */
function _jspace(arr,cmd) {
	return join( arr,cmd,' ' )
}

/**
 * Joins multiple lines together with a TAB in between joins, starting a newline after number (or not at all if omitted).
 */
function _jtab(arr,cmd) {
	return join( arr,cmd,'\t' )
}

/**
 * Implements the join functions.
 */
function join( arr, cmd, join ) {
	let result = ''
	let array = []
	let i = parseInt(cmd[1]) || 999999

	let j = 0
	for ( let ar of arr ) {
		result = result + ar + join

		// Every j tokens, start a new line
		j++
		if ( j === i ) {
			array.push(result)
			result = ''
			j = 0
		}
	}
	
	// Join any unpushed content.
	if ( j !== 0 ) {
		array.push(result)
	}

	return array
}

/**
 * Explode the text by inserting blank lines in between the existing ones.
 */
function _explode( arr ) {
	result = []
	for ( let ar of arr ) {
		result.push( ar )
		result.push( '' )
	}
	result.pop()
	return result
}

/**
 * Number the lines starting at 1, or at [number] if it is provided.
 */
function _number( arr,cmd ) {
	let i = parseInt(cmd[1]) || 1
	result = []

	for ( let ar of arr ) {
		result.push( i + '. ' + ar )
		i++
	}
	return result
}

/**
 * Retains only lines which contain [string].
 */
function _kequals(arr,cmd,vars) {
	result = ''

	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		return new String( 'k=: k= requires something to match with' )
	}

	// Check the parameters for variables.
	let match = getVariable( vars, cmd[1] )

	array = []
	for ( let ar of arr ) {
		if ( ar.indexOf( match ) !== -1 ) {
			array.push( ar )
		}
	}
	return array
}

/**
 * Retains only lines which do not contain [string].
 */
function _minusequals( arr, cmd, vars ) {
	result = ''

	// Build the string first.
	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		return new String( '-=: -= requires something to match with' )
	}

	// Check the parameters for variables.
	let match = getVariable( vars, cmd[1] )

	array = []
	for ( let ar of arr ) {
		if ( ar.indexOf( match ) === -1 ) {
			array.push( ar )
		}
	}
	return array
}

/**
 * Removes all the whitespace from each line, leaving only the numbers, symbols, and alphabet characters.
 */
function _minusws(arr) {
	result = []
	for ( let ar of arr ) {
		result.push( ar.replace( /\s/g, '' ) )
	}
	return result
}

/**
 * Removes the leading whitespace or indentation from each line.
 */
function _minusltws(arr) {
	result = []
	for ( let ar of arr ) {
		result.push( ar.replace( /^\s+/gm, '' ) )
	}
	return result
}

/**
 * Removes any trailing whitespace from each line.
 */
function _minusgtws(arr) {
	result = []
	for ( let ar of arr ) {
		result.push( ar.replace( /\s+$/gm, '' ) )
	}
	return result
}

/**
 * Removes any empty or blank lines from the original text.
 */
function _minusblanks(arr) {
	result = []
	for ( let ar of arr ) {
		if ( ar.length > 0 ) {
			result.push( ar )
		}
	}
	return result
}

/**
 * Converts the original text into upper case.
 */
function _upper(arr) {
	result = []
	for ( let ar of arr ) {
		result.push( ar.toUpperCase() )
	}
	return result
}

/**
 * Converts the original text into lower case.
 */
function _lower(arr) {
	result = []
	for ( let ar of arr ) {
		result.push( ar.toLowerCase() )
	}
	return result
}

/**
 * Removes every instance of the search string from each line.
 */
function _minusminus( arr, cmd, vars ) {
	let result = []

	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		return new String( '--: -- requires a search string to remove.' )
	}

	// Check the parameters for variables.
	let match = getVariable( vars, cmd[1] )

	for ( let ar of arr ) {
		result.push( ar.replaceAll( match,'' ) )
	}
	return result
}

/**
 * Removes the first instance of the search string from each line.
 */
function _minus( arr, cmd, vars ) {
	let result = []

	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		return new String( '-: - requires a search string to remove.' )
	}

	// Check the parameters for variables.
	let match = getVariable( vars, cmd[1] )

	for ( let ar of arr ) {
		result.push( ar.replace( match,'' ) )
	}
	return result
}

/**
 * Removes the text before first instance of the search string on each line, leaving the search string in place.
 */
function _minusltequals( arr, cmd, vars ) {
	let result = []

	// Check the parameters for variables.
	let match = getVariable( vars, cmd[1] )

	for ( let ar of arr ) {
		let i = ar.indexOf(match)
		if ( i !== -1 ) {
			result.push( ar.substring( i,ar.length ) )
		} else {
			result.push( ar )
		}
	}
	return result
}

/**
 * Removes the text after first instance of the search string on each line, leaving the search string in place.
 */
function _minusgtequals( arr, cmd, vars ) {
	let result = []

	// Check the parameters for variables.
	let match = getVariable( vars, cmd[1] )

	for ( let ar of arr ) {
		let i = ar.indexOf(match)
		if ( i !== -1 ) {
			result.push( ar.substring( 0,i+cmd[1].length ) )
		} else {
			result.push( ar )
		}
	}
	return result
}

/**
 * Adds the search string to the start of each line.
 */
function _pluslt( arr, cmd, vars ) {
	result = []

	// Check the parameters for variables.
	let match = getVariable( vars, cmd[1] )

	// Now put that string at the start of each line in the array.
	for ( let ar of arr ) {
		result.push( match + '' + ar )
	}
	return result
}

/**
 * Adds the search string to the end of each line.
 */
function _plusgt( arr, cmd, vars ) {
	result = []

	// Check the parameters for variables.
	let match = getVariable( vars, cmd[1] )

	// Now put that string at the end of each line in the array.
	for ( let ar of arr ) {
		result.push( ar + '' + match )
	}
	return result
}

/**
 * Keep only the first [number] characters on each line.
 */
function _klt( arr, cmd, vars ) {
	result = []

	// Check there was an input ...
	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		return new String( 'head: head requires a numeric parameter for the length of its string.' )
	}

	// Check the parameters for variables.
	let match = getVariable( vars, cmd[1] )
	let i = parseInt(match)

	for ( let ar of arr ) {
		result.push( ar.substring(0,i) )
	}
	return result
}

/**
 * Keep only the last [number] characters on each line.
 */
function _kgt(arr,cmd) {
	let result = []

	// Check there was an input ...
	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		return new String( 'tail: tail requires a numeric parameter for the length of its string.' )
	}

	// Check the parameters for variables.
	let match = getVariable( vars, cmd[1] )
	let i = parseInt(match)

	for ( let ar of arr ) {
		result.push( ar.substring(ar.length-i,ar.length) )
	}
	return result	
}

/**
 * Remove the first [number] characters on each line.
 */
function _minuslt( arr, cmd, vars ) {
	result = []

	// Check there was an input ...
	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		return new String( '-<: -< requires a numeric parameter for the length of its removal.' )
	}

	// Check the parameters for variables.
	let match = getVariable( vars, cmd[1] )
	let i = parseInt(match)

	for ( let ar of arr ) {
		result.push( ar.substring(i) )
	}
	return result
}

/**
 * Remove the last [number] characters on each line.
 */
function _minusgt( arr, cmd, vars ) {
	let result = []
	
	// Check there was an input ...
	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		return new String( '->: -> requires a numeric parameter for the length of its removal.' )
	}

	// Check the parameters for variables.
	let match = getVariable( vars, cmd[1] )
	let i = parseInt(match)

	for ( let ar of arr ) {
		result.push( ar.substring(0,ar.length-i) )
	}
	return result	
}

/**
 * Split the lines on occurances of the search string (or any whitespace if not provided), removing the search string in the process.
 */
function _pipe( arr, cmd, vars ) {
	result = []
	
	// Use the default if there's no passed in splitter.
	let splitter = cmd[1]
	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		splitter = /\s+/
	} else {
		// Check the parameters for variables.
		splitter = getVariable( vars, cmd[1] )
	}

	for ( let ar of arr ) {
		for ( let a of ar.split( splitter ) ) {
			result.push( a )
		}
	}
	return result
}

/**
 * Removes everything except column [number], where a column is a whitspace-separated string. [number] defaults to 1.
 */
function _kcolumn( arr, cmd, vars ) {
	let result = []
	let splitter = /\s+/

	// Check the parameters for variables.
	let match = getVariable( vars, cmd[1] )
	let col = parseInt(match) || 1

	for ( let line of arr ) {
		let i = 0

		for ( let word of line.trim().split( splitter ) ) {
			i=i+1
			if ( i === col ) {
				result.push(word)
				break
			}
		}

		// If we didn't even make it to the column put a blank line in
		if ( i < col ) {
			result.push( '' )
		}
	}

	return result
}

/**
 * Removes column [number], where a column is a whitspace-separated string. [number] defaults to 1.
 */
function _minuscolumn( arr, cmd, vars ) {
	let result = []
	let splitter = /\s+/

	// Check the parameters for variables.
	let match = getVariable( vars, cmd[1] )
	let col = parseInt(match) || 1

	for ( let line of arr ) {
		let i = 0
		rep = ''
		for ( let word of line.trim().split( splitter ) ) {
			i=i+1
			if ( i !== col ) {
				rep = rep + word + ' '
			}
		}
		result.push( rep.substring(0,rep.length-1) )
	}

	return result
}

/**
 * Keeps only the alphabet characters in each line. Optional second parameter defines whether to separate these with TABs or spaces.
 */
function _kaz( arr, cmd, vars ) {
	return keep( arr, cmd, vars, /[\W\d]+/g )
}

/**
 * Keeps only the numbers in each line. Optional second parameter defines whether to separate these with TABs or spaces.
 */
function _k09( arr, cmd, vars ) {
	return keep( arr, cmd, vars, /\D+/g )
}

/**
 * Keeps only the symbols in each line. Optional second parameter defines whether to separate these with TABs or spaces.
 */
function _kstarstar( arr, cmd, vars ) {
	return keep( arr, cmd, vars, /[A-Za-z0-9 ]+/g )
}

/**
 * Generic keep function supporting knumbers, kalphas, and ksymbols.
 */
function keep( arr, cmd, vars, regexp ) {
	let result = []
	
	// Work out what character to put in between the numbers, if any ...
	let sep = ''
	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		sep = ''
	} else {
		// Check the parameters for variables.
		sep = getVariable( vars, cmd[1] )
	}

	// Do the replacement on each line.
	for ( let line of arr ) {
		result.push( line.replace( regexp, sep ).trim() )
	}

	return result
}

/**
 * Removes the alphabet characters from each line, leaving only whitespace, the symbols, and the numbers.
 */
function _minusaz( arr ) {
	let result = []
	for ( let line of arr ) {
		result.push( line.replace( /[A-Za-z]/g, '') )
	}

	return result
}

/**
 * Removes the numbers from each line, leaving only whitespace, the symbols, and the alphabet characters.
 */
function _minus09( arr ) {
	let result = []
	for ( let line of arr ) {
		result.push( line.replace( /[0-9]/g, '') )
	}

	return result
}

/**
 * Removes the symbol characters from each line, leaving only whitespace, the numbers, and the alphabet characters.
 */
function _minusstarstar( arr ) {
	let result = []
	for ( let line of arr ) {
		result.push( line.replace( /[\W_]/g, '') )
	}

	return result
}

/**
 * Collapses any runs of spaces in the original text's lines into one single space or TAB.
 */
function _cspaces( arr, cmd, vars ) {
	let result = []
	
	// Work out what the replacement character should be ...
	let rep = ' '
	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		rep = ' '
	} else {
		rep = getVariable( vars, cmd[1] )
	}

	// Do the replacement on each line.
	for ( let line of arr ) {
		result.push( line.replace( / +/g, rep ) )
	}

	return result
}

/**
 * Collapses any runs of TABs in the original text's lines into one single TAB or space.
 */
function _ctabs( arr, cmd, vars ) {
	let result = []
	
	// Work out what the replacement character should be ...
	let rep = '\t'
	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		rep = '\t'
	} else {
		rep = getVariable( vars, cmd[1] )
	}

	// Do the replacement on each line.
	for ( let line of arr ) {
		result.push( line.replace( /\t+/g, rep ) )
	}

	return result
}

/**
 * Replaces every instance of [a] on each line with [b], separated by a space
 */
function _ss( arr, cmd, vars ) {
	let result = []
	let delim = ' '

	// Check there was at least a search parameter ...
	if ( cmd.length === 1 || cmd[1] === undefined || cmd[1].length === 0 ) {
		return new String( 'ss: ss requires a search and a replace parameter.' )
	}

	// The replace parameter we might have to divine for ourselves, if it wasn't provided
	let params = cmd[1].split(delim)
	if ( params.length === 1 || params[1] === undefined || params[1].length === 0 ) {
		params[1] = ' '
	}

	let src = getVariable( vars, params[0] )
	let dst = getVariable( vars, params[1] )

	for ( let ar of arr ) {
		result.push( ar.replaceAll( src, dst ) )
	}
	return result
}

/**
 * Replaces the first instance of [a] on each line with [b]. [a] and [b] are separated by whitespace. They should be variables in complex whitespace cases.
 */
function _s( arr, cmd, vars ) {
	let result = []
	let delim = ' '

	// Check there was at least a search parameter ...
	if ( cmd.length === 1 || cmd[1] === undefined || cmd[1].length === 0 ) {
		return new String( 'ss: ss requires a search and a replace parameter.' )
	}

	// The replace parameter we might have to divine for ourselves.
	let params = cmd[1].split(delim)
	if ( params.length === 1 || params[1] === undefined || params[1].length === 0 ) {
		params[1] = ' '
	}

	let src = getVariable( vars, params[0] )
	let dst = getVariable( vars, params[1] )

	for ( let ar of arr ) {
		result.push( ar.replace( src, dst ) )
	}
	return result
}