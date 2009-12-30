//:~/tmp$ narwhal ~/karma/mainline/bin/kbuild.js --bundle-repo ~/karma/karma_bundle --bundle-dir bar --lessons-dir foo --build-dir build --tag stable

//requires narwhal
var file = require('file');
var os = require('os');
var args = require('args');

//list of repos for lessons
var REPOS = [ ["~/tmp/karma_lesson1", "lesson1"], 
	      ["~/tmp/karma_lesson2", 'lesson2'],
	      ["~/tmp/karma_lesson3", 'lesson3'] 
	    ];

var bundleRepo = "";
var buildDir = "";
var bundleDir = "";
var bundleType = 'xo';
var tag = "master";

//folders used by each lesson as it is processed
var lessonsDir = "";
var lessonGitDir = "";
var includedLessons = [];

var parseOptions = function(){
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

    parser.option('--build-dir', 'buildDir')
	.help("directory where bundle is built")
	.set();
    
    parser.option('--lessons-dir', 'lessonsDir')
	.help("directory where lesson repositories stored")
	.set();

    parser.option('--bundle-type', 'bundleType')
	.help("type of bundle to be built")
	.def('xo')
	.choices(['xo', 'web'])
	.set();
    
    parser.option('--bundle-dir', 'bundleDir')
	.help("directory where this script will checkout the karma bundle from source control")
	.set();

    parser.helpful();

    var options = parser.parse(system.args);

    tag = options.tag || tag;
    bundleRepo = options.bundleRepo || bundleRepo;
    buildDir = options.buildDir || buildDir;
    bundleDir = options.bundleDir || bundleDir;
    lessonsDir = options.lessonsDir || lessonsDir;
};


var prepareBundleDir = function(){
    
    //check that the gitdir exists
    //if not create it
    var cmd = '';
    var proc = '';
    var exitCode;

    if(!file.exists(bundleDir)){
	file.mkdir(bundleDir);   
    } 

    if (!file.exists(bundleDir + '/.git')){
	cmd = "git clone " + bundleRepo + " " + bundleDir;
	proc = os.popen(cmd);
	exitCode = proc.wait();
	if (exitCode !== 0){
	    throw new Error("Could not clone the bundle repository: " +
			    bundleRepo + "\nResults of shell commands \n" + 
			    proc.stderr.read());
	} 
    } else {
	//pull newest version
	cmd = "cd " + bundleDir + ";git pull origin master ";
	proc = os.popen(cmd);
	exitCode = proc.wait();
	if (exitCode !== 0){
	    throw new Error("Could not update the bundle repository: " +
			    bundleRepo + "\nResults of shell commands \n" + 
			    proc.stderr.read());
	}
    }
};

var prepareLessonsDir = function(){
    if(!file.exists(lessonsDir)){
	file.mkdir(lessonsDir);   
    } 
};


var prepareEachLessonDir = function(repo){
    var cmd = '';
    var proc = '';
    var exitCode = '';
    var lessonRepo = repo[0];
    var lessonName = repo[1];
    lessonGitDir = lessonsDir +'/' + lessonName;
    
    if(!file.exists(lessonGitDir)){
	file.mkdir(lessonGitDir);   
    } 

    if (!file.exists(lessonGitDir + '/.git')){
	cmd = "git clone " + lessonRepo + " " + lessonGitDir;
	proc = os.popen(cmd);
	exitCode = proc.wait();
	if (exitCode !== 0){
	    throw new Error("Could not clone the lesson repository: " +
			    lessonRepo + "\nResults of shell commands \n" + 
			    proc.stderr.read());
	}
    } 

    //pull version that matches tag supplied by user
    cmd = "cd " + lessonGitDir + ";git pull -t origin master; git checkout " + tag;
    proc = os.popen(cmd);
    exitCode = proc.wait();
    if (exitCode !== 0){
	print("There isn't a commit in that lesson repository " +
	      lessonRepo + "\n that matches the tag " + tag + 
	      "\nResults of shell commands \n" + 
	      proc.stderr.read());
    } else{
	includedLessons.push(lessonName);

    }
 };


//check that build dir exists, if not create it
var prepareBuildDir = function(){
    var cmd = '';
    var proc = '';
    var exitCode = '';

    if(file.exists(buildDir)){
	proc = os.popen("rm -rf " + buildDir);
	exitCode = proc.wait();
	if (exitCode !== 0){
	    throw new Error("Couldn't remove directory " + buildDir);
	}
	delete proc;
    }
    
    file.mkdir(buildDir);    

    if (bundleType === "web"){
	//copy over the web bundle
    } else if (bundleType === "xo"){
	//copy over XO bundle and lesson stuff
	cmd = "cp -r " + bundleDir + "/* " + buildDir +
	    "; rm -rf " + buildDir + "/karma/lessons/" + 
	    "; mkdir " + buildDir + "/karma/lessons/" +
	    "; cp -r " + lessonsDir + "/* " + buildDir + "/karma/lessons/";
	print(cmd);
	proc = os.popen(cmd);
	print(proc.stdout.read());
	exitCode = proc.wait();
	if (exitCode !== 0){
	    throw new Error("Couldn't copy from directory " + bundleDir + " to " +
			    buildDir + "\nStderr " + proc.stderr.read());
	}
    }
	
};


parseOptions();
prepareBundleDir();
prepareLessonsDir();
REPOS.forEach(prepareEachLessonDir);
prepareBuildDir();


//copy all files except the .git ones and the lessons to build directory
//loop through includedLessons and copy them over

//delete unneeded directories like tests, docs
//for each entry in the lessons directory, create hyperlink in index.html

//delete all tmp files from editors

//edit all the .html and .css to use different paths except for lesson.js
//move all the .js files except lesson.js to js/

//somehow put links to all the lessons in a chakra index.html

//rsync the whole structure to the target directory


/*
//this shell script is __bad_ass__, mess with it at your peril
find . \! -wholename '\.\/\.git*' -a \! -wholename '\.' -exec cp -r {} ../tmpkarma/ \;

sed -n 's/src="\.*\/*\(js\/.*\.js\)"/src="..\/..\/\1"/p' index.html
# fix lesson.js so its path is unchanged
sed -n 's/src="\.*\/*\.*\/*\(js\/lesson.js\)"/src=".\/\1"/p' index.html
*/