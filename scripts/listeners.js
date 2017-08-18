---
permalink: /scripts/listeners.js
---
//
// Programmer:     Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date:  Sun Apr 17 17:21:46 PDT 2016
// Last Modified:  Thu Aug 18 21:03:35 CEST 2016
// Filename:       listeners.js
// Web Address:    http://flashcards.sapp.org/listeners.js
// Syntax:         JavaScript 1.8/ECMAScript 5
// vim:            ts=3: ft=javascript
//
// Description:   Event listeners and related code for index.html.
//

//////////////////////////////
//
// DomContentLoaded event listener -- Display the sample data.
//

document.addEventListener("DOMContentLoaded", function() {
	EditorMode = "humdrum";
	setEditorModeAndKeyboard();


	CGI = GetCgiParameters();
	downloadVerovioToolkit(true); //CGI.worker !== undefined);

	if (CGI.k) {

		if (CGI.k.match(/e/)) {
			var input = document.querySelector("#input");
			if (input) {
				input.innerHTML = "";
			}
		}

	}

	setupAceEditor("input");
	allowTabs();
	setupDropArea();
   prepareHelpMenu('#help-container');

	if (CGI.k) {
		if (CGI.k.match(/y/)) {
			toggleInputArea(true);
		}
		if (CGI.k.match(/b/)) {
			toggleVhvTitle();
		}
		var wcount = 0;
		for (var i=0; i<CGI.k.length; i++) {
			if (CGI.k.charAt(i) === "w") {
				SPACINGADJUSTMENT += 0.05;
			} else if (CGI.k.charAt(i) === "W") {
				SPACINGADJUSTMENT -= 0.05;
			}
		}

		if (CGI.k.match(/m/)) {
			// start in MEI mode
			EditorMode = "xml";
			setEditorModeAndKeyboard();
			if (!CGI.k.match(/e/)) {
				displayMeiNoType();
			}
		} 

	}

	if (CGI.file || CGI.tasso || CGI.jrp) {
		loadKernScoresFile(
			{
				file: CGI.file,
				tasso: CGI.tasso,
				jrp: CGI.jrp,
				measures: CGI.mm,
				next: true,
				previous: true
			}
		);
	} else {
		displayNotation();
	}

	setupSplitter();

	// set init (default) state
	$("#input").data('x', $("#input").outerWidth());
	$("#input").data('y', $("#input").outerHeight());

{% if site.local != "yes" %}
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-82554203-1', 'auto');
  ga('send', 'pageview');
{% endif %}

	var body = document.querySelector("body");
	body.addEventListener("click", function(event) {
		// console.log("SINGLE CLICK", event);
		dataIntoView(event);
	});
	body.addEventListener("dblclick", function(event) {
		console.log("DOUBLE CLICK");
	});

	window.addEventListener("keydown", processNotationKeyCommand, true);
	window.addEventListener("keydown", processInterfaceKeyCommand);

});


//////////////////////////////
//
// keydown event listener -- Notation edition listener.
//


