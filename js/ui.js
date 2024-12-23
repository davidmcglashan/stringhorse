/**
 * Focuses the passed-in element (makes it big on the UI).
 */
function focus(element) {
	let ui = document.getElementById('ui')

	// The normal class means the UI is in 'three panes' mode and we can replace it with the element passed in.
	if ( ui.classList.contains('normal') ) {
		ui.className = element;		
	} else {
		// if UI doesn't have a 'normal' class then we're reverting to it.
		ui.className = 'normal';		
	}
}

/**
 * Copy the output text into the original.
 */
function copyToOriginal() {
	let tout = document.getElementById('out')
	let toriginal = document.getElementById('src')
	toriginal.value = tout.value
	localStorage.src = tout.value
}

/**
 * Clears a textarea
 */
function clear(ta) {
	document.getElementById(ta).value = ''
	localStorage.src = document.getElementById('src').value
	localStorage.recipe = document.getElementById('rec').value
	recipe.execute()
}

/**
 * Toggles wrapping on a text area
 */
function wrap(ta) {
	document.getElementById(ta).classList.toggle( 'wrap' )
	document.getElementById(ta+'-wrap-button').classList.toggle( 'wrap' )
	if ( document.getElementById(ta).classList.contains( 'wrap' ) ) {
		localStorage['wrap-'+ta] = 'true'
	} else {
		localStorage.removeItem( 'wrap-'+ta )
	}
}

/**
 * Toggles the slide-in tray so the user can access some help.
 */
function help() {
	document.getElementById('lightbox').classList.toggle('show')
	
	// The tray starts with neither an open or closed class since this triggers an animation. First time
	// through simply set an open class on it. Subsequent goes can then toggle open and closed classes.
	let tray = document.getElementById('tray')
	if ( tray.classList.length === 0 ) {
		tray.classList.add('open')
	} else {
		tray.classList.toggle('closed')
		tray.classList.toggle('open')
	}

	// Finally, find every element was a tabIndex. These are either 'on' (0) or off ('-1') and we want to
	// toggle their states.
	let elems = document.querySelectorAll("[tabindex]");
	for ( let i = 0; i < elems.length; i++ ) {
		elems[i].tabIndex = -1 - elems[i].tabIndex;
	}
}

/**
 * Switches the tab display between the passed-in options.
 */
function tab(tdiv,tab) {
	// Grab all the lis and make the passed in tab the selected one.
	let ul = document.getElementById( tdiv+'-ul' )
	let lis = ul.children;
	for ( let i = 0; i < lis.length; i++ ) {
		let li = lis[i];
		li.classList.remove('selected')
	}
	document.getElementById( 'tab-'+tab ).classList.add('selected')
	
	// Now make the tab page itself visible
	let container = document.getElementById( tdiv )
	let divs = container.children;
	for ( let i = 0; i < divs.length; i++ ) {
		let div = divs[i];
		if ( div.classList.contains('tabs') ) {
			continue;
		}
		div.classList.add('hidden')
	}
	document.getElementById(tdiv+'-'+tab).classList.remove('hidden')
}

/**
 * Builds the help page programmatically.
 */
function buildHelp() {
	// Programmatically populate from the JSON file of commands imported elsewhere. Draw it into this <div>
	let div = document.getElementById('_tray-commands')
	let ul = document.createElement('ul')
	div.replaceChildren(ul)

	// First the command list at the top ...
	for ( let cmd of command.commands ) {
		let li = document.createElement('li')
		ul.appendChild( li )
		let a = document.createElement('a')
		li.appendChild( a )
		a['tabIndex'] = '-1'
		a['title'] = cmd['desc']
		a['href'] = "javascript:showHelpCommand('" + cmd['command'] + "');"
		a.innerHTML = cmd['command'].replaceAll('<','&lt;')
		li.insertAdjacentHTML( 'beforeend', '<div class="help-desc">' + cmd['short'] + '</div>\n' );
	}

	// Then each command gets a longer description
	for ( let cmd of command.commands ) {
		// and a separator
		let hr = document.createElement('hr')
		div.appendChild( hr )

		let p = document.createElement('p')
		p['id'] = cmd['command']
		p.innerHTML = '<strong>' + cmd['command'].replaceAll('<','&lt;') + '</strong>\n'
		if ( cmd['params'] !== undefined ) {
			p.insertAdjacentHTML( 'beforeend', ' <span class="params">' + cmd['params'] + '</span>')
		}
		div.appendChild( p )

		p = document.createElement('p')
		p.innerHTML = command['desc']
		div.appendChild( p )
		
		// Also is an array of related commands.
		if ( cmd['also'] !== undefined ) {
			p = document.createElement('p')
			p.classList.add( 'see-also' )
			p.innerHTML = 'See also ... '
			div.appendChild( p )

			let first = true
			for ( let also of cmd['also'] ) {
				if ( !first ) {
					p.insertAdjacentHTML( 'beforeend', ' | ' );
				}
				first = false

				a = document.createElement( 'a' )
				a['title'] = also
				a['href'] = "javascript:showHelpCommand('" + also + "');"
				a['tabIndex'] = '-1'
				a.innerHTML = also.replaceAll('<','&lt;')
				p.appendChild( a )
			}			
		}
	}
}

/**
 * Scrolls the viewport to show the passed in command in the help pane of the slide-in tray.
 */
