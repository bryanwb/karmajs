#!/usr/bin/env narwhal
 
var FILE = require("file"),
    ENV = require("system").env,
    OS = require("os"),
    JAKE = require("jake");

var buildDir = './build',
    bundleDir = FILE.join(buildDir, 'bundle'),
    lessonsDir = FILE.join(buildDir, 'lessons'),
    htmlDir = bundleDir;
		     

var LESSONS = [ ['~/tmp/karma_lesson1', 'karma_lesson1'],
		['~/tmp/karma_lesson2', 'karma_lesson2'],
		['~/tmp/karma_lesson3', 'karma_lesson3'],
	     // [" git://git.sugarlabs.org/karma_adding_up_to_10_svg/mainline.git", 
             // "karma_adding_up_to_10_svg"], 
	     // ["gitorious@git.sugarlabs.org:karma_conozco-uruguay/mainline.git", 
	     //  'karma_Conozco-Uruguay'],
	     // ["~/karma/lessons/English_Alphabet_Puzzle_Solving", 
	     //  'karma_English_Alphabet_Puzzle_Solving'] 
	    ];
var includedLessons = [];
var bundleType = '';

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

JAKE.task('checkout', function(){
    OS.system('git checkout master;');
});


JAKE.filedir('lessons-dir', function(){
	FILE.mkdirs(lessonsDir);
}); 


JAKE.filedir('bundle-dir', function(){
    FILE.mkdirs(FILE.join(bundleDir, 'lessons'));
}); 

var prepareEachLessonDir = function(repo, tag){
    var exitCode = '';
    var lessonRepo = repo[0];
    var lessonName = repo[1];
    var cmd = '';
    var lessonDir = FILE.join(lessonsDir, lessonName);

    if(!FILE.exists(FILE.join(lessonDir, '.git'))){
	if(FILE.exists(lessonDir)){
	    FILE.rmdir(lessonDir);
	    FILE.mkdir(lessonDir);
	}

	cmd = "git clone " + lessonRepo + " " + lessonDir;
	OS.system(cmd);
    }

    print(tag);
    cmd = "cd " + lessonDir + ";git pull -t origin master; git checkout " + tag ;
    exitCode = OS.system(cmd);
    
    if(exitCode === 0){
	includedLessons.push(lessonName);
    }
};

var copyLessons = function(){
    includedLessons.forEach(function(lessonName){
	    var lessonDir = FILE.join(bundleDir, 'lessons');
	    var cmdCopyLessons = "cp -r " + lessonsDir + "/" + 
				    lessonName + " " + lessonDir;
	    var cmdRmGitFiles = "find " + bundleDir + " -d -name '.git' " +
		"-exec rm -rf {} \\; ";
	    OS.system(cmdCopyLessons);
	    OS.system(cmdRmGitFiles);
	    
	});
};


JAKE.task('build-stable', ['checkout', 'lessons-dir', 'bundle-dir'], function()
{
    LESSONS.forEach(function(lessonRepo) { 
			prepareEachLessonDir(lessonRepo, "stable"); 
		    });
    copyLessons();
});

JAKE.task('build', ['build-latest']);

JAKE.task('build-latest',['checkout', 'lessons-dir'],  function()
{
    LESSONS.forEach(function(lessonRepo) { 
			prepareEachLessonDir(lessonRepo, "master"); 
		    });
    copyLessons();

});

JAKE.task('clean-bundle', function(){
	if(FILE.exists(bundleDir)){
	    FILE.rmtree(bundleDir);
	}
	      
	FILE.mkdir(bundleDir);
});

var copyWebFiles = function(){
     var webSrcFiles = [ './assets', './css', 'index*', './js'];      
   
    webSrcFiles.forEach(function(){
	    var cmd = 'cp -rf ' + filename + ' ' + htmlDir;
	    OS.system(cmd);    
    });
};


JAKE.task('xo-bundle', ['checkout', 'clean-bundle'], function(){
    var bundleSrc = './tools/xo_bundle/';

    bundleType = "xo";
    OS.system('cp -r ' + bundleSrc + "/* " + bundleDir );
    FILE.mkdir(FILE.join(bundleDir, 'karma'));
    htmlDir = FILE.join(htmlDir, 'karma');
    copyWebFiles(htmlDir);
    FILE.move(FILE.join(bundleDir, 'lessons'), FILE.join(htmlDir, 'lessons'));

});

JAKE.task('web-bundle', ['checkout', 'clean-bundle'], function(){
    bundleType = 'web';
    copyWebFiles(htmlDir);
});





//clobber

//checkout bundle

//checkout lessons


//delete backup files and commit their removal

