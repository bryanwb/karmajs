/*
*	document.js
*
*	DOM Level 2 /DOM level 3 (partial)
*	
*	This file adds the document object to the window and allows you
*	you to set the window.document using an html string or dom object.
*
*/

// read only reference to the Document object

$debug("Initializing window.document.");
var $async = false;
__extend__(HTMLDocument.prototype, {
	get async(){ return $async;},
	set async(async){ $async = async; },
	get baseURI(){ return $env.location('./'); },
	get URL(){ return $w.location.href;  }
});
	


var $document =  new HTMLDocument($implementation);
$w.__defineGetter__("document", function(){
	return $document;
});
