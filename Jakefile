#!/usr/bin/env narwhal
 
var FILE = require("file"),
    ENV = require("system").env,
    OS = require("os"),
    JAKE = require("jake");

var CLEAN = require('jake/clean').CLEAN; 
CLEAN.include('**/#*#', '**/\.tmp');
CLEAN.exclude('\.git');

//docs, documentation
JAKE.task('docs', function(){
	var path = './tools/jsdoc-toolkit';
	 if(FILE.exists(path)){
	     var cmd = 'java -jar ' + path + '/jsrun.jar ' + 
		 path + '/app/run.js ' + './js/karma.js -d=docs/ ' +
		 '-t=tools/jsdoc-toolkit/templates/jsdoc/';
	     OS.system(cmd);
	 } else {
	     print("The folder ./tools/jsdoc-toolkit isn't present " +
		   "you need it to generate documentation");
	 }

});


/*
JAKE.task("cleanfoo", function()
{
    cleanList.toString();
    cleanList.forEach(function(aFilename)
    {
        try
        {   print(aFilename);
            FILE.rmtree(aFilename);
        }
        catch(anException)
        {
        }
    });
});
*/

/*var CLEAN = require('jake/clean').CLEAN; 
var CLEANFOO = new JAKE.FileList("*.bak");

//clean
JAKE.task("cleanfoo", function()
{   
    print('foo');
    print(CLEANFOO._items);
    CLEANFOO.forEach(function(aFilename)
    {  print('foo');
        try
        {   print(aFilename);
            FILE.rmtree(aFilename);
        }
        catch(anException)
        {
	    print(anException);
        }
    });
});
*/
//clobber

//checkout bundle

//checkout lessons


//delete backup files and commit their removal

