
    
if(!this.exports) {
    exports = {};
}
     
     
var Karma = exports.Karma = function (options) {
    if ( Karma.KarmaRoot) {
	return Karma.KarmaRoot;
    } else {
	return Karma.create(Karma.karma).init(options);
    }
};

Karma.KarmaRoot = null;

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
	_localePath : "",
	images : [],
	videos : [],
	sounds : [],
	svgs : [],
	_counters : { total : 0, errors : 0, loaded },

	//init initializes all the assets passed to Karma, that's it
	//it returns 'this' so it can be used for function chaining
	init: function(options) {
	    this.name = "karma";
	    Karma.KarmaRoot = this;
	    
	    //set up message that show count of assets loaded
	    var loaderDiv = document.createElement('div')
	    loaderDiv.innerHTML = '<div id=\"karma-loader\">Karma is \
		loading ...<div id=\"karma-loader\" class=\"status\"></div></div>';
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
			options._localePath = computeLocalePath(this.locale);
		    } else {
			throw new Error("locale provided to karma.init() is invalid");
		    }
		    
		    break;
		case "images":
		    Karma.makeImages(options[option]);
		    break;
		case "sounds":
		    Karma.makeSounds(options[option]);
		    break;
		case "videos":
		    Karma.makeVideos(options[option]);
		    break;
		case "svgs":
		    Karma.makeSvgs(options[option]);
		    break;
		case "surfaces":
		    Karma.makeSurfaces(options[option]);
		    break;
		}
	    }
	    return this;
	},
	
	//ready checks to see if all assets loaded, then runs lesson code
	ready : function( cb ) {
	    that = this;
	    if (!Karma.KarmaRoot){
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

	statusUpdate : function ( current, error, total) {
	    this.statusDiv.innerHTML = "" + current + "/" + total + (error > 0 ? " [ "+error+" ]":'');
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

	computeLocalePath : function(locale) {
	    return "../assets/" + locale + "/";
	},
	
    };
     
     
Karma.kMedia = {
    name : "",
    fileName : "",
    path : "",
    localized : false,
    type : "", 
    media : undefined,

    init : function () {
	


    }
};

Karma.checkLocalized = function (options) {
	if (options.localized && typeof options.localized === "boolean" ) {
		return localized;
	} else {
	    throw new Error("This is not a valid value for the localized option");
	}
};



