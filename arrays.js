/**
 * Takes whatever array is passed in and reverses it
 */
function reverse(arr) {
	return arr.reverse()
}

/**
 * Takes whatever array is passed in and sorts it
 */
function sort(arr) {
	return arr.sort()
}

/**
 * Takes whatever array is passed in and sorts it in reverse order
 */
function sortza(arr) {
	return arr.sort().reverse()
}

/**
 * Takes whatever array in passed in and tokenises all its constituent strings
 */
function tokenise(arr) {
	result = []
	for ( let ar of arr ) {
		for ( let a of ar.split( ' ' ) ) {
			result.push(a)
		}
	}
	return result
}

/**
 * Takes whatever array in passed in and flattens it to a single string
 */
function flatten(arr) {
	result = ''
	for ( let ar of arr ) {
		result = result + ar
	}
	array = []
	array.push(result)
	return array
}

/**
 * Takes whatever array is passed in and flattens it to a single, space separated string.
 */
function flattens(arr) {
	result = ''
	for ( let ar of arr ) {
		result = result + ar + ' ' 
	}
	array = []
	array.push(result.trim())
	return array
}

/**
 * Matches strings against the passed-in term. Rejects lines which don't.
 */
function grep(arr,cmd) {
	result = ''

	// Build the string first.
	var what = ''
	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		return new String( 'grep: grep requires something to match with' )
	} else {
		for ( let i=1; i < cmd.length; i++ ) {
			what = what + cmd[i] + ' ' 
		}
		what = what.substring( 0, what.length-1 )
	}

	array = []
	for ( let ar of arr ) {
		if ( ar.indexOf(what) !== -1 ) {
			array.push( ar )
		}
	}
	return array
}