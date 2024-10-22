/**
 * Takes whatever array is passed in and trims each line of its whitespace
 */
function _minusws(arr) {
	result = []
	for ( let ar of arr ) {
		result.push( ar.replace( /\s/g, '' ) )
	}
	return result
}

/**
 * Takes whatever array is passed in and trims each line of its whitespace
 */
function _minusltws(arr) {
	result = []
	for ( let ar of arr ) {
		result.push( ar.replace( /^\s+/gm, '' ) )
	}
	return result
}

/**
 * Takes whatever array is passed in and trims each line of its whitespace
 */
function _minusgtws(arr) {
	result = []
	for ( let ar of arr ) {
		result.push( ar.replace( /\s+$/gm, '' ) )
	}
	return result
}

/**
 * Takes whatever array is passed in and trims each line of its whitespace
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
 * Takes whatever array is passed in and converts it to uppercase
 */
function _upper(arr) {
	result = []
	for ( let ar of arr ) {
		result.push( ar.toUpperCase() )
	}
	return result
}

/**
 * Takes whatever array is passed in and converts it to lowercase
 */
function _lower(arr) {
	result = []
	for ( let ar of arr ) {
		result.push( ar.toLowerCase() )
	}
	return result
}

/**
 * Remove all the instances of the search string.
 */
function _minusminus(arr,cmd) {
	var result = []

	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		return new String( '--: -- requires a search string to remove.' )
	}

	for ( let ar of arr ) {
		result.push( ar.replaceAll( cmd[1],'' ) )
	}
	return result
}

/**
 * Remove the first instance of the search string.
 */
function _minus(arr,cmd) {
	var result = []

	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		return new String( '-: - requires a search string to remove.' )
	}

	for ( let ar of arr ) {
		result.push( ar.replace( cmd[1],'' ) )
	}
	return result
}

/**
 * Remove before. Requires a parameter to know before what? Otherwise a space is assumed. 
 * The 'what?' string is found and everything ahead of it is removed from the string.
 */
function _minuslt(arr,cmd) {
	var result = []

	for ( let ar of arr ) {
		let i = ar.indexOf(cmd[1])
		if ( i !== -1 ) {
			result.push( ar.substring( i,ar.length ) )
		} else {
			result.push( ar )
		}
	}
	return result
}

/**
 * Remove after. Requires a parameter to know before what? Otherwise a space is assumed. 
 * The 'what?' string is found and everything behind of it is removed from the string.
 */
function _minusgt(arr,cmd) {
	var result = []

	for ( let ar of arr ) {
		let i = ar.indexOf(cmd[1])
		if ( i !== -1 ) {
			result.push( ar.substring( 0,i+cmd[1].length ) )
		} else {
			result.push( ar )
		}
	}
	return result
}

/**
 * Pre-concatenates the array with the contents of cmd
 */
function _pluslt(arr,cmd) {
	result = []

	// Now put that string at the start of each line in the array.
	for ( let ar of arr ) {
		result.push( cmd[1] + '' + ar )
	}
	return result
}

/**
 * Concatenates the array with the contents of cmd
 */
function _plusgt(arr,cmd) {
	result = []

	// Now put that string at the end of each line in the array.
	for ( let ar of arr ) {
		result.push( ar + '' + cmd[1] )
	}
	return result
}

/**
 * Keep the first [n] characters on each line
 */
function _klt(arr,cmd) {
	result = []

	// Check there was an input ...
	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		return new String( 'head: head requires a numeric parameter for the length of its string.' )
	}
	let i = parseInt(cmd[1])

	for ( let ar of arr ) {
		result.push( ar.substring(0,i) )
	}
	return result
}

/**
 * Keep the last [n] characters on each line
 */
function _kgt(arr,cmd) {
	var result = []

	// Check there was an input ...
	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		return new String( 'tail: tail requires a numeric parameter for the length of its string.' )
	}
	let i = parseInt(cmd[1])

	for ( let ar of arr ) {
		result.push( ar.substring(ar.length-i,ar.length) )
	}
	return result	
}

