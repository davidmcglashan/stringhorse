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
