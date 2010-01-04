#!/usr/bin/env narwhal
 
var FILE = require("file"),
    ENV = require("system").env,
    OS = require("os"),
    JAKE = require("jake");

var buildDir = './build',
    bundleSrcDir = FILE.join(buildDir, 'bundleSrc'),
    lessonsDir = FILE.join(buildDir, 'bundleSrc');

var includedLessons = [];


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

JAKE.task('build stable',  function()
{
	if (!FILE.exists(buildDir)){
	    FILE.mkdir(buildDir);
	}
	      
	print('foo');      
});


JAKE.task('build',  function()
{
	if (!FILE.exists(buildDir)){
	    FILE.mkdir(buildDir);
	}
	      
	print('foobar');      
});


//clobber

//checkout bundle

//checkout lessons


//delete backup files and commit their removal