function showHelpCommand(cmd) {
	let elem = document.getElementById(cmd)
	elem.scrollIntoView({ behavior: "smooth" })
}

/**
 * Shows an example based on the page source.
 */
function example() {
	document.getElementById('src').value = '<!DOCTYPE html>\n' + document.getElementById('html').outerHTML
	document.getElementById('rec').value = '// The Original Text pane on the left now shows the HTML source of this page, dynamically inserted.\n' +
		'\n' +
		'// This central pane holds the recipe. The commands in here are executed to provide the output.\n' +
		'\n' +
		'// <-- Two slashes like this is a comment. Lines beginning with these (like this one) are ignored.\n' +
		'\n' +
		'// Remove the comments from the recipe lines below, one-at-a-time to see stringhorse in action. The recipe will run after a short pause and the output will appear in the right hand pane ...\n' +
		'\n' +

		'//-<ws\n' +
		'//k= <li><a\n' +
		'//-<= help-desc\n' +
		'//-< 11\n' +
		'//->= <\n' +
		'//-> 1\n' +
		'//sort\n' +

		'\n// The end result is an alphabetical list of commands, extracted from the help page.'

	localStorage.src = document.getElementById('src').value
	localStorage.recipe = document.getElementById('rec').value
	localStorage.variables = document.getElementById('vars').value
	recipe.execute()
}

/**
 * Restores the UI to its previous state invoking localstorage. Called once on page load.
 */
function restoreState() {
	let srcText = document.getElementById('src')
	let recipeText = document.getElementById('rec')
	let varsText = document.getElementById('vars')

	// Restore the state of the stab checkbox before calling recipe() (which will overwrite it)
	document.getElementById('checkbox-stab').checked = localStorage.stabs === 'true'
	varsText.value = localStorage.variables !== undefined ? localStorage.variables : ''

	// Set the size of the variables panel. 'vars-hide' is the default.
	let size = localStorage['vars-size']
	if ( size !== undefined ) {
		document.getElementById( 'variables' ).classList.replace( 'vars-hide', size )
	}

	// Restore the original text and recipe from localStorage.
	if ( localStorage.src === undefined && localStorage.recipe === undefined ) {
		example()
	} else {
		srcText.value = localStorage.src !== undefined ? localStorage.src : ''
		recipeText.value = localStorage.recipe !== undefined ? localStorage.recipe : ''
		recipe.execute()
	}

	// Put listeners on the original and recipe textareas to do stuff on a time-delayed keypress.
	let recipeTimerId = 0;
	recipeText.addEventListener("keyup", function(event) {
	    clearTimeout(recipeTimerId);
	    recipeTimerId = setTimeout( recipe.execute, 750 );
	});

	let srcTimerId = 0;
	srcText.addEventListener("keyup", function(event) {
	    clearTimeout(srcTimerId);
	    srcTimerId = setTimeout( recipe.execute, 750 );
	});

	let varsTimerId = 0;
	varsText.addEventListener("keyup", function(event) {
	    clearTimeout(varsTimerId);
	    varsTimerId = setTimeout( recipe.execute, 750 );
	});

	// Re-establish wrap on the textareas
	if ( localStorage.hasOwnProperty( 'wrap-src' ) ) {
		wrap( 'src' )
	}
	if ( localStorage.hasOwnProperty( 'wrap-rec' ) ) {
		wrap( 'rec' )
	}
	if ( localStorage.hasOwnProperty( 'wrap-out' ) ) {
		wrap( 'out' )
	}

	// Are we doing dark mode?
	if ( localStorage.hasOwnProperty( 'dark' ) && localStorage['dark'] === 'true' ) {
		let html = document.getElementById('html')
		html.classList.add('dark')
	}

	// Add an escape listener for the slide-in tray.
	document.addEventListener( 'keydown', (event) => {
		if ( tray.classList.contains( 'closed' ) ) {
			return
		}
		if ( event.key === 'Escape' ) {
			help()
		}
	})
}

/**
 * Applies default tabindex values to elements in the DOM.
 */
function fixTabIndex() {
	let elems = document.querySelectorAll("header a, section#ui a, section#ui textarea");
	for ( let i = 0; i < elems.length; i++ ) {
		elems[i].tabIndex = 0;
	}	

	elems = document.querySelectorAll("section#tray a");
	for ( let i = 0; i < elems.length; i++ ) {
		elems[i].tabIndex = -1;
	}	
}

/**
 * Toggles dark mode
 */
function dark() {
	let html = document.getElementById('html')
	html.classList.toggle('dark')

	localStorage['dark'] = html.classList.contains('dark')
}

/**
 * Copies the output text into the clipboard.
 */
function copyToClipboard() {
	let output = document.getElementById('out')
	navigator.clipboard.writeText( output.value );
}

/**
 * Switch up the size of the variables pane. 
 */
function vars(size) {
	let div = document.getElementById('variables')
	div.setAttribute('class', size)
	localStorage['vars-size'] = size
}

/**
 * Inserts a <dt><dd> tuple for the _info command.
 */
function datum( dl, label, value ) {
	let dt = document.createElement('dt')
	dt.innerHTML = label
	dl.appendChild(dt)
	let dd = document.createElement('dd')
	dd.innerHTML = value
	dl.appendChild(dd)	
}