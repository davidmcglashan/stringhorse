/**
 * Takes whatever array is passed in and trims each line of its whitespace
 */
function trim(arr) {
	result = []
	for ( let ar of arr ) {
		result.push( ar.trim() )
	}
	return result
}

/**
 * Takes whatever array is passed in and trims each line of its whitespace
 */
function trimblanks(arr) {
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
function upper(arr) {
	result = []
	for ( let ar of arr ) {
		result.push( ar.toUpperCase() )
	}
	return result
}

/**
 * Takes whatever array is passed in and converts it to lowercase
 */
function lower(arr) {
	result = []
	for ( let ar of arr ) {
		result.push( ar.toLowerCase() )
	}
	return result
}

/**
 * Remove or replace. If there are two parameters then the first is
 * replaced with the second. Otherwise the first is removed.
 */
function r(arr,cmd) {
	var result = []

	var replacement = cmd[2]
	if ( replacement === undefined ) {
		replacement = ''
	}

	for ( let ar of arr ) {
		result.push( ar.replace(cmd[1],replacement) )
	}
	return result
}

/**
 * Pre-concatenates the array with the contents of cmd
 */
function precat(arr,cmd) {
	result = []

	// Build the string first.
	str =''
	for ( let i=1; i < cmd.length; i++ ) {
		str = str + cmd[i] + ' ' 
	}
	str = str.trim()

	// Now put that string at the start of each line in the array.
	for ( let ar of arr ) {
		result.push( str + '' + ar )
	}
	return result
}