function processNotationKeyCommand(event) {
	if (!event.preventDefault) {
		event.preventDefault = function() { };
	}

	// only works outside of the editor.
	if (event.altKey || event.target.nodeName == "TEXTAREA") {
		return;
	}
	if (document.activeElement.nodeName == "INPUT") {
		// needed to suppress key commands when running vim command
		return;
	}

	if (!CursorNote) {
		return;
	}
	if (!CursorNote.id) {
		return;
	}

	switch (event.keyCode) {
		case AKey:
			processNotationKey("a", CursorNote);
			break;

		case BKey:
			processNotationKey("b", CursorNote);
			break;

		case CKey:
			processNotationKey("c", CursorNote);
			break;

		case DKey:
			if (event.shiftKey) {
				processNotationKey("D", CursorNote);
			}
			break;

		case FKey:
			processNotationKey("f", CursorNote);
			break;

		case IKey:
			processNotationKey("i", CursorNote);
			break;

		case MKey:
			if (event.shiftKey) {
				processNotationKey("M", CursorNote);
			} else {
				processNotationKey("m", CursorNote);
			}
			break;

		case PKey:
			if (event.shiftKey) {
				processNotationKey("P", CursorNote);
			} else {
				processNotationKey("p", CursorNote);
			}
			break;

		case QKey:
			processNotationKey("q", CursorNote);
			break;

		case SKey:
			processNotationKey("s", CursorNote);
			break;

		case TKey:
			if (event.shiftKey) {
				processNotationKey("T", CursorNote);
			} else {
				processNotationKey("t", CursorNote);
			}
			break;

		case VKey:
			if (CursorNote.id.match("note-")) {
				processNotationKey("^", CursorNote);
			}
			break;

		case WKey:
			if (event.shiftKey) {
				processNotationKey("W", CursorNote);
			} else {
				processNotationKey("w", CursorNote);
			}
			break;

		case XKey:
			processNotationKey("X", CursorNote);
			break;

		case YKey:
			processNotationKey("y", CursorNote);
			break;

		case OneKey:
			processNotationKey("1", CursorNote);
			break;

		case TwoKey:
			if (event.shiftKey) {
				processNotationKey("@", CursorNote);
			} else {
				processNotationKey("2", CursorNote);
			}
			break;

		case ThreeKey:
			if (event.shiftKey) {
				processNotationKey("#", CursorNote);
			} else {
				processNotationKey("3", CursorNote);
			}
			break;

		case FourKey:
			processNotationKey("4", CursorNote);
			break;

		case FiveKey:
			processNotationKey("5", CursorNote);
			break;

		case SixKey:
			if (CursorNote.id.match("note-")) {
				if (event.shiftKey) {
					processNotationKey("^^", CursorNote);
				} else {
					processNotationKey("6", CursorNote);
				}
			} else {
				processNotationKey("6", CursorNote);
			}
			break;

		case SevenKey:
			processNotationKey("7", CursorNote);
			break;

		case EightKey:
			processNotationKey("8", CursorNote);
			break;

		case NineKey:
			processNotationKey("9", CursorNote);
			break;

		case MinusKey:
			processNotationKey("-", CursorNote);
			break;

		case NKey:
			processNotationKey("n", CursorNote);
			break;

		case SingleQuoteKey:
			processNotationKey("'", CursorNote);
			break;

		case SemiColonKey:
			if (event.shiftKey) {
				processNotationKey(":", CursorNote);
			} else {
				processNotationKey(";", CursorNote);
			}
			break;

		case BackQuoteKey:
			if (event.shiftKey) {
				processNotationKey("~", CursorNote);
			} else {
				processNotationKey("`", CursorNote);
			}
			break;

		case UpKey:
			if (event.shiftKey) {
				event.preventDefault();
				event.stopPropagation();
				if (CursorNote.id.match("note-")) {
					processNotationKey("transpose-up-octave", CursorNote);
				}
			} else {
				event.preventDefault();
				event.stopPropagation();
				if (CursorNote.id.match("note-")) {
					processNotationKey("transpose-up-step", CursorNote);
				}
			}
			break;

		case DownKey:
			if (event.shiftKey) {
				event.preventDefault();
				event.stopPropagation();
				if (CursorNote.id.match("note-")) {
					processNotationKey("transpose-down-octave", CursorNote);
				}
			} else {
				event.preventDefault();
				event.stopPropagation();
				if (CursorNote.id.match("note-")) {
					processNotationKey("transpose-down-step", CursorNote);
				}
			}
			break;

		case LeftKey:
			if (CursorNote.id.match("slur-")) {
				event.preventDefault();
				event.stopPropagation();
				if (event.shiftKey) {
					processNotationKey("rightEndMoveBack", CursorNote);
				} else {
					processNotationKey("leftEndMoveBack", CursorNote);
				}
			}
			break;

		case RightKey:
			if (CursorNote.id.match("slur-")) {
				event.preventDefault();
				event.stopPropagation();
				if (event.shiftKey) {
					processNotationKey("rightEndMoveForward", CursorNote);
				} else {
					processNotationKey("leftEndMoveForward", CursorNote);
				}
			}
			break;

		case EscKey:
			event.preventDefault();
			event.stopPropagation();
			processNotationKey("esc", CursorNote);
			break;

	}
}


//////////////////////////////
//
// keydown event listener -- Interface control listener.
//


