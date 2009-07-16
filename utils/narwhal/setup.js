// This grabs translatable strings from an html doc

//print ("system.args[2] " + system.args + "\n");
var srchtml = "";
var srcjs = "";
var targetpo = "";
var myTags = 'h1, h2, h3, h4, title, button, label';
var poArray = [];
var os = require("os"); 
var file = require("file");



var checkargs = function () {
    // check if args are of proper values and assign them
    for (var i = 0; i < system.args.length; i++){

	var matches = system.args[i].match(/\.[a-zA-Z]*$/i);
	var filetype = matches[matches.length -1];

	switch (filetype){
	case ".html":
	    srchtml = system.args[i];
	    break;
	case ".js":
            srcjs = system.args[i];        
	    break;
	case ".po":
	    targetpo = system.args[i];
	    break;
	case ".pot":
	    targetpo = system.args[i];
	    break;

	}
    }

    print("srchtml is " + srchtml + " and srcjs is " + srcjs +
	  " and targetpo is " + targetpo);
    
    if ( srchtml === "" || srcjs === "" || targetpo === "" ) {
	print ("please specify at least 1 html file, " +
	       "1 js file, and a targetPO file");
    }


};    

    var sanitycheck = function () {
	// check if xgettext exists
	var cmd = "type xgettext";
	var cmdresult = os.popen(cmd);
	

    };

    var getHTMLStrings = function () {
	$(myTags).each(function(){
	    // Right now msgcxt doesn't work right
	    //poArray.push("msgctxt \"HTML Tag: " + $(this)[0].tagName + " ID: " + $(this).attr('id') + "\"\n");
	    poArray.push("msgid \"" + $(this).html() + "\"\n");
	    poArray.push('msgstr ""\n\n');
	});


	var printAttr = function(selector, elemAttr) {
	    $(selector).each(function(){
		//poArray.push("msgctxt \"HTML Tag: " + $(this)[0].tagName + 
		//	     " ID: " + $(this).attr('id') + "\"");
		poArray.push("msgid \"" + $(this).attr(elemAttr) + "\"\n");
		poArray.push('msgstr ""\n\n');
	    });
	    return this;
	};

	printAttr('meta', 'content');
	printAttr('img[alt]', 'alt');
    };

    var getJSStrings = function () {
	var cmd = "";
	var jsstrings = "";
	cmd = "xgettext -L python " + srcjs +
	    " --omit-header -o temp.txt";
	var cmdresult = os.popen(cmd);
	f = file.open("temp.txt", "r");
	jsstrings = f.read();
	f.close();
	os.popen("rm temp.txt");
	poArray.push(jsstrings + "\n");
    };



    checkargs();
    //set up the environment
    load('./lib/env.rhino.js');
    window.location = (srchtml);
    load('./i18n/jquery.js');


    //Write preamble to po file
    //This should be the first string you push
    poArray.push("Project-Id-Version: PACKAGE VERSION\n" +
		 "Report-Msgid-Bugs-To: bryan@olenepal.org \n" +
		 "POT-Creation-Date: Today\n" +
		 "PO-Revision-Date: 2009-07-15 HO:MI+ZONE\n" +
		 "Last-Translator: bryan berry <bryan@olenepal.org>\n" +
		 "Language-Team: LANGUAGE <LL@li.org>\n" +
		 "MIME-Version: 1.0\n" +
		 "Content-Type: text/plain; charset=UTF-8\n" +
		 "Content-Transfer-Encoding: 8bit\n\n");

    getHTMLStrings();
    getJSStrings();
    file = require('file');
    file.write(targetpo, poArray.join("")); 
  