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

	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		return new String( 'rall: rall requires at least one search string.' )
	}

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

	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		return new String( 'r: r requires at least one search string.' )
	}

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

	// Build the string first.
	var what = ''
	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		what = ' '
	} else {
		for ( let i=1; i < cmd.length; i++ ) {
			what = what + cmd[i] + ' ' 
		}
		what = what.substring( 0, what.length-1 )
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

	// Build the string first.
	var what = ''
	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		what = ' '
	} else {
		for ( let i=1; i < cmd.length; i++ ) {
			what = what + cmd[i] + ' ' 
		}
		what = what.substring( 0, what.length-1 )
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
	str = str.substring( 0, str.length-1 )

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
	str = str.substring( 0, str.length-1 )

	// Now put that string at the end of each line in the array.
	for ( let ar of arr ) {
		result.push( ar + '' + str )
	}
	return result
}

/**
 * Keep the first [n] characters on each line
 */
function head(arr,cmd) {
	result = []

	let i = parseInt(cmd[1])

	for ( let ar of arr ) {
		result.push( ar.substring(0,i) )
	}
	return result
}

/**
 * Keep the last [n] characters on each line
 */
function tail(arr,cmd) {
	var result = []
	let i = parseInt(cmd[1])

	for ( let ar of arr ) {
		result.push( ar.substring(ar.length-i,ar.length) )
	}
	return result	
}

/**
 * Remove the first [n] characters on each line
 */
function rhead(arr,cmd) {
	result = []

	let i = parseInt(cmd[1])

	for ( let ar of arr ) {
		result.push( ar.substring(i) )
	}
	return result
}

/**
 * Remove the last [n] characters on each line
 */
function rtail(arr,cmd) {
	var result = []
	let i = parseInt(cmd[1])

	for ( let ar of arr ) {
		result.push( ar.substring(0,ar.length-i) )
	}
	return result	
}

/**
 * Takes whatever array in passed in and splits all its constituent strings
 */
function split(arr,cmd) {
	result = []
	
	// Build the string first.
	var splitter = ''
	if ( cmd[1] === undefined || cmd[1].length === 0 ) {
		splitter = /\s+/
	} else {
		for ( let i=1; i < cmd.length; i++ ) {
			splitter = splitter + cmd[i] + ' ' 
		}
		splitter = splitter.substring( 0, splitter.length-1 )
	}


	for ( let ar of arr ) {
		for ( let a of ar.split( splitter ) ) {
			result.push(a)
		}
	}
	return result
}

/**
 *  Splits the text into words using whitespace characters. Takes a numeric parameter to split in every 2nd, 3rd, etc. word.
 */
function words( arr,cmd ) {
	var result = []
	var splitter = /\s+/
	var every = 1

	try {
		every = parseInt(cmd[1]) || 1
	} catch( err ) {
		every = 1
	}

	for ( let line of arr ) {
		var res = ''
		var i = 0

		for ( let word of line.trim().split( splitter ) ) {
			res = res + word + ' '
			i=i+1
			if ( i === every ) {
				result.push(res.substring(0,res.length-1))
				res = ''
				i = 0
			}
		}

		// If there's an unpushed remainder, push it before moving on
		if ( res.length !== 0 ) {
			result.push( res.substring(0,res.length-1) )
		}
	}

	return result
}

/**
 *  Highlights a particular 'column' or whitespace separated word from each line
 */
function column( arr,cmd ) {
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
function rcolumn( arr,cmd ) {
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