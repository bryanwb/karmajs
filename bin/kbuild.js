//narwhal ~/karma/mainline/bin/kbuild.js --karma-src-dir karmaSrcDir --build-dir build --lessons-src-dir lessonsSrcDir --tag stable --bundle-type xo


//requires narwhal
var file = require('file');
var os = require('os');
var args = require('args');

//list of repos for lessons
var LESSONS = [ ["~/tmp/karma_lesson1", "lesson1"], 
	      ["~/tmp/karma_lesson2", 'lesson2'],
	      ["~/tmp/karma_lesson3", 'lesson3'] 
	    ];

var KARMA_REPO = "~/karma/mainline/";
var buildDir = "";
var buildHtmlDir = '';
var karmaSrcDir = "";
var bundleType = 'xo';
var tag = "master";
var lessonsSrcDir = "";
var lessonSrcDir = "";
var includedLessons = [];

var parseOptions = function(){
    //parse args
    var parser = new args.Parser();
    parser.help('Builds and distributes Karma bundle to different type of targets');

    parser.option('-t', '--tag', 'tag')
	.help("which tag to checkout for all lessons")
	.set();

    parser.option('--karma-src-dir', 'karmaSrcDir')
	.help("Directory to hold source tree for mainline karma repository")
	.set();

    parser.option('--lessons-src-dir', 'lessonsSrcDir')
	.help("directory where lesson repositories stored")
	.set();

    parser.option('--build-dir', 'buildDir')
	.help("directory where bundle is built")
	.set();    
    
    parser.option('--bundle-type', 'bundleType')
	.help("type of bundle to be built. Examples: 'web' for use on a website" +
	     " 'xo' to create a .xo bundle for the Sugar environment")
	.def('xo')
	//.choices(['xo', 'web'])
	.set();
	
    parser.helpful();

    var options = parser.parse(system.args);

    tag = options.tag || tag;
    KARMA_REPO = options.KARMA_REPO || KARMA_REPO;
    buildDir = options.buildDir || buildDir;
    karmaSrcDir = options.karmaSrcDir || karmaSrcDir;
    lessonsSrcDir = options.lessonsSrcDir || lessonsSrcDir;

    if (buildDir === karmaSrcDir || buildDir === lessonsSrcDir || 
       karmaSrcDir === lessonsSrcDir){
	throw new Error("The arguments you supplied for KARMASRCDIR, BUILDDIR, and " +
			"LESSONSSRCDIR are not unique. These arguments must be unique");
	exit();
    }
};


var prepareKarmaSrcDir = function(){
    
    //check that the gitdir exists
    //if not create it
    var cmd = '';
    var proc = '';
    var exitCode;

    if(!file.exists(karmaSrcDir)){
	file.mkdir(karmaSrcDir);   
    } 

    if (!file.exists(karmaSrcDir + '/.git')){
	cmd = "git clone " + KARMA_REPO + " " + karmaSrcDir;
	proc = os.popen(cmd);
	exitCode = proc.wait();
	if (exitCode !== 0){
	    throw new Error("Could not clone the bundle repository: " +
			    KARMA_REPO + "\nResults of shell commands \n" + 
			    proc.stderr.read());
	} 
    } else {
	//pull newest version
	cmd = "cd " + karmaSrcDir + ";git pull origin master ";
	proc = os.popen(cmd);
	exitCode = proc.wait();
	if (exitCode !== 0){
	    throw new Error("Could not update the bundle repository: " +
			    KARMA_REPO + "\nResults of shell commands \n" + 
			    proc.stderr.read());
	}
    }
};

var prepareLessonsSrcDir = function(){
    if(!file.exists(lessonsSrcDir)){
	file.mkdir(lessonsSrcDir);   
    } 
};


var prepareEachLessonSrcDir = function(repo){
    var cmd = '';
    var proc = '';
    var exitCode = '';
    var lessonRepo = repo[0];
    var lessonName = repo[1];
    lessonSrcDir = lessonsSrcDir +'/' + lessonName;
    
    if(!file.exists(lessonSrcDir)){
	file.mkdir(lessonSrcDir);   
    } 
    
    if (!file.exists(lessonSrcDir + '/.git')){
	cmd = "git clone " + lessonRepo + " " + lessonSrcDir;
	proc = os.popen(cmd);
	exitCode = proc.wait();
	if (exitCode !== 0){
	    throw new Error("Could not clone the lesson repository: " +
			    lessonRepo + "\nResults of shell commands \n" + 
			    proc.stderr.read());
	}
    } 

    //pull version that matches tag supplied by user
    cmd = "cd " + lessonSrcDir + ";git pull -t origin master; git checkout " + tag;
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
	buildHtmlDir = buildDir;
    } else if (bundleType === "xo"){
	buildHtmlDir = buildDir + "/karma/";
	//copy over XO bundle and lesson stuff
	cmd = "cp -r " + karmaSrcDir + "/bundles/xo/* " + buildDir +
	    "/; rm -rf " + buildHtmlDir +
	    "; mkdir " + karmaSrcDir + "/karma/lessons" +
	    "; cp -r " + lessonsSrcDir + "/* " + buildHtmlDir + "/lessons/" +
	    "; find " + buildDir + " -d -name '.git' " +
	    "-exec rm -rf {} \\; ";
	print(cmd);
	proc = os.popen(cmd);
	print(proc.stdout.read());
	exitCode = proc.wait();
	if (exitCode !== 0){
	    throw new Error("Couldn't copy from directory " + karmaSrcDir + " to " +
			    buildDir + "\nStderr " + proc.stderr.read());
	}
    }

    //loop through includedLessons and copy them over
    
	
};


parseOptions();
prepareKarmaSrcDir();
prepareLessonsSrcDir();
LESSONS.forEach(prepareEachLessonSrcDir);
prepareBuildDir();


//copy all files except the .git ones and the lessons to build directory
//loop through includedLessons and copy them over

//delete unneeded directories like tests, docs
//for each entry in the lessons directory, create hyperlink in index.html


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