function processInterfaceKeyCommand(event) {

	if (!event.preventDefault) {
		event.preventDefault = function() { };
	}

	if ((!event.altKey) && (event.target.nodeName == "TEXTAREA")) {
		// needed to prevent key commands when editing text
		return;
	}
	if ((!event.altKey) && (document.activeElement.nodeName == "INPUT")) {
		// needed to prevent key commands when running vim command
		return;
	}

	if (event.metaKey) {
		return;
	}

	switch (event.keyCode) {

		case BKey:          // toggle display of banner
			if (event.altKey) {
				toggleVhvTitle();
				event.preventDefault();
			}
			break;

		case CKey:          // compile filtered contents & display in text editor
			if (event.altKey) {
				showCompiledFilterData();
				event.preventDefault();
			}
			break;

		case EKey:          // erase text editor contents
			if (event.altKey) {
				clearContent();
				event.preventDefault();
			}
			break;

		case FKey:          // toogle notation update freezing
			if (event.altKey) {
				if (event.shiftKey) {
					displayNotation(false, true);
				} else {
					toggleFreeze();
				};
				event.preventDefault();
			}
			break;

		case YKey:          // show/hide text editor
			if (event.altKey) {
				if (!ShowingIndex) {
					toggleInputArea();
				}
				event.preventDefault();
			}
			break;

		case GKey:          // show SVG text in separate window
			if (event.altKey) {
				displaySvg();
				event.preventDefault();
			}
			break;

		case HKey:          // show Humdrum data in text editor
			if (event.altKey) {
				if (!ShowingIndex) {
					showBufferedHumdrumData();
				}
				event.preventDefault();
			}
			break;

		case LKey:          // toggle color of staff layers
			if (event.altKey) {
				toggleLayerColoring();
				event.preventDefault();
			}
			break;

	 	case MKey:          // show MEI data in text editor
			if (event.altKey) {
				EditorMode = "xml";
				if (event.shiftKey) {
					// display with @type data
					displayMei();
				} else {
					// display without @type data
					displayMeiNoType();
				}
				event.preventDefault();
			}
			break;

		case OKey:          // toggle display of *oclef data
			if (event.altKey) {
				OriginalClef = !OriginalClef;
				console.log("Original clef changed to:", OriginalClef);
				if (!ShowingIndex) {
					displayNotation();
				}
				event.preventDefault();
			}
			break;

		case PKey:          // show PDF in separate window
			if (event.altKey) {
				displayPdf();
				event.preventDefault();
			}
			break;

		case RKey:          // reload Humdrum data from server
			if (event.altKey) {
				reloadData();
				event.preventDefault();
			}
			break;

		case SKey:          // save contents of text editor to file
			if (event.altKey) {
				saveEditorContents();
				event.preventDefault();
			}
			break;

		case VKey:          // toggle vi mode in text editor
			if (event.altKey) {
				toggleEditorMode();
				event.preventDefault();
			}
			break;

	 	case WKey:          // adjust notation width parameter
			if (event.altKey) {
				if (event.shiftKey) {
					SPACINGADJUSTMENT -= 0.05;
				} else {
					SPACINGADJUSTMENT += 0.05;
				}
				if (SPACINGADJUSTMENT <= 0.0) {
					SPACINGADJUSTMENT = 0.0;
				}
				event.preventDefault();
				displayNotation();
			}
			break;

		case SpaceKey:          // start/pause MIDI playback
			if (!PLAY) {
				playCurrentMidi();
				PLAY = true;
				PAUSE = false;
			} else if (PAUSE) {
				playCurrentMidi();
				PAUSE = !PAUSE;
			} else {
				pause();
				PAUSE = !PAUSE;
			}
			event.preventDefault();
			break;

		case CommaKey:          // toggle TSV/CSV display of Humdrum data
		                        // decrease tab size in editor
			if (event.shiftKey) {
				decreaseTab();
				event.preventDefault();
			} else {
				toggleHumdrumCsvTsv();
				event.preventDefault();
			}
			break;

		case DotKey:          // increase tab size in editor
			if (event.shiftKey) {
				increaseTab();
				event.preventDefault();
			}
			break;

		case UpKey:          // return to repertory index
			if (event.shiftKey) {
				if (FILEINFO["has-index"] == "true") {
					displayIndex(FILEINFO["location"]);
				}
			}
			event.preventDefault();
			break;

		case PgUpKey:          // shift: go to previous repertory work/movement
		case LeftKey:          // go to previous page
			if (event.shiftKey) {
				displayWork(FILEINFO["previous-work"]);
			} else {
				gotoPreviousPage();
				console.log("PAGE", vrv.page);
			}
			event.preventDefault();
			break;

		case PgDnKey:          // shift: go to next repertory work/movement
		case RightKey:         // go to next page
			if (event.shiftKey) {
				displayWork(FILEINFO["next-work"]);
			} else {
				gotoNextPage();
				console.log("PAGE", vrv.page);
			}
			event.preventDefault();
			break;

		case HomeKey:          // go to the first page
			gotoFirstPage();
			event.preventDefault();
			break;

		case EndKey:          // go to the last page
			gotoLastPage();
			event.preventDefault();
			break;

		case SlashKey:          // toggle help menu
			if (event.shiftKey) {
				toggleHelpMenu();
				event.preventDefault();
			}

	}
}


