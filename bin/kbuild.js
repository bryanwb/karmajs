
//requires narwhal
var file = require('file');
var os = require('os');
var args = require('args');

//list of repos
var REPOS = [ ["folder_name", "git_url"],
	       ["folder_name", "git_url"]
	];

var XO_BUNDLE_REPO = "~/tmp/bundle";


var GIT_DIR = "~/tmp/gitDir";
var BUILD_DIR = "~/tmp/build";
var STABLE_TARGET = "~/tmp/stableTarget";
var UNSTABLE_TARGET = "~/tmp/unstableTarget";

var tag = "master";
//folders used by each lesson as it is processed
var lessonGitDir = "";
var lessonBuildDir = "";

var addExitCodeCheck = function (cmd) {
    return cmd.concat('; echo $?');
};

var isSuccessful = function(str){
    var newArray = str.split('\n');
    return newArray[newArray.length -2] === "0" ?
	true : false;
};

//parse args
var parser = new args.Parser();

parser.help(
    'Builds and distributes Karma bundle to different type of targets'
);

parser.option('-t', '--tag', 'tag')
    .help("which tag to checkout for all lessons")
    .set();

parser.helpful();

print(tag);



//check that the gitdir exists
//if not create it

//check that build dir exists, if not create it
//pull latest copy of XO_BUNDLE


//loop through repos 
//check that it exists, if not create it and clone it  
//pulling each one so up to date

//checkout the tag
//if tag doesn't exist, delete all files except .git


//after loop, copy all files except the .git ones to build directory

//delete empty directories starting w/ "karma-"
//delete unneeded directories like tests, docs


//delete all tmp files from editors

//edit all the .html and .css to use different paths except for lesson.js
//move all the .js files except lesson.js to js/

//somehow put links to all the lessons in a chakra index.html

//rsync the whole structure to the target directory

