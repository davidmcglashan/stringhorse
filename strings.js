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
function rall(arr,cmd) {
	var result = []

	var replacement = cmd[2]
	if ( replacement === undefined ) {
		replacement = ''
	}

	for ( let ar of arr ) {
		result.push( ar.replaceAll(cmd[1],replacement) )
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
 * Remove before. Requires a parameter to know before what? Otherwise a space is assumed. 
 * The 'what?' string is found and everything ahead of it is removed from the string.
 */
function rbefore(arr,cmd) {
	var result = []

	var what = cmd[1]
	if ( what === undefined || what.length === 0 ) {
		what = ' '
	}

	for ( let ar of arr ) {
		let i = ar.indexOf(what)
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
function rafter(arr,cmd) {
	var result = []

	var what = cmd[1]
	if ( what === undefined || what.length === 0 ) {
		what = ' '
	}

	for ( let ar of arr ) {
		let i = ar.indexOf(what)
		if ( i !== -1 ) {
			result.push( ar.substring( 0,i+what.length ) )
		} else {
			result.push( ar )
		}
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

/**
 * Concatenates the array with the contents of cmd
 */
function cat(arr,cmd) {
	result = []

	// Build the string first.
	str =''
	for ( let i=1; i < cmd.length; i++ ) {
		str = str + cmd[i] + ' ' 
	}
	str = str.trim()

	// Now put that string at the end of each line in the array.
	for ( let ar of arr ) {
		result.push( ar + '' + str )
	}
	return result
}