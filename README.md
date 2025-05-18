# stringhorse

## Philosophy

Stringhorse is a text manipulation tool that works programmatically but stops short of being a full blown scripting language or regexp handler. You get three text panes. Paste the source text into the left and write your command recipe into the middle. The output will appear in the right.

Commands mostly don't have cutesy or UNIX-y names like sed or grep. You can work out what some commands do from the characters in their name …

* A **plus** will _add_ something
* A **minus** will _take something away_
* An **equals** will _match_ something
* A **pipe** (the | symbol) will _split_ the text into pieces
* **j** commands _join_ things together
* **k** commands _keep_ something and remove the rest
* **s** commands _swap_ things
* A **<** means something will happen to the _left_ of the line or the match
* A **>** means something will happen to the _right_ of the line or the match

Characters are combined to achieve things …

* **k=** will _keep_ all the lines that _match_ the text following the command.
* **+>** will _add_ the text following the command to the _right_ of each line.

## Changelog

### version 2.0.3
* Dark mode appearance fixes to instances of bad contrast and bright elements.
* Some cosmetic and line-length tweaks to the help tray examples.

### version 2.0.2
* "Original Text" is now "Input".
* Overhaul of the command tray help texts which examples and typography improvements.
* Pane drag grippers are now defined and visible.

### version 2.0.1
* Fixed a bug in the example.

### version 2.0.0
* Major restructuring of the keep and remove commands to make them logical and powerful.
* New join command variants: j, jn, j+, jn+
* Variables can be used in string parameters to commands, e.g. +> $foo$bar $pip

### version 1.3.4
* There are now helpful placeholders in each pane when they are empty.
* There is now help for variables in the Help drawer.
* The Philosophy and About tabs in the Help drawer have been merged.
* The example has been changed to something simpler and more robust.

### version 1.3.3
 * The major editor panes can now be resized by dragging their separators.
 * Wide function has been removed.
 * Clear has been removed from each text pane and a new global clear function added to the toolbar.
 * The ability to hide the variables pane has been removed.
 * Copy to clipboard has been removed
 * Fixed info and wwwify commands

### version 1.3.2
 * Base64 encoding and decoding with the new 'b64' and 'unb64' commands.
 * Hyperlinks in the help tray on the short command descriptions.

### version 1.3.1
 * New command '_' collapses runs of characters together.
 * Minor cosmetic improvements.

### version 1.3
 * New command -dupes will remove any duplicate lines in the original text.
 * Javascript refactored into something more modern (ongoing).

### version 1.2.1
 * The -=> command has become ->= which is consistent with the existant -<= command. 
 * The stab, stabs, sspace, and sspaces commands are all achievable with variables and so have been removed.
 * Some programming, non-feature, non-bug improvements.

### version 1.2
 * You can now set variables in the UI and use them in some commands.
   * Variables textpane sits underneath the recipe. You set a variable by typing _[name] = [value]_.
   * $str and $tab are system variables for space and tab.
   * the _|space_ and _|tab_ commands have been removed. You can use variables to better achieve the same outcomes.

### version 1.1
* Stringhorse now has a dark mode. Toggle it from the button in the toolbar.
* Pressing Esc will now close the slide-in tray.
* "Copy to clipboard" feature added for the output text.

### version 1.0.2
* Implemented a better 'scroll to visible' in the command list which doesn't obscure the target and break refresh.
* Clicking away from the slide-in tray will now close it.
* :focus styles no longer applied in CSS so the browser can do its thing and they're not the same as the :hover styles which was confusing.

### version 1.0.1
* Reorganised the CSS into three better-structured files.
* Fixed some accessibility issues.