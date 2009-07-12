// This grabs translatable strings from an html doc

var srchtml = system.args[1];
var targetpo = system.args[2];
var myTags = 'h1, h2, h3, h4, title, button, label';
var poArray = [];

//set up the environment
load('./lib/env.rhino.js');
window.location = (srchtml);
load('./i18n/jquery.js');


//Write preamble to po file
//This should be the first string you push
poArray.push("Project-Id-Version: PACKAGE VERSION\n" +
"Report-Msgid-Bugs-To: bryan@olenepal.org \n" +
"POT-Creation-Date: \n" +
"PO-Revision-Date: YEAR-MO-DA HO:MI+ZONE\n" +
"Last-Translator: FULL NAME <EMAIL@ADDRESS>\n" +
"Language-Team: LANGUAGE <LL@li.org>\n" +
"MIME-Version: 1.0\n" +
"Content-Type: text/plain; charset=CHARSET\n" +
"Content-Transfer-Encoding: 8bit\n\n");


$(myTags).each(function(){
    poArray.push("msgctxt \"HTML Tag: " + $(this)[0].tagName + " ID: " + $(this).attr('id') + "\"\n");
    poArray.push("msgid \"" + $(this).html() + "\"\n\n");

});


var printAttr = function(selector, elemAttr) {
    $(selector).each(function(){
	poArray.push("msgctxt \"HTML Tag: " + $(this)[0].tagName + " ID: " + $(this).attr('id') + "\"");
	poArray.push("msgid \"" + $(this).attr(elemAttr) + "\"\n");

    });
    return this;
};

printAttr('meta', 'content');
printAttr('img[alt]', 'alt');


file = require('file');
file.write(targetpo, poArray.join("")); 

