/**
 * Takes whatever array is passed in and reverses it
 */
function _reverse(arr) {
	return arr.reverse()
}

/**
 * Takes whatever array is passed in and sorts it using more natural comparators so that 1, 2, 10 is preserved.
 */
function _nsort(arr,cmd) {
	var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'})
	return doSort( arr, cmd, collator )
}

/**
 * Takes whatever array is passed in and sorts it strictly alphabetically
 */
function _sort(arr,cmd) {
	var collator = new Intl.Collator(undefined, {numeric: false, sensitivity: 'base'})
	return doSort( arr, cmd, collator )
}

/**
 * Performs the sort function.
 */
function doSort(arr,cmd,collator) {
	// Simply sort if there's no parameter.
	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		return arr.sort( collator.compare )
	}

	// Which column to sort by?
	var col = parseInt(cmd[1]) || 1

	// Extract a little dictionary of lines by their column. Then we'll sort the keys and re-assemble the array.
	var dict = {}
	var unsortable = []

	for ( let line of arr ) {
		var i = 0

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

	var result = []
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
 * Takes whatever array in passed in and flattens it to a single string
 */
function _clines(arr,cmd) {
	result = ''

	// Work out what character to put in between the lines, if any ...
	var sep = ''
	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		sep = ''
	} else if ( cmd[1] === 'tab' ) {
		sep = '\t'
	} else if ( cmd[1] === 'space' ) {
		sep = ' '
	}

	for ( let ar of arr ) {
		result = result + ar + sep
	}

	array = []
	array.push(result.trim())
	return array
}

/**
 * Explodes the array by inserting an empty string in between each line.
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
 * Numbers the lines.
 */
function _number( arr,cmd ) {
	var i = 1
	try {
		i = parseInt(cmd[1]) || 1
	} catch( err ) {
		i = 1
	}

	result = []
	for ( let ar of arr ) {
		result.push( i + '. ' + ar )
		i++
	}
	return result
}

/**
 * Matches strings against the passed-in term. Rejects lines which don't.
 */
function _grep(arr,cmd) {
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

/**
 * Matches strings against the passed-in term. Rejects lines which don't.
 */
function _ngrep(arr,cmd) {
	result = ''

	// Build the string first.
	var what = ''
	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		return new String( 'ngrep: ngrep requires something to match with' )
	} else {
		for ( let i=1; i < cmd.length; i++ ) {
			what = what + cmd[i] + ' ' 
		}
		what = what.substring( 0, what.length-1 )
	}

	array = []
	for ( let ar of arr ) {
		if ( ar.indexOf(what) === -1 ) {
			array.push( ar )
		}
	}
	return array
}