/**
 * Remove the first [n] characters on each line
 */
function _minuslt(arr,cmd) {
	result = []

	// Check there was an input ...
	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		return new String( '-<: -< requires a numeric parameter for the length of its removal.' )
	}
	let i = parseInt(cmd[1])

	for ( let ar of arr ) {
		result.push( ar.substring(i) )
	}
	return result
}

/**
 * Remove the last [n] characters on each line
 */
function _minusgt(arr,cmd) {
	var result = []
	
	// Check there was an input ...
	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		return new String( '->: -> requires a numeric parameter for the length of its removal.' )
	}
	let i = parseInt(cmd[1])

	for ( let ar of arr ) {
		result.push( ar.substring(0,ar.length-i) )
	}
	return result	
}

/**
 * Takes whatever array in passed in and splits all its constituent strings
 */
function _pipe(arr,cmd) {
	result = []
	
	// Use the default if there's no passed in splitter.
	var splitter = cmd[1]
	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		splitter = /\s+/
	}

	for ( let ar of arr ) {
		for ( let a of ar.split( splitter ) ) {
			result.push( a )
		}
	}
	return result
}

/**
 * Takes whatever array in passed in and splits all its constituent strings
 */
function _pipespace(arr,cmd) {
	result = []
	var splitter = ' '

	for ( let ar of arr ) {
		for ( let a of ar.split( splitter ) ) {
			result.push( a )
		}
	}
	return result
}

/**
 * Takes whatever array in passed in and splits all its constituent strings
 */
function _pipetab(arr,cmd) {
	result = []
	var splitter = '\t'

	for ( let ar of arr ) {
		for ( let a of ar.split( splitter ) ) {
			result.push( a )
		}
	}
	return result
}

/**
 *  Highlights a particular 'column' or whitespace separated word from each line
 */
function _kcolumn( arr,cmd ) {
	var result = []
	var splitter = /\s+/
	var col = parseInt(cmd[1]) || 1

	for ( let line of arr ) {
		var i = 0

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
 *  Removes a particular 'column' or whitespace separated word from each line
 */
function _minuscolumn( arr,cmd ) {
	var result = []
	var splitter = /\s+/
	var col = parseInt(cmd[1]) || 1

	for ( let line of arr ) {
		var i = 0
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
 * Keep only the alphabet characters from each line in the text
 */
function _kaz( arr, cmd ) {
	return keep( arr, cmd, /[\W\d]+/g )
}

/**
 * Keep only the numbers from each line in the text
 */
function _k09( arr, cmd ) {
	return keep( arr, cmd, /\D+/g )
}

/**
 * Keep only the symbols from each line in the text
 */
function _kstarstar( arr, cmd ) {
	return keep( arr, cmd, /[A-Za-z0-9 ]+/g )
}

/**
 * Generic keep function supporting knumbers, kalphas, and ksymbols
 */
function keep( arr, cmd, regexp ) {
	var result = []
	
	// Work out what character to put in between the numbers, if any ...
	var sep = ''
	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		sep = ''
	} else if ( cmd[1] === 'tab' ) {
		sep = '\t'
	} else if ( cmd[1] === 'space' ) {
		sep = ' '
	}

	// Do the replacement on each line.
	for ( let line of arr ) {
		result.push( line.replace( regexp, sep ).trim() )
	}

	return result
}

/**
 * Removes only the letters from each line in the text
 */
function _minusaz( arr,cmd ) {
	var result = []
	for ( let line of arr ) {
		result.push( line.replace( /[A-Za-z]/g, '') )
	}

	return result
}

/**
 * Removes only the numbers from each line in the text
 */
function _minus09( arr,cmd ) {
	var result = []
	for ( let line of arr ) {
		result.push( line.replace( /[0-9]/g, '') )
	}

	return result
}

/**
 * Removes only the symbols from each line in the text
 */
function _minusstarstar( arr,cmd ) {
	var result = []
	for ( let line of arr ) {
		result.push( line.replace( /[\W_]/g, '') )
	}

	return result
}

/**
 * Collapse multiple spaces into one. Or a TAB
 */
function _cspaces( arr, cmd ) {
	var result = []
	
	// Work out what the replacement character should be ...
	var rep = ' '
	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		rep = ' '
	} else if ( cmd[1] === 'tab' ) {
		rep = '\t'
	}

	// Do the replacement on each line.
	for ( let line of arr ) {
		result.push( line.replace( / +/g, rep ) )
	}

	return result
}

/**
 * Collapse multiple TABs into one. Or a space
 */
function _ctabs( arr, cmd ) {
	var result = []
	
	// Work out what the replacement character should be ...
	var rep = '\t'
	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		rep = '\t'
	} else if ( cmd[1] === 'space' ) {
		rep = ' '
	}

	// Do the replacement on each line.
	for ( let line of arr ) {
		result.push( line.replace( /\t+/g, rep ) )
	}

	return result
}

function _stab( arr, cmd ) {
	return subtabs( arr, cmd, /\t/ )
}

function _stabs( arr, cmd ) {
	return subtabs( arr, cmd, /\t/g )	
}

/**
 * Replace the TABs with spaces, or the optional passed-in string
 */
function subtabs( arr, cmd, regexp ) {
	var result = []
	
	// Work out what the replacement character should be ...
	var rep = ' '
	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		rep = ' '
	} else {
		rep = cmd[1]
	}

	// Do the replacement on each line.
	for ( let line of arr ) {
		result.push( line.replace( regexp, rep ) )
	}

	return result
}

