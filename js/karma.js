/*
*	Karma Framework
*	http://karmaeducation.org
*       
*       This code is licensed under the MIT open-source license	
*	Copyright (c)  2009
*	Felipe López Toledo	zer.subzero@gmail.com
*	Bryan W Berry		bryan@olenepal.org
*      
*/

/**
* @fileOverview Contains karma library
* @version 0.2
* @authors Felipe Lopez Toledo <zer.subzero@gmail.com>, Bryan Berry <bryan@karmaeducation.org>
*/


/**
 * See <a href="http://jquery.com">jQuery</a>.
 * @name jQuery
 * @exports $ as jQuery
*/

 //this.exports is used by narwhal but undefined in other contexts
	if(!this.exports) {
	    exports = {};
	}
	
	var KarmaRoot;
	
	var Karma = exports.Karma = function (options) {
	    KarmaRoot;
	    if ( this.KarmaRoot) {
		return KarmaRoot;
	    } else {
		KarmaRoot = Karma.create(Karma.karma)
		return KarmaRoot.init(options);
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


    //counter that records if some assets are still waiting to be loaded
    Karma.countAssetsLoaded = 0;
    Karma.countAssetsTotal = 0;


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
	locale : "", 
	images : [],
	videos : [],
	sounds : [],
	svgs : [],
	_countAssetsLoaded: 0,
	_countAssetsTotal: 0,
	_countAssetsErrors: 0,

	//init initializes all the assets passed to Karma, that's it
	//it returns 'this' so it can be used for function chaining
	init: function(options) {
	    this.name = "karma";
	    
	    //if no options passed, we are done!
	    if(!options) {
		this.showStarterMessage();
		return this;
	    }

	    options.localized = this.checkLocalized(options);

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
		
	    }
	    
	    switch (option){
	    case "locale":
		options.locale = sanitizeLocale(options[option]);
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
	
	return this;
	},
	
	//ready checks to see if all assets loaded, then runs lesson code
	ready : function( cb ) {
	    if (this.countAssetsLoaded !== this.countAssetsTotal){
		setTimeout(function(){this.ready(cb);}, 100);
	    } else if (cb) { 
		//remove that loader status
		document.body.removeChild(this.statusDiv);
		cb();
	    }	    
	},

	//Display Apache-like "It works" message if no options
	showStarterMessage : function (){
	    var starterMsg = document.createElement('div');
	    starterMsg.innerHTML = "<h1>It Works</h1>";
	    document.body.appendChild(starterMsg);
	},

	statusUpdate : function ( current, error, total) {
	    this.statusDiv.innerHTML = "" + current + "/" + total + (error > 0 ? " [ "+error+" ]":'');
	},

	checkLocalized : function (options) {
	    if (options.localized && typeof options.localized === "boolean" ) {
		return localized;
	    }
	    return false;
	},
    
	sanitizeLocale : function() {
	},
	
    };
  
  

