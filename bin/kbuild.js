
//requires narwhal
var file = require('file');
var os = require('os');
var args = require('args');

//list of repos for lessons
var REPOS = [ "git_url", "git_url"];

var bundleRepo = "~/karma/karma_bundle";
var gitDir = "~/tmp/gitDir";
var bundleDir = "~/tmp/bundle";
var tag = "master";

//folders used by each lesson as it is processed
var lessonGitDir = "";
var lessonBuildDir = "";


//parse args
var parser = new args.Parser();
parser.help(
    'Builds and distributes Karma bundle to different type of targets'
);

parser.option('-t', '--tag', 'tag')
    .help("which tag to checkout for all lessons")
    .set();

parser.option('--bundle-repo', 'bundleRepo')
    .help("repository where template for an XO bundle resides")
    .set();

parser.option('--git-dir', 'gitDir')
    .help("directory where this script will checkout the target versions")
    .set();

parser.helpful();

var options = parser.parse(system.args);

tag = options.tag || tag;
bundleRepo = options.bundleRepo || bundleRepo;
gitDir = options.gitDir || gitDir;


//check that bundleRepo exists
//otherwise throw error
if (!file.exists(bundleRepo)){
    throw new Error ("The bundle repository you supplied:\"" + 
		     bundleRepo + "\" does not exist"); 
}
 
//check that the gitdir exists
//if not create it
var cmd = '';
var proc = '';
var exitCode;

if(!file.exists(gitDir)){
    file.mkdir(gitDir);   
} 

if (!file.exists(gitDir + '/.git')){
    cmd = "git clone " + bundleRepo + " " + gitDir;
    proc = os.popen(cmd);
    exitCode = proc.wait();
    if (exitCode !== 0){
	    throw new Error("Could not clone the bundle repository: " +
			    bundleRepo + "\nResults of shell commands \n" + 
			    proc.stderr.read());
    } 
} else {
    //pull newest version
     cmd = "cd " + gitDir + ";git pull origin master ";
    proc = os.popen(cmd);
    exitCode = proc.wait();
    if (exitCode !== 0){
	    throw new Error("Could not update the bundle repository: " +
			    bundleRepo + "\nResults of shell commands \n" + 
			    proc.stderr.read());
    }
}

//loop through repos 
//check that it exists, if not create it and clone it  
//pulling each one so up to date

//checkout the tag
//if tag doesn't exist, delete all files except .git




//check that build dir exists, if not create it

//after loop, copy all files except the .git ones to build directory

//delete empty directories starting w/ "karma-"
//delete unneeded directories like tests, docs
//for each entry in the lessons directory, create hyperlink in index.html

//delete all tmp files from editors

//edit all the .html and .css to use different paths except for lesson.js
//move all the .js files except lesson.js to js/

//somehow put links to all the lessons in a chakra index.html

//rsync the whole structure to the target directory

