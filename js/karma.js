
//common.js modules use exports object
if(!this.exports) {
    exports = {};
}
	
	
var Karma = exports.Karma = function (options) {
    if ( Karma.karma.initialized === true ) {
	return Karma.karma;
    } else {
	return Karma.karma.init(options);
    }
};


//helper functions, all in the Karma namespace

//This emulates the Object.create method in ecmascript 5 spec
//This isn't a full implementation as it doesn't support
//Object.defineProperty
//This has the same functionality as Crockford's beget method
//and this primary building block for prototypal inheritance in
//this library
Karma.create = function (object){
    function F () {};
    F.prototype = object;
    return new F();
};

//this is a shallow copy
Karma.clone = function (object){
    var copy = {};
    for ( var i in object ) {
	copy[i] = object[i];
    }
    return copy;
};

//this copies all the enumerable properties in source to target
Karma.objectPlus = function (target, source){
    for ( var i in source){
	if (source.hasOwnProperty(i)){
	    target[i] = source[i];
	}
    }
    return target;
};

//Creates a new object that is a prototype of the first argument
// then extends it with the properties of the second argument
Karma.copyObjectPlus = function (parent1, parent2){
    function F () {};
    F.prototype = parent1;
    var G = new F();
    return Karma.objectPlus(G, parent2);
};



//These make* commands update the countTotalAssets and
//countNotLoaded when they first create each asset, then
//decrement countNotloaded as they are loaded
Karma.makeImages = function (images){
    /*    for ( var image in images ) {
	image._type = "image";
	
	
    }
     */
};

Karma.makeSounds = function (sounds){

};

Karma.makeVideos = function (videos){

};

Karma.makeSvgs = function (svgs){

};

Karma.makeSurfaces = function (surfaces){

};


Karma.karma = {     
    locale : undefined,
    _localized : false,
    _assetPath : "../assets/",
    _localePath : "",
    images : [],
    sounds : [],
    surfaces : [],
    svgs : [],
    videos : [],
    initialized : false,
    statusDiv: undefined,
    _counters : { total : 0, errors : 0, loaded : 0},

    //init initializes all the assets passed to Karma, that's it
    //it returns 'this' so it can be used for function chaining
    init: function(options) {
	this.initialized = true;
	
	//set up message that show count of assets loaded
	//and has an ordered list to append error messages to
	var loaderDiv = document.createElement('div');
	loaderDiv.setAttribute('id', 'karma-status');
	loaderDiv.innerHTML = 'Karma is \
		loading ...<div id=\"karma-loader\" class=\"status\">' +
	    '</div><ol id=\"errorList\"></ol>';
	document.body.appendChild(loaderDiv);
	this.statusDiv = document.getElementById("karma-loader");

	
	//regular expression that matches the name of aprivate property
	// the karma object
	var regexPrivate = new RegExp('^_.*');
	
	for ( var option in options ) {
	    if (option === "images" || option === "sounds" || option === 
		"svgs" || option === "videos" || option === "surfaces"){ 
		
		if(!(options[option] instanceof Array)){
		    throw new Error("" + option + " must be an array");
		} else if (options[option].length === 0){
		    continue;
		}
	    } else if (regexPrivate.test(option)){
		//don't overwrite a private property of karma object
		continue;
	    }
	    
	    switch (option){
	    case "locale":
		if (this.isValidLocale(options[option])){
		    this.locale = this.normalizeLocale(options[option]);
		    this._localized = true;
		    this._localePath = Karma.computeLocalePath(this.locale);
		} else {
		    throw new Error("locale provided to karma.init() is invalid");
		}
		
		break;
	    case "images":
		options[option]._type = 'image';
		Karma.makeImages(options[option]);
		break;
	    case "sounds":
		options[option]._type = 'sound';
		Karma.makeSounds(options[option]);
		break;
	    case "videos":
		options[option]._type = 'video';
		Karma.makeVideos(options[option]);
		break;
	    case "svgs":
		options[option]._type = 'svg';
		Karma.makeSvgs(options[option]);
		break;
	    case "surfaces":
		options[option]._type = 'surface';
		Karma.makeSurfaces(options[option]);
		break;
	    }
	}
	return this;
    },
    
    //ready checks to see if all assets loaded, then runs lesson code
    ready : function( cb ) {
	that = this;
	if (Karma.karma.initialized !== true){
	    throw new Error("Karma.karma not initialized");
	}
	
	if (this._counters.loaded !== this._counters.total){
	    setTimeout(function(){ that.ready(cb);}, 100);
	} else if (cb) { 
	    //hide that loader status
	    this.statusDiv.setAttribute('style', 'display:none;');
	    cb();
	} else if (!cb) {
	    //if no options passed, show it works message
	    this.showStarterMessage();
	}
	
	return this;
    },

    //Display Apache-like "It works" message if no options
    showStarterMessage : function (){
	var starterMsg = document.createElement('div');
	starterMsg.setAttribute('id', 'starterMsg');
	starterMsg.innerHTML = "<h1>It Works</h1>";
	document.body.appendChild(starterMsg);
    },

    updateStatus : function (errorMsg) {
	var loaded = this._counters.loaded;
	var total = this._counters.total;
	var errors = this._counters.total;
	this.statusDiv.innerText = "" + loaded + " / " + total + 
	    "" + (errors > 0 ? " [ "+errors+" ]" : '');
	if (errorMsg) {
	    var liError = document.createElement('li');
	    liError.innerText = errorMsg;
	    console.log(errorMsg);
	    var errorList = document.getElementById('errorList');
	    errorList.appendChild(liError);  
	}
    },	    
    
    isValidLocale : function (locale) {
	//matches 2 letter country code then optionally
	//a dash or underscore followed by a country or language identifier
	//i currently only allow a language identifier 2-3 chars long

	localeRegex = new RegExp('^[a-zA-Z][a-zA-Z]([-_][a-zA-z]{2,3})?$');
	return localeRegex.test(locale);
    },
    normalizeLocale : function(locale) {
	var lang = "";
	var country = "";
	var divider = "";

	lang = locale.slice(0, 2).toLowerCase();
	divider = "_";
	country = locale.slice(3, 6).toUpperCase();
	
	return locale.length > 2 ? "" + lang + divider + country : lang;
    },
    //unit test suite uses this function
    reset : function () {
	if (this.statusDiv){
	    var karmaStatus = document.getElementById('karma-status');
	    karmaStatus.parentElement.removeChild(karmaStatus);
	}
	this._assetPath = "assets/",
	this.locale = undefined,
	this._localized = false,
	this._localePath = "",
	this.images = [],
	this.surfaces = [],
	this.sounds = [],
	this.svgs = [],
	this.videos = [],
	this.initialized = false,
	this.statusDiv= undefined,
	this._counters = { total : 0, errors : 0, loaded : 0};
	return this;
    },
    
};


