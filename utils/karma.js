// This grabs translatable strings from an html doc

//print ("system.args[2] " + system.args + "\n");
var srchtml = "";
var srcjs = "";
var targetpo = "";
var myTags = 'h1, h2, h3, h4, button, label, title';
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
      var getTagHTML = function () {
	print(myTags);
	print($(myTags));
	$(myTags).each(function(){
	    print($(this).html());
	    poArray.push("msgid \"" + $(this).html() + "\"\n");
	    poArray.push('msgstr \"\"\n\n');
	});
      };
	
      var printAttr = function(selector, elemAttr) {
	$(selector).each(function(){
	    //poArray.push("msgctxt \"HTML Tag: " + $(this)[0].tagName + 
	    //	     " ID: " + $(this).attr('id') + "\"");
	    poArray.push("msgid \"" + $(this).attr(elemAttr) + "\"\n");
	    poArray.push('msgstr ""\n\n');
	  });
	  
      };

      getTagHTML();
      printAttr('meta', 'content');
      printAttr('img[alt]', 'alt');
      print(poArray);

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
	//os.popen("rm temp.txt");
	poArray.push(jsstrings + "\n");
    };



    checkargs();
    //set up the environment
    load('./lib/env.rhino.js');
    window.location = (srchtml);
    load('./i18n/jquery.js');


    //Write preamble to po file
    //This should be the first string you push
    poArray.push("# SOME DESCRIPTIVE TITLE.\n" +
		 "# Copyright (C) YEAR THE PACKAGE'S COPYRIGHT HOLDER\n" +
		 "# This file is distributed under the same license" + 
		 "as the PACKAGE package.\n" +
		 "# FIRST AUTHOR <EMAIL@ADDRESS>, YEAR.\n" +
		 "msgid \"\"\n" +
		 "msgstr \"\"\n" +
		 "\"Project-Id-Version: PACKAGE VERSION\\n\"\n" +
		 "\"Report-Msgid-Bugs-To: bryan@olenepal.org \\n\"\n" +
		 "\"POT-Creation-Date: Today\\n\"\n" +
		 "\"PO-Revision-Date: 2009-07-15 HO:MI+ZONE\\n\"\n" +
		 "\"Last-Translator: bryan berry <bryan@olenepal.org>\\n\"\n" +
		 "\"Language-Team: LANGUAGE <LL@li.org>\\n\"\n" +
		 "\"MIME-Version: 1.0\\n\"\n" +
		 "\"Content-Type: text/plain; charset=UTF-8\\n\"\n" +
		 "\"Content-Transfer-Encoding: 8bit\\n\"\n\n");

    getHTMLStrings();
    getJSStrings();
    file = require('file');
    file.write(targetpo, poArray.join("")); 
  