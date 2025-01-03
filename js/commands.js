const command = {
	version: "v1.3.1",

	commands: [
		{
			// ==================================================================================
			command: 	"k=",
			params: 	"[string]",
			desc: 		"Retains only lines which contain [string].",
			short: 		"Keep matching lines",
			also: 		[ "-=" ],

			func: ( arr, cmd, vars ) => {
				result = ''
			
				if ( cmd[1] === undefined || cmd[1].length === 0 ) {
					return new String( 'k=: k= requires something to match with' )
				}
			
				// Check the parameters for variables.
				let match = recipe.getVariable( vars, cmd[1] )
				let	array = []
				for ( let ar of arr ) {
					if ( ar.indexOf( match ) !== -1 ) {
						array.push( ar )
					}
				}
				return array			
			}
		},{
			// ==================================================================================
			command: 	"-=",
			params: 	"[string]",
			desc: 		"Retains only lines which <em>do not</em> contain [string].",
			short: 		"Remove matching lines",
			also: 		[ "k=" ],

			func: ( arr, cmd, vars ) => {
				let result = ''

				// Build the string first.
				if ( cmd[1] === undefined || cmd[1].length === 0 ) {
					return new String( '-=: -= requires something to match with' )
				}
			
				// Check the parameters for variables.
				let match = recipe.getVariable( vars, cmd[1] )
				let array = []

				for ( let ar of arr ) {
					if ( ar.indexOf( match ) === -1 ) {
						array.push( ar )
					}
				}
				return array
			}
		}, {
			// ==================================================================================
			command: 	"+<",
			params: 	"[string]",
			desc: 		"Adds [string] to the start of each line.",
			short: 		"Add to beginning",
			also: 		[ "+>", "-<", "->", "k<", "k>" ],

			func: ( arr, cmd, vars ) => {
				let result = []

				// Check the parameters for variables.
				let match = recipe.getVariable( vars, cmd[1] )
			
				// Now put that string at the start of each line in the array.
				for ( let ar of arr ) {
					result.push( match + '' + ar )
				}
				return result
			}
		}, {
			// ==================================================================================
			command: 	"k<",
			params: 	"[number]",
			desc: 		"Keep only the first [number] characters on each line.",
			short: 		"Keep the beginning",
			also: 		[ "+<",	"+>", "-<", "->", "k>" ],

			func: ( arr, cmd, vars ) => {
				let result = []

				// Check there was an input ...
				if ( cmd[1] === undefined || cmd[1].length === 0 ) {
					return new String( 'k<: k< requires a numeric parameter for the length of its string.' )
				}
			
				// Check the parameters for variables.
				let match = recipe.getVariable( vars, cmd[1] )
				let i = parseInt(match)
			
				for ( let ar of arr ) {
					result.push( ar.substring(0,i) )
				}
				return result
			}
		}, {
			// ==================================================================================
			command: 	"-<",
			params: 	"[number]",
			desc: 		"Remove the first [number] characters on each line.",
			short: 		"Remove the beginning",
			also: 		[ "+<", "+>", "->", "k<", "k>" ],

			func: ( arr, cmd, vars ) => {
				let result = []

				// Check there was an input ...
				if ( cmd[1] === undefined || cmd[1].length === 0 ) {
					return new String( '-<: -< requires a numeric parameter for the length of its removal.' )
				}
			
				// Check the parameters for variables.
				let match = recipe.getVariable( vars, cmd[1] )
				let i = parseInt(match)
			
				for ( let ar of arr ) {
					result.push( ar.substring(i) )
				}
				return result
			}
		}, {
			// ==================================================================================
			command: 	"+>",
			params: 	"[string]",
			desc: 		"Adds [string] to the end of each line.",
			short: 		"Add to end",
			also: 		[ "+<", "-<", "->", "k<", "k>" ],

			func: ( arr, cmd, vars ) => {
				result = []

				// Check the parameters for variables.
				let match = recipe.getVariable( vars, cmd[1] )
			
				// Now put that string at the end of each line in the array.
				for ( let ar of arr ) {
					result.push( ar + '' + match )
				}
				return result
			}
		}, {
			// ==================================================================================
			command: 	"k>",
			params: 	"[number]",
			desc: 		"Keep only the last [number] characters on each line.",
			short: 		"Keep the end",
			also: 		[ "+<", "+>", "-<", "->", "k<" ],

			func: ( arr, cmd, vars ) => {
				let result = []

				// Check there was an input ...
				if ( cmd[1] === undefined || cmd[1].length === 0 ) {
					return new String( 'tail: tail requires a numeric parameter for the length of its string.' )
				}
			
				// Check the parameters for variables.
				let match = recipe.getVariable( vars, cmd[1] )
				let i = parseInt(match)
			
				for ( let ar of arr ) {
					result.push( ar.substring(ar.length-i,ar.length) )
				}
				return result	
			}
		}, {
			// ==================================================================================
			command: 	"->",
			params: 	"[number]",
			desc: 		"Remove the last [number] characters on each line.",
			short: 		"Remove the end",
			also: 		[ "+<", "+>", "-<", "k<", "k>" ],

			func: ( arr, cmd, vars ) => {
				let result = []
		
				// Check there was an input ...
				if ( cmd[1] === undefined || cmd[1].length === 0 ) {
					return new String( '->: -> requires a numeric parameter for the length of its removal.' )
				}
			
				// Check the parameters for variables.
				let match = recipe.getVariable( vars, cmd[1] )
				let i = parseInt(match)
			
				for ( let ar of arr ) {
					result.push( ar.substring(0,ar.length-i) )
				}
				return result			
			}
		}, {
			// ==================================================================================
			command: 	"kaz",
			params: 	"([string])",
			desc: 		"Keeps only the alphabet characters in each line. Optional second parameter defines what to separate the new words with.",
			short: 		"Keep letters",
			also: 		[ "k09", "k**" ],

			func: ( arr, cmd, vars ) => {
				return command.doKeep( arr, cmd, vars, /[\W\d]+/g )
			}
		}, {
			// ==================================================================================
			command:  	"k09",
			params: 	"([string])",
			desc: 		"Keeps only the numbers in each line. Optional second parameter defines what to separate the new words with.",
			short: 		"Keep numbers",
			also: 		[ "kaz", "k**" ],

			func: ( arr, cmd, vars ) => {
				return command.doKeep( arr, cmd, vars, /\D+/g )
			}
		}, {
			// ==================================================================================
			command: 	"k**",
			params: 	"([string])",
			desc: 		"Keeps only the symbols in each line. Optional second parameter defines what to separate the new words with.",
			short: 		"Keep symbols",
			also: 		[ "kaz", "k09" ],

			func: ( arr, cmd, vars ) => {
				return command.doKeep( arr, cmd, vars, /[A-Za-z0-9 ]+/g )
			}
		}, {
			// ==================================================================================
			command: 	"kcolumn",
			params: 	"([number])",
			desc: 		"Removes everything except column [number], where a column is a whitspace-separated string. [number] defaults to 1.",
			short: 		"Keep a column",
			also: [	"-column" ],

			func: ( arr, cmd, vars ) => {
				let result = []
				let splitter = /\s+/
			
				// Check the parameters for variables.
				let match = recipe.getVariable( vars, cmd[1] )
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
		}, {
			// ==================================================================================
			command: 	"-",
			params: 	"[string]",
			desc: 		"Removes the first instance of [string] on each line.",
			short: 		"Remove a string",
			also: 		[ "--", "-<", "->" ],

			func: ( arr, cmd, vars ) => {
				let result = []

				if ( cmd[1] === undefined || cmd[1].length === 0 ) {
					return new String( '-: - requires a search string to remove.' )
				}
			
				// Check the parameters for variables.
				let match = recipe.getVariable( vars, cmd[1] )
			
				for ( let ar of arr ) {
					result.push( ar.replace( match,'' ) )
				}
				return result		
			}
		}, {
			// ==================================================================================
			command: 	"--",
			params: 	"[a]",
			desc: 		"Removes every instance of [a] on each line.",
			short: 		"Remove all strings",
			also: 		[ "-", "-<", "->" ],
			
			func: ( arr, cmd, vars ) => {
				let result = []

				if ( cmd[1] === undefined || cmd[1].length === 0 ) {
					return new String( '--: -- requires a search string to remove.' )
				}
			
				// Check the parameters for variables.
				let match = recipe.getVariable( vars, cmd[1] )
			
				for ( let ar of arr ) {
					result.push( ar.replaceAll( match,'' ) )
				}
				return result
			}
		}, {
			// ==================================================================================
			command: 	"-az",
			desc: 		"Removes the alphabet characters from each line, leaving only whitespace, the symbols, and the numbers.",
			short: 		"Remove the letters",
			also:		[ "-09", "-**" ],

			func: ( arr, cmd, vars ) => {
				let result = []
				for ( let line of arr ) {
					result.push( line.replace( /[A-Za-z]/g, '') )
				}
			
				return result
			}
		}, {
			// ==================================================================================
			command: 	"-09",
			desc: 		"Removes the numbers from each line, leaving only whitespace, the symbols, and the alphabet characters.",
			short: 		"Remove the numbers",
			also: 		[ "-az", "-**" ],

			func: ( arr, cmd, vars ) => {
				let result = []
				for ( let line of arr ) {
					result.push( line.replace( /[0-9]/g, '') )
				}
			
				return result
			}
		}, {
			// ==================================================================================
			command: 	"-**",
			desc: 		"Removes the symbol characters from each line, leaving only whitespace, the numbers, and the alphabet characters.",
			short: 		"Remove the symbols",
			also: 		[ "-09", "-az" ],

			func: ( arr, cmd, vars ) => {
				let result = []
				for ( let line of arr ) {
					result.push( line.replace( /[\W_]/g, '') )
				}
			
				return result
			}
		}, {
			// ==================================================================================
			command: 	"-ws",
			desc: 		"Removes all the whitespace from each line, leaving only the numbers, symbols, and alphabet characters.",
			short: 		"Remove the whitespace",
			also: 		[ "-<ws", "->ws", "-blanks", "-dupes" ],

			func: ( arr, cmd, vars ) => {
				result = []
				for ( let ar of arr ) {
					result.push( ar.replace( /\s/g, '' ) )
				}
				return result
			}
		}, {
			// ==================================================================================
			command: 	"->=",
			params: 	"[string]",
			desc: 		"Removes the text after first instance of [string] on each line, leaving [string] in place.",
			short: 		"Remove after a string",
			also: 		[ "-<=", "-", "--" ],

			func: ( arr, cmd, vars ) => {
				let result = []

				// Check the parameters for variables.
				let match = recipe.getVariable( vars, cmd[1] )
			
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
		}, {
			// ==================================================================================
			command: 	"-<=",
			params: 	"[string]",
			desc: 		"Removes the text before first instance of [string] on each line, leaving [string] in place.",
			short: 		"Remove before a string",
			also: 		[ "-", "--", "->=" ],

			func: ( arr, cmd, vars ) => {
				let result = []

				// Check the parameters for variables.
				let match = recipe.getVariable( vars, cmd[1] )
			
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
		}, {
			// ==================================================================================
			command: 	"-<ws",
			desc: 		"Removes the leading whitespace or indentation from each line.",
			short: 		"Remove leading whitespace",
			also: 		[ "-ws", "->ws", "-blanks",	"-dupes" ],

			func: ( arr, cmd, vars ) => {
				result = []
				for ( let ar of arr ) {
					result.push( ar.replace( /^\s+/gm, '' ) )
				}
				return result
			}
		}, {
			// ==================================================================================
			command: 	"->ws",
			desc: 		"Removes any trailing whitespace from each line.",
			short: 		"Remove trailing whitespace",
			also: 		[ "-ws", "-<ws", "-blanks", "-dupes" ],

			func: ( arr, cmd, vars ) => {
				result = []
				for ( let ar of arr ) {
					result.push( ar.replace( /\s+$/gm, '' ) )
				}
				return result
			}
		}, {
			// ==================================================================================
			command: 	"-blanks",
			desc: 		"Removes any empty or blank lines from the original text.",
			short: 		"Remove blank lines",
			also: 		[ "-dupes", "-ws", "-<ws", "->ws" ],
			
			func: ( arr, cmd, vars ) => {
				result = []
				for ( let ar of arr ) {
					if ( ar.length > 0 ) {
						result.push( ar )
					}
				}
				return result
			}
		}, {
			// ==================================================================================
			command: 	"-dupes",
			desc: 		"Removes any duplicate lines from the original text.",
			short: 		"Remove duplicate lines",
			also: 		[ "-blanks", "-ws", "-<ws", "->ws" ],

			func: ( arr, cmd, vars ) => {
				let result = []
				let bin = {}

				for ( let ar of arr ) {
					if ( bin[ar] !== 'match' ) {
						result.push( ar )
					}
					bin[ar] = 'match'
				}
				return result
			}
		}, {
			// ==================================================================================
			command: 	"-column",
			params: 	"([number])",
			desc: 		"Removes column [number], where a column is a whitspace-separated string. [number] defaults to 1.",
			short: 		"Remove a column",
			also: 		[ "kcolumn"	],

			func: ( arr, cmd, vars ) => {
				let result = []
				let splitter = /\s+/
			
				// Check the parameters for variables.
				let match = recipe.getVariable( vars, cmd[1] )
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
		}, {
			// ==================================================================================
			command: 	"s",
			params: 	"[a] [b]",
			desc: 		"Replaces the first instance of [a] on each line with [b]. [a] and [b] are separated by whitespace. They should be variables in complex whitespace cases.",
			short: 		"Swap once",
			also: 		[ "ss" ],

			func: ( arr, cmd, vars ) => {
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
			
				let src = recipe.getVariable( vars, params[0] )
				let dst = recipe.getVariable( vars, params[1] )
			
				for ( let ar of arr ) {
					result.push( ar.replace( src, dst ) )
				}
				return result
			}
		}, {
			// ==================================================================================
			command: 	"ss",
			params: 	"[a] [b]",
			desc: 		"Replaces every instance of [a] on each line with [b]. [a] and [b] are separated by whitespace. They should be variables in complex whitespace cases.",
			short: 		"Swap all",
			also: 		[ "s" ],

			func: ( arr, cmd, vars ) => {
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
			
				let src = recipe.getVariable( vars, params[0] )
				let dst = recipe.getVariable( vars, params[1] )
			
				for ( let ar of arr ) {
					result.push( ar.replaceAll( src, dst ) )
				}
				return result
			}
		}, {
			// ==================================================================================
			command: 	"|",
			params: 	"([string])",
			desc: 		"Split the lines on occurances of [string] (or any whitespace if not provided), removing the [string] in the process.",
			short: 		"Split lines",

			func: ( arr, cmd, vars ) => {
				result = []
		
				// Use the default if there's no passed in splitter.
				let splitter = cmd[1]
				if ( cmd[1] === undefined || cmd[1].length === 0 ) {
					splitter = /\s+/
				} else {
					// Check the parameters for variables.
					splitter = recipe.getVariable( vars, cmd[1] )
				}
			
				for ( let ar of arr ) {
					for ( let a of ar.split( splitter ) ) {
						result.push( a )
					}
				}

				return result
			}
		}, {
			// ==================================================================================
			command: 	"j",
			params: 	"([number])",
			desc: 		"Joins multiple lines together, starting a newline after number (or not at all if omitted).",
			short: 		"Join lines",
			also:		[ "jspace", "jtab" ],

			func: ( arr, cmd, vars ) => {
				return command.doJoin( arr, cmd, '' )
			}	
		}, {
			// ==================================================================================
			command: 	"jspace",
			params: 	"([number])",
			desc: 		"Joins multiple lines together with a space in between joins, starting a newline after number (or not at all if omitted).",
			short: 		"Join lines using spaces",
			also:		[ "j", "jtab" ],

			func: ( arr, cmd, vars ) => {
				return command.doJoin( arr, cmd, ' ' )
			}
		}, {
			// ==================================================================================
			command: 	"jtab",
			params: 	"([number])",
			desc: 		"Joins multiple lines together with a TAB in between joins, starting a newline after number (or not at all if omitted).",
			short: 		"Join lines using TABs",
			also:		[ "j", "jspace" ],

			func: ( arr, cmd, vars ) => {
				return command.doJoin( arr, cmd, '\t' )
			}
		}, {
			// ==================================================================================
			command: 	"_",
			params: 	"[a] ([b])",
			desc: 		"Collapses any runs of [a] in the original text's lines into one single instance of [a] or [b].",
			short: 		"Collapse characters together",

			func: ( arr, cmd, vars ) => {
				let result = []
				let delim = ' '

				// We need a search string.
				if ( cmd[1] === undefined || cmd[1].length === 0 ) {
					return new String( '_: _ requires a search string to collapse.' )
				} 

				// The various parameters we need to divine for ourselves ...
				let params = cmd[1].split(delim)
				let src = recipe.getVariable( vars, params[0] ).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
				let regex = new RegExp( src + "+", "g" );

				// If there isn't a destination string we use the search string again.
				let rep = ' '
				if ( params.length === 1 || params[1] === undefined || params[1].length === 0 ) {
					rep = recipe.getVariable( vars, params[0] )
				} else {
					rep = recipe.getVariable( vars, params[1] )
				}

				// Do the replacement on each line.
				for ( let line of arr ) {
					result.push( line.replace( regex, rep ) )
				}
			
				return result
			}
		}, {
			// ==================================================================================
			command: 	"lower",
			desc: 		"Converts the original text into lower case.",
			short: 		"To lower case",
			also: 		[ "upper", "cap" ],

			func: ( arr, cmd, vars ) => {
				result = []
				for ( let ar of arr ) {
					result.push( ar.toLowerCase() )
				}
				return result
			}
		}, {
			// ==================================================================================
			command: 	"upper",
			desc: 		"Converts the original text into upper case.",
			short: 		"To upper case",
			also: 		[ "lower", "cap" ],

			func: ( arr, cmd, vars ) => {
				result = []
				for ( let ar of arr ) {
					result.push( ar.toUpperCase() )
				}
				return result
			}
		}, {
			// ==================================================================================
			command: 	"cap",
			desc: 		"Capitalises each line of the original text",
			short: 		"Capitalise",
			also: 		[ "lower", "upper" ],

			func: ( arr, cmd, vars ) => {
				result = []
				for ( let ar of arr ) {
					let line = ar.toLowerCase()
					if ( line.length > 0 ) {
						result.push( line[0].toUpperCase() + line.substr(1) )
					} else {
						result.push( '' )
					}
				}
				return result
			}
		}, {
			// ==================================================================================
			command: 	"number",
			params: 	"([number])",
			desc: 		"Number the lines starting at 1, or at [number] if it is provided.",
			short: 		"Number the lines",

			func: ( arr, cmd, vars ) => {
				let i = parseInt(cmd[1]) || 1
				result = []
			
				for ( let ar of arr ) {
					result.push( i + '. ' + ar )
					i++
				}
				return result		
			}
		}, {
			// ==================================================================================
			command: 	"sort",
			params: 	"([number])",
			desc: 		"Sorts the original text's lines alphabetically. [number] can be provided to sort by a column.",
			short: 		"Alphabetical sort",
			also: 		[ "nsort" ],

			func: ( arr, cmd, vars ) => {
				let collator = new Intl.Collator(undefined, {numeric: false, sensitivity: 'base'})
				return command.doSort( arr, cmd, collator )
			}
		}, {
			// ==================================================================================
			command: 	"nsort",
			params: 	"([number])",
			desc: 		"Sorts the original text's lines naturally (e.g. 1, 2, 10). [number] can be provided to sort by a column.",
			short: 		"Natural sort",
			also: 		[ "reverse" ],

			func: ( arr, cmd, vars ) => {
				let collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'})
				return command.doSort( arr, cmd, collator )
			}
		}, {
			// ==================================================================================
			command: 	"reverse",
			desc: 		"Reverses the line order of the original text.",
			short: 		"Reverse line order",
			also: 		[ "sort" ],

			func: ( arr, cmd, vars ) => {
				return arr.reverse()
			}
		}, {
			// ==================================================================================
			command: 	"explode",
			desc: 		"Explode the text by inserting blank lines in between the existing ones.",
			short: 		"Insert blank lines",
			also: 		[ "|" ],

			func: ( arr, cmd, vars ) => {
				result = []
				for ( let ar of arr ) {
					result.push( ar )
					result.push( '' )
				}
				result.pop()
				return result
			}
		}, {
			// ==================================================================================
			command: 	"decode",
			desc: 		"Decode each line as if it's an encoded URL e.g. %20 becomes a space, and so on.",
			short: 		"URL-safe decoding",
			also: 		[ "encode" ],

			func: ( arr, cmd, vars ) => {
				result = []
				for ( let ar of arr ) {
					result.push( decodeURI(ar) )
				}
				return result
			}
		}, {
			// ==================================================================================
			command: 	"encode",
			desc: 		"Encode each line for safe use in a URL e.g. spaces become %20, and so on.",
			short: 		"URL-safe encoding",
			also: 		[ "decode" ],

			func: ( arr, cmd, vars ) => {
				result = []
				for ( let ar of arr ) {
					result.push( encodeURI(ar) )
				}
				return result
			}
		}, {
			// ==================================================================================
			command: 	"info",
			desc: 		"Shows some info about the output: lines, words, chars, etc.",
			short: 		"Text information",
			
			func: ( arr, cmd, vars ) => {
				let info = document.getElementById('info')

				// Create a <ul> to list the URLs
				let h2 = document.createElement('h2')
				h2.innerHTML = 'Info'
				info.replaceChildren(h2)
			
				let dl = document.createElement('dl')
				info.appendChild( dl )
			
				// Count the lines
				datum( dl, 'Lines', arr.length )
			
				cc = 0
				wc = 0
				for ( let ar of arr ) {
					cc = cc + ar.length
					wc = wc + ar.split( ' ' ).length
				}
			
				datum( dl, 'Words', wc )
				datum( dl, 'Characters', cc )
			
				// Make the UI visible
				info.classList.remove('hidden')
				document.getElementById('out').classList.add('hidden')
			}
		}, {
			// ==================================================================================
			command: 	"wwwify",
			desc: 		"Pretends the original text is a list of hyperlinks and displays them as anchor tags so they can be clicked and visited.",
			short: 		"Make links clickable",

			func: ( arr, cmd, vars ) => {
				let info = document.getElementById('info')
				let mono = document.createElement('div')
				mono.classList.add('mono')
				mono.classList.add('webify')
				info.replaceChildren(mono)
			
				// Create a <ul> to list the URLs
				let ul = document.createElement('ul')
				mono.appendChild(ul)
			
				for ( let url of urls ) {
					if ( url.length > 0 ) {
						let li = document.createElement('li')
						ul.appendChild(li)
						let a = document.createElement('a')
						li.appendChild(a)
			
						a.title = url
						a.href = url
						a.innerHTML = url
						a.target = '_blank'
					}
				}
			
				// Make the UI visible
				info.classList.remove('hidden')
				document.getElementById('out').classList.add('hidden')
			}
		}
	],

	/**
	 * Generic keep function supporting knumbers, kalphas, and ksymbols.
	 */
	doKeep: ( arr, cmd, vars, regexp ) => {
		let result = []
		
		// Work out what character to put in between the numbers, if any ...
		let sep = ''
		if ( cmd[1] === undefined || cmd[1].length === 0 ) {
			sep = ''
		} else {
			// Check the parameters for variables.
			sep = recipe.getVariable( vars, cmd[1] )
		}

		// Do the replacement on each line.
		for ( let line of arr ) {
			result.push( line.replace( regexp, sep ).trim() )
		}

		return result
	},

	/**
	 * Implements the join functions.
	 */
	doJoin: ( arr, cmd, join ) => {
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
	},

	/**
	 * Performs the sort functions.
	 */
	doSort: (arr,cmd,collator) => {
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
}