/**
 * Replace the spaces with TABs, or the optional passed-in string
 */
function _sspace( arr, cmd ) {
	return subspaces( arr, cmd, / / )
}

/**
 * Replace the spaces with TABs, or the optional passed-in string
 */
function _sspaces( arr, cmd ) {
	return subspaces( arr, cmd, / /g )
}

function subspaces( arr, cmd, regexp ) {
	var result = []
	
	// Work out what the replacement character should be ...
	var rep = '\t'
	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		rep = '\t'
	} else {
		rep = cmd[1]
	}

	// Do the replacement on each line.
	for ( let line of arr ) {
		result.push( line.replace( regexp, rep ) )
	}

	return result
}

/**
 * Swap all. Expects two parameters The first is globally replaced by the second.
 */
function _ss(arr,cmd) {
	var result = []
	var delim = ' '

	// Check there was at least a search parameter ...
	if ( cmd.length === 1 || cmd[1] === undefined || cmd[1].length === 0 ) {
		return new String( 'ss: ss requires a search and a replace parameter.' )
	}

	// The replace parameter we might have to divine for ourselves.
	var params = cmd[1].split(delim)
	if ( params.length === 1 || params[1] === undefined || params[1].length === 0 ) {
		params[1] = ' '
	}

	for ( let ar of arr ) {
		result.push( ar.replaceAll( params[0],params[1] ) )
	}
	return result
}

/**
 * Swap. Expects two parameters. The first instance of the first parameter is replaced with the second.
 */
function _s(arr,cmd) {
	var result = []
	var delim = ' '

	// Check there was at least a search parameter ...
	if ( cmd.length === 1 || cmd[1] === undefined || cmd[1].length === 0 ) {
		return new String( 'ss: ss requires a search and a replace parameter.' )
	}

	// The replace parameter we might have to divine for ourselves.
	var params = cmd[1].split(delim)
	if ( params.length === 1 || params[1] === undefined || params[1].length === 0 ) {
		params[1] = ' '
	}

	for ( let ar of arr ) {
		result.push( ar.replace( params[0],params[1] ) )
	}
	return result

}
