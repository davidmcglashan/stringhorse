/**
 * Focuses the passed-in element (makes it big on the UI).
 */
function focus(element) {
	var ui = document.getElementById('ui')

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
	var tout = document.getElementById('out')
	var toriginal = document.getElementById('src')
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
	recipe()
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
 * Slides in the tray with the help tab showing.
 */
function help() {
	document.getElementById('lightbox').classList.toggle('show')
	
	var tray = document.getElementById('tray')
	if ( tray.classList.length === 0 ) {
		tray.classList.add('open')
	} else {
		tray.classList.toggle('closed')
		tray.classList.toggle('open')
	}
}

function tab(tdiv,tab) {
	// Grab all the lis and make the passed in tab the selected one.
	var ul = document.getElementById( tdiv+'-ul' )
	var lis = ul.children;
	for ( var i = 0; i < lis.length; i++ ) {
		var li = lis[i];
		li.classList.remove('selected')
	}
	document.getElementById( 'tab-'+tab ).classList.add('selected')
	
	// Now make the tab page itself visible
	var container = document.getElementById( tdiv )
	var divs = container.children;
	for ( var i = 0; i < divs.length; i++ ) {
		var div = divs[i];
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
	var div = document.getElementById('_tray-commands')
	var ul = document.createElement('ul')
	div.replaceChildren(ul)

	// First the command list at the top ...
	for ( let command of commands ) {
		var li = document.createElement('li')
		ul.appendChild( li )
		var a = document.createElement('a')
		li.appendChild( a )
		a['title'] = command['desc']
		a['href'] = '#' + command['command']
		a.innerHTML = command['command']
		li.insertAdjacentHTML( 'beforeend', '<div class="help-desc">' + command['short'] + '</div>\n' );
	}

	// Then each command gets a longer description
	for ( let command of commands ) {
		// and a separator
		var hr = document.createElement('hr')
		div.appendChild( hr )

		var a = document.createElement('a')
		a['id'] = command['command']
		div.appendChild( a )

		var p = document.createElement('p')
		p.innerHTML = '<strong>' + command['command'] + '</strong>\n'
		if ( command['params'] !== undefined ) {
			p.insertAdjacentHTML( 'beforeend', ' <span class="params">' + command['params'] + '</span>')
		}
		a.appendChild( p )

		p = document.createElement('p')
		p.innerHTML = command['desc']
		div.appendChild( p )
		
		// Also is an array of related commands.
		if ( command['also'] !== undefined ) {
			p = document.createElement('p')
			p.classList.add( 'see-also' )
			p.innerHTML = 'See also ... '
			div.appendChild( p )

			var first = true
			for ( let also of command['also'] ) {
				if ( !first ) {
					p.insertAdjacentHTML( 'beforeend', ' | ' );
				}
				first = false

				a = document.createElement( 'a' )
				a['title'] = also
				a['href'] = '#' + also
				a.innerHTML = also
				p.appendChild( a )
			}			
		}
	}
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
		'//-<= #\n' +
		'//-< 1\n' +
		'//-=> "\n' +
		'//-> 1\n' +
		'//sort\n' +
		'\n// The end result is an alphabetical list of commands, extracted from the help page.'

	localStorage.src = document.getElementById('src').value
	localStorage.recipe = document.getElementById('rec').value
	recipe()
}

/**
 * Restores the UI to its previous state invoking localstorage. Called once on page load.
 */
function restoreState() {
	var srcText = document.getElementById('src')
	var recipeText = document.getElementById('rec')

	// Restore the original text and recipe from localStorage
	if ( localStorage.src === undefined && localStorage.recipe === undefined ) {
		example()
	} else {
		srcText.value = localStorage.src !== undefined ? localStorage.src : ''
		recipeText.value = localStorage.recipe !== undefined ? localStorage.recipe : ''
		recipe()
	}

	// Put listeners on the original and recipe textareas to do stuff on a time-delayed keypress
	var recipeTimerId = 0;
	recipeText.addEventListener("keyup", function(event) {
	    clearTimeout(recipeTimerId);
	    recipeTimerId = setTimeout( recipe, 750 );
	});

	var srcTimerId = 0;
	srcText.addEventListener("keyup", function(event) {
	    clearTimeout(srcTimerId);
	    srcTimerId = setTimeout( recipe, 750 );
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
}