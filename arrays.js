
/**
 * Takes whatever array is passed in and sorts it
 */
function sort(arr) {
	return arr.sort()
}

/**
 * Takes whatever array is passed in and sorts it in reverse order
 */
function sortZA(arr) {
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