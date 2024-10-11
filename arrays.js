
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
 * Takes whatever array in passed in and flattens it to a single, space separated string
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