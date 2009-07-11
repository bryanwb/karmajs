// This file prepares rhino to do something useful

// Prep rhino
load('dist/env.rhino.js');
window.location='index.html';
load('dist/jquery.js');

// grab all the useful strings from a .html file
var myTags = "h1, h2, h3, title, label, button";

$(myTags).each(function(){ 
    print("msgctxt \"HTML Tag: " + $(this)[0].tagName + " ID: "  + $(this).attr('id') + "\"");
    print("msgid \"" + $(this).html() + "\"\n");
}); 

    var printAttr = function(selector, elemAttr) {
	$(selector).each(function(){
	    print("msgctxt \"HTML Tag: " + $(this)[0].tagName + " ID: "  + $(this).attr('id') + "\"");
	    print("msgid \"" + $(this).attr(elemAttr) + "\"\n");

	});
	return this;
    };

    printAttr('meta', 'content');
    printAttr('img[alt]', 'alt');

/*    $(myTags).each(function(){ 
	print
	print($(this).html())});

*/