Karma.kMedia = {
    name : "",
    file : "",
    path : "",
    _localized : false,
    _type : "", 
    media : undefined,

    init : function (asset) {

	Karma.karma._counters.total++;

	asset._localized = asset._localized || false;

	if (asset.name === undefined || asset.file === undefined){
	    throw new Error("properties name and file have to be defined");
	} else {
	    this.name = asset.name;
	    this.file = asset.file;
	}

	//_type is a private variable used internally
	if (asset._type === undefined){
	    throw new Error("the _type property must be set. " +
			    "Blame the karma library authors as this is an internal value");
	} else {
	    if (Karma.isValidType(asset._type)){
		this._type = asset._type;
		switch ( this._type ) {
		case "image": this.media = new Image(); 
		    break;
		case "sound": this.media = new Audio(); 
		    break;
		case "svg": 
		    //this.media = new Audio(); 
		    break;
		default: throw new Error ("Media type not supported"); 
		}

	    } else {
		throw new Error("the _type property supplied is invalid. " +
				"Blame the karma library authors as this is an internal value");
	    }
	}
	
	if(Karma.isLocalized(asset._localized)){
	    this._localized = asset._localized;
	    this.path = Karma.karma._localePath + 
		this._type + "s/";
	} else {
	    this.path = Karma.karma._assetPath +
		this._type + "s/";
	}
	
	//IMPORTANT: This one magic line loads the file
	this.media.src = this.src = this.path + this.file;
	
	//add event handlers
	this.addEventHandlers();
	
	return this;
    },
    addEventHandlers : function () {
	var elemKarma = document.getElementById('karma-loader');
	var that = this;
	that.media.addEventListener(
	    "load", 
	    function (e) { 
		Karma.karma._counters.loaded++;
		Karma.karma.updateStatus();
		that.status = "loaded";}, false);
	that.media.addEventListener(
	    "error", 
	    function (e) { 
		Karma.karma._counters.errors++;
		that.status = "error";
		var errorMsg = "Error: " + that._type.toUpperCase() +
		    " " + that.name + " cannot be loaded."; 
		Karma.karma.updateStatus(errorMsg);
	    }, 
	    false);
	that.media.addEventListener(
	    "abort", 
	    function (e) { 
		that.status = "aborted";
		var errorMsg = "ABORT: " + that._type.toUpperCase() +
		    " " + that.name + " loading was aborted."; 
		Karma.karma.updateStatus(errorMsg);

	    }, false);

    },
    
};

Karma.surface = {
    width: 0,
    height: 0,
    visible: true,
    elemId: undefined,
    node: undefined,
    fps: 24,
    init: function () {

    },
    
};


Karma.svg = {
    width: 0,
    height: 0,
    visible: true,
    elemId: undefined,
    node: undefined,
    init: function () {
	
    },
};

Karma.isValidType = function (type){
    var regex = new RegExp('^(image||svg||sound||video||surface)$');
    return regex.test(type);
};

Karma.isLocalized = function (boolLocalized) {
    if (typeof boolLocalized === "boolean" ) {
	if(boolLocalized === true && 
	   Karma.karma.locale === undefined){
	    throw new Error("You cannot localize a media asset" +
			    " if the global locale for Karma isn't set");
	} else if (boolLocalized === true) {
	    return true;
	} else {
	    return false;
	}
    } else if (typeof boolLocalized === undefined){
	return false;
    } else{ 
	throw new Error("This is not a valid value for the localized option");
    }
};

Karma.computeLocalePath = function(locale) {
    return Karma.karma._assetPath + locale + "/";
};



