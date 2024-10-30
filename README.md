# stringhorse

## Philosophy

Stringhorse is a text manipulation tool that works programmatically but stops short of being a full blown scripting language or regexp handler.

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

**k=** will _keep_ all the lines that _match_ the text following the command.
**+>** will _add_ the text following the command to the _right_ of each line.

You get three text panes. Paste the source text into the left and write your command recipe into the middle. The output will appear in the right.

## Changelog

### version 1.0.1
* Reorganised the CSS into three better-structured files.
* Fixed some accessibility issues