/* Documentation Note:
 *   Public methods and properties are commented with /** some text *\/
 *   and private methods and properties are commented with //
 *   
 *   Please leave it that way to keep this documentation sane
 */


/*
*	Karma Framework
*	http://karmaeducation.org
*	
*	Copyright (c)  2009
*	Bryan W Berry		bryan@olenepal.org
* 	Felipe López Toledo	zer.subzero@gmail.com
*      
*	Under MIT License:
*	Permission is hereby granted, free of charge, to any person
*	obtaining a copy of this software and associated documentation
*	files (the "Software"), to deal in the Software without
*	restriction, including without limitation the rights to use,
*	copy, modify, merge, publish, distribute, sublicense, and/or sell
*	copies of the Software, and to permit persons to whom the
*	Software is furnished to do so, subject to the following
*	conditions:
*	
*	The above copyright notice and this permission notice shall be
*	included in all copies or substantial portions of the Software.	
* 
*	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
*	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
*	OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
*	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
*	HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
*	WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
*	FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
*	OTHER DEALINGS IN THE SOFTWARE.
*/

/**
* @fileOverview Contains karma library
* @author Bryan Berry <bryan@olenepal.org> 
* @author Felipe Lopez Toledo <zer.subzero@gmail.com>
*/


//common.js modules use exports object
if(!this.exports) {
    exports = {};
}



/** Checks if the current document type is set to HTML 5, throws
 * an error if not. Otherwise, initializes the karma object and returns
 * a reference to that object.
 * @namespace Global namespace for Karma library
 * @param {Object} [options={}] options for intializing Karma library
 * @param {String} [options.locale=''] sets current locale Not Yet Implemented
 * @param {Array} [options.image=[]] array of images to be converted into a collection
 * @param {Array} [options.audio=[]] array of audio to be converted into a collection
 * @param {Array} [options.video=[]] NYI array of videos to be converted into a collection
 * @param {Array} [options.svg=[]] array of SVG elements to be 
 * converted into a collection. Each SVG element must already exist in the html document
 * @param {Array} [options.canvas=[]] array of canvas elements 
 * to be converted into a collection. Each canvas element must already exist in the 
 * html document and width and height of each element must be set as attributes
 * @throws {Error} if the document type declaration is not set to HTML 5, e.g. 
 * <!DOCTYPE html>
 * @throws {Error} If any of the initialization parameters are invalid values
 * @returns {Object} Karma.karma -- reference to the initialized Karma library
 * @example
 * 
 * var k = Karma({ 
 *                 image: [ 
 *                    {name: "ninja", file: "ninja.png"}, 
 *                    {name: "cowboy", file: "cowboy.png"}
 *                         ],
 *                 audio: [
 *                    {name: "woosh", file: "woosh.ogg"},
 *                    {name: "yeehaw", file: "yeehaw.ogg"}
 *                         ],
 *                 video: [  //Not Yet Implemented
 *                    {name: "attack", file: "attack.ogv"},
 *                    {name: "ride", file: "ride.ogv"}
 *                         ]
 *                 canvas: [
 *                    {name: "ninja", domId: "ninjaCanvas"},
 *                    {name: "cowboy", domId: "cowboyCanvas"}
 *                         ],
 *                 svg: [ 
 *                    {name: "ninja", domId: "ninjaSvg"},
 *                    {name: "cowboy", domId: "cowboySvg"}
 *                         ],
 *                 });
 * Next, call the ready function with a callback to your program code
 * 
 * k.ready(function () { ... your application code . . . }                       
 * 
 * after that you can access each asset like so
 * k.image.ninja;
 * k.svg.cowboy;
 * k.audio.yeehaw.play();
 * k.canvas.ninja.drawImage(k.image.ninja, 0, 0);
 * 
 */	
var Karma = exports.Karma  = function (options) {
    Karma._isHtml5(document.doctype.nodeName);

    if ( Karma.karma._initialized === true ) {
	return Karma.karma;
    } else {
	return Karma.karma._init(options);
    }
};


//helper functions

/**This emulates the Object.create method in ecmascript 5 spec
 * This isn't a full implementation as it doesn't support
 * This has the same functionality as Crockford's beget method
 * and this primary building block for prototypal inheritance in
 * this library
 * @param {Object} parent that the new object's prototype should point to
 * @returns {Object} a new object whose prototype is parent
 * @example
 * 
 * var ninja = { weapon : "sword" };
 * var ninja1 = Karma.create(ninja);
 * ninja1.weapon === "sword"
 */
Karma.create = function (parent){
    function F () {};
    F.prototype = parent;
    return new F();
};

/** Returns a shallow copy of the passed in object
 * @param {Object} target to be copied
 * @returns {Object} a shallow copy of target
 */
Karma.clone = function (target){
    var copy = {};
    for ( var i in target ) {
	if(target.hasOwnProperty(i)){
	    copy[i] = target[i];
	}
    }
    return copy;
};

/** Extends properties of the target object with those of 
 * the source object
 * @param {Object} target object to be extended 
 * @param {Object} source whose properties will extend target
 * @returns {Object} target extended by source
 */
Karma.objectPlus = function (target, source){
    for ( var i in source){
	if (source.hasOwnProperty(i)){
	    target[i] = source[i];
	}
    }
    return target;
};

/** Creates a new object that is a prototype of the first argument
 * then extends it with the properties of the second argument
 * @param {Object} parent1 will be prototype of returned object
 * @param {Object} parent2 will extend properties of returned object
 * @returns {Object} object that whose prototype is parent1 and has 
 * been extended with properties of parent2
 */ 
Karma.copyObjectPlus = function (parent1, parent2){
    function F () {};
    F.prototype = parent1;
    var G = new F();
    return Karma.objectPlus(G, parent2);
};

//Enables function chaining for a specified list of function names
//IMPORTANT: use of closures here with "this" and "that" is __very__
//complicated here
Karma._makeChain = function (chainingFunctions) {
    var that = this;
    var _chainFunction = function ( name ){
	that[ name ] = function ( ){
	    var type = typeof this.ctx[name];
	    if ( type === "function") {
		this.ctx[ name ].apply( this.ctx, arguments );
	    }else if ( type === "string" ){
		this.ctx[ name ] = arguments[0];
	    }else {
		throw ("wtf?!: impossible to chain " + name + "!");
	    }
	    return this;
	};
   };
   
   for (var i = 0; i < chainingFunctions.length; i++){
       _chainFunction( chainingFunctions[ i ] );
   }
};

//Throws big ugly error if doctype isn't html5
Karma._isHtml5 = function (doctype){
    var regex = new RegExp('^html$', 'i');
    if(!regex.test(doctype)){
	var errorMsg =  "ERROR: The doctype must be set to <!DOCTYPE html> " +
	    "in order to use Karma. Karma require you use html5";
	var errorElem = document.createElement('div');
	errorElem.setAttribute('id', 'errorDoctype');
	errorElem.innerText = errorMsg;
	document.body.appendChild(errorElem);
	   throw new Error(errorMsg);
	}
};


/** Stores global settings for the Karma library
 * @class This object stores the global settings for the Karma library
 */
Karma.karma = {      
    /** This is the global locale as passed to Karma(),
     * such as "en", "es_SP"
     * @type string
     * @default undefined
     */
    locale : undefined,
    /** Collection of images with special helper
     * methods added to each reference
     * @type object
     * @default empty object
     */
    image : {},
    /** Collection of audio files with special helper
     * methods added to each reference
     * @type object
     * @default empty object
     */
    audio : {},
    /** Collection of html 5 canvases with special helper
     * methods added to each reference
     * @type object
     * @default empty object
     */
    canvas : {},
    /** Collection of svgs with special helper
     * methods added to each reference
     * @type object
     * @default empty object
     */
    svg : {},
    /** Collection of videos with special helper
     * methods added to each reference
     * @type object
     * @default empty object
     */
    video : {},
    _localized : false,
    _assetPath : "assets/",
    _localePath : "",
    _initialized : false,
    _statusDiv: undefined,
    _loaderDiv : undefined,
    _counters : { total : 0, errors : 0, loaded : 0},

    //init initializes all the assets passed to Karma, that's it
    //it returns 'this' so it can be used for function chaining
    _init: function(options) {
	this._initialized = true;
	
	//set up message that show count of assets loaded
	//and has an ordered list to append error messages to
	var _statusDiv = this._statusDiv = document.createElement('div');
	this._loaderDiv = this._loaderDiv = document.createElement('div');	
	var errorList = document.createElement('ol');

	_statusDiv.setAttribute('id', 'karma-status');
	_statusDiv.setAttribute('style', 'position:absolute;');
	_statusDiv.innerHTML = 'Karma is loading ...';
	this._loaderDiv.setAttribute('id', 'karma-loader');
	this._loaderDiv.setAttribute('class', 'status');
	errorList.setAttribute('id', 'errorList');

	_statusDiv.appendChild(this._loaderDiv);
	this._statusDiv.appendChild(errorList);
	document.body.appendChild(_statusDiv);


	//chain the functions for kCanvas and kSvg
	Karma._makeChain.call(Karma.kCanvas, 
	    Karma.kCanvas._chainingFunctions);
	//Karma._makeChain.apply(Karma.kSvg, Karma.kSvg._chainingFunctions);


	
	//regular expression that matches the name of aprivate property
	// the karma object
	var regexPrivate = new RegExp('^_.*');
	
	for ( var option in options ) {
	    if (options.hasOwnProperty(option)){
		if (option === "image" || option === "audio" || option === 
		    "svg" || option === "video" || option === "canvas"){ 
		    
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

		    if (this._isValidLocale(options[option])){
			this.locale = this._normalizeLocale(options[option]);
			this._localized = true;
			this._localePath = Karma._computeLocalePath(this.locale);
		    } else {
			throw new Error("locale provided to karma._init() is invalid");
		    }
		    
		    break;
		case "image":
		    options[option]._type = 'image';
		    Karma._makeCollection(options[option], 'image');
		    break;
		case "audio":
		    options[option]._type = 'audio';
		    Karma._makeCollection(options[option], 'audio');
		    break;
		case "video":
		    options[option]._type = 'video';
		    Karma._makeCollection(options[option], 'video');
		    break;
		case "svg":
		    options[option]._type = 'svg';
		    Karma._makeCollection(options[option], 'svg');
		    break;
		case "canvas":
		    options[option]._type = 'canvas';
		    Karma._makeCollection(options[option], 'canvas');
		    break;
		}
	    }
	}



	return this;
    },
    
    /** Waits until all assets loaded, i.e. ready, then calls callback
     * @param {Function} [cb] callback function
     * @returns this
     * @throws {Error} if Karma.karma is not initialized with the 
     * Karma({ options }) function
     * @example
     * 
     * var k = Karma({ . . . your assets here . . . });
     * k.ready(function(){ .. your code here . . .});
     * 
     * your code will not be called until all assets have been loaded
     * 
     */
    ready : function( cb ) {
	var that = this;
	if (Karma.karma._initialized !== true){
	    throw new Error("Karma.karma not initialized");
	}

	if (this._counters.loaded !== this._counters.total){
	    setTimeout(function(){ that.ready(cb);}, 5);
	} else if (cb) {
	    //hide the "Karma is loading..." message
	    this._statusDiv.setAttribute('style', 'display:none;');

	     cb();
	} else if (!cb) {
	    //hide the "Karma is loading..." message
	    this._statusDiv.setAttribute('style', 'display:none;');
	    
	    //if no options passed, show it works message
	    this._showStarterMessage();
	}
	
	
	   

	return this;
    },

    //Display Apache-like "It works" message if no options
    _showStarterMessage : function (){
	var starterMsg = document.createElement('div');
	starterMsg.setAttribute('id', 'starterMsg');
	starterMsg.innerHTML = "<h1>It Works</h1>";
	document.body.appendChild(starterMsg);
    },

    //Updates visible counter of how many assets are loaded
    _updateStatus : function (errorMsg) {
	var loaded = this._counters.loaded;
	var total = this._counters.total;
	var errors = this._counters.errors;
	this._loaderDiv.innerHTML = "Loaded " + loaded + " / " + total + 
	    "" + (errors > 0 ? " Errors [ " + errors +" ]" : '');
	if (errorMsg) {
	    var liError = document.createElement('li');
	    liError.innerHTML = errorMsg;
	    var errorList = document.getElementById('errorList');
	    errorList.appendChild(liError);  
	}
    },	    

    //matches 2 letter country code then optionally
    //a dash or underscore followed by a country or language identifier
    //i currently only allow a language identifier 2-3 chars long
    _isValidLocale : function (locale) {
	var localeRegex = new RegExp('^[a-zA-Z][a-zA-Z]([-_][a-zA-z]{2,3})?$');
	return localeRegex.test(locale);
    },

    _normalizeLocale : function(locale) {
	var lang = "";
	var country = "";
	var divider = "";

	lang = locale.slice(0, 2).toLowerCase();
	divider = "_";
	country = locale.slice(3, 6).toUpperCase();
	
	return locale.length > 2 ? "" + lang + divider + country : lang;
    },
    
    // Below are geometry and math helper methods
    
    /**
     * Converts a value from degrees to radians.
     * @param {Number} angle The angle in degrees
     * @returns {Number} The angle in radians 
     */
    radians : function( angle ){
	return ( angle / 180 ) * Math.PI;
    },
    /**
     *  Gets the square of the Euclidian (ordinary) distance between 2 points.
     * @param {Object} Point No. 0
     * @param {Number} Point0.x
     * @param {Number} Point0.y
     * @param {Object} Point No. 1
     * @param {Number} Point1.x
     * @param {Number} Point1.y
     * @returns {Number} The square of the Euclidian distance 
     * @example
     * 
     * p0 = {x:0, y:1};
     * p1 = {x:50, y:70};
     * var d = distance2(p0, p1);
     * 
     */
    distance2 : function ( p0, p1 ) {
	return   (p1.x - p0.x) * (p1.x - p0.x) + (p1.y - p1.y) * (p1.y - p1.y); 
    },
    /**
     * Gets the Euclidian (ordinary) distance between 2 points.<br>
     * <b>Warning:</b> It's slower than distance2 function
     * @param {Object} Point No. 0
     * @param {Number} Point0.x
     * @param {Number} Point0.y
     * @param {Object} Point No. 1
     * @param {Number} Point1.x
     * @param {Number} Point1.y
     * @returns {Number} The Euclidian distance 
     * @example
     * 
     * p0 = {x:0, y:1};
     * p1 = {x:50, y:70};
     * var d = distance2(p0, p1);
     * 
     */
    distance : function ( p0, p1 ) {
	return   Math.sqrt( this.distance2( p0, p1 ) ); 
    },
    /** Returns a random number within the range provided
     * @param {Number} lower limit of the range, lowest number that can be returned
     * @param {Number} upper limit of the range, highest number that can be returned
     * @returns {Number} number that is >= lower and <= upper
     * @example
     * 
     * var num = rand(0, 10);
     * 
     * //num could be 0, 1, 2, 3 ... or 10
     * 
     */
    rand : function ( lower, upper ){
		return Math.round( Math.random() * (upper - lower) + lower );
    }
    
};

//Helper functions for creating assets

Karma._isLocalized = function (boolLocalized) {
    if (typeof boolLocalized === "boolean" ) {
	if(boolLocalized === true && 
	   Karma.karma.locale === undefined){
	    throw new Error("You cannot localize a media asset" +
			    " if the global locale for Karma isn't set");
	} else {
	    return boolLocalized;
	}
    } else if (typeof boolLocalized === undefined){
	return false;
    } else{ 
	throw new Error("This is not a valid value for the localized option");
    }
};

Karma._computeLocalePath = function(locale) {
    return Karma.karma._assetPath + locale + "/";
};


Karma._makeCollection = function (configs, type){
    var makeAsset = function (config){
	var asset = undefined;
	var target = undefined;
	switch(type){
	    case "image":
		target = Karma.kImage;
		break;
	    case "audio":
		target = Karma.kAudio;
		break;
	    case "video":
		target = Karma.kVideo;
		break;
	    case "svg":
		target = Karma.kSvg;
		break;
	    case "canvas":
		target = Karma.kCanvas;
		break;
	}

	asset = Karma.create(target)._init(config);
	Karma.karma[type][config.name] = asset;
    };
		       
    configs.forEach(function(config){ makeAsset(config);});
};

//Prototype objects for assets


/** Prototypal object for images
 *  @class This object is the prototype for images
 *  @ throws {Error} if the image asset is set to be localized but 
 *  the global locale is not set on the Karma.karma object
 *  @ throws {Error} if the name and file properties are not supplied
 *  @example
 *  kImage is the prototype object for images. This 'media' asset is loaded 
 *  in a distinctly different way from the canvas or svg assets.    
 */
Karma.kImage = {
    /** file location of image
     * @type String
     * @default ""
     */
    file : "",
    /** media object
     * @type Image
     * @default undefined 
     */	
    media : undefined,
    //actual path to the file
    _path : "",
    //if using localized version of this image
    _localized : false,
    _type : "image", 
    //initializes kImage instance with values provided by user
    _init : function (image) {
	image._localized = image._localized || false;
	Karma.karma._counters.total++;

	if (image.name === undefined || image.file === undefined){
	    throw new Error("properties name and file have to be defined");
	} else {
	    this.name = image.name;
	    this.file = image.file;
	}

	this.media = new Image(); 
	
	if(Karma._isLocalized(image._localized)){
	    this._localized = image._localized;
	    this._path = Karma.karma._localePath + "image/";
	} else {
	    this._path = Karma.karma._assetPath + "image/";
	}

	//IMPORTANT: This one magic line loads the file
	this.media.src = this.src = this._path + this.file;
	
	//add event handlers
	this._addEventHandlers();

	
	return this;
    },
    //Adds event handlers to update the counters when 
    //the image is successfully or unsuccessfully loaded
    _addEventHandlers : function () {
	var that = this;

	that.media.addEventListener(
	    "load", 
	    function (e) { 
		Karma.karma._counters.loaded++;
		Karma.karma._updateStatus();
		that.status = "loaded";}, false);
	
	that.media.addEventListener(
	    "error", 
	    function (e) { 
		Karma.karma._counters.errors++;
		that.status = "error";
		var errorMsg = "Error: " + that._type.toUpperCase() +
		    " " + that.name + " cannot be loaded."; 
		Karma.karma._updateStatus(errorMsg);
	    }, 
	    false);
	that.media.addEventListener(
	    "abort", 
	    function (e) { 
		Karma.karma._counters.total++;
		that.status = "aborted";
		var errorMsg = "ABORT: " + that._type.toUpperCase() +
		    " " + that.name + " loading was aborted."; 
		Karma.karma._updateStatus(errorMsg);

	    }, false);
    }
    
};

/** Prototypal object for audio files 
 *  @class This object is the prototype for audio files
 *  @ throws {Error} if the individual audio asset is set to be localized but 
 *  the globale locale is not set on the Karma.karma object
 *  @ throws {Error} if the name and file properties are not supplied
 *  @example
 *  kAudio is the prototype object for audio
 *  The audio assets are loaded in a distinctly different way
 *  from the canvas or svg assets. They also have distinctly different
 *  helper methods 
 *  
 *  You initialize the kAudio assets by passing an array of objects
 */
Karma.kAudio = {
    /** file location of asset
     * @type String
     * @default ""
     */
    file : "",
    /** media object
     * @type Audio
     * @default undefined 
     */	
    media : undefined,
    //actual path to the file
    _path : "",
    //if using localized version of this asset
    _localized : false,
    _type : "audio", 
    //initializes kAudio instance with values provided by user
    _init : function (audio) {
	audio._localized = audio._localized || false;
	Karma.karma._counters.total++;

	if (audio.name === undefined || audio.file === undefined){
	    throw new Error("properties name and file have to be defined");
	} else {
	    this.name = audio.name;
	    this.file = audio.file;
	}

	this.media = new Audio(); 
	
	if(Karma._isLocalized(audio._localized)){
	    this._localized = audio._localized;
	    this._path = Karma.karma._localePath  + "audio/";
	} else {
	    this._path = Karma.karma._assetPath + "audio/";
	}


	//IMPORTANT: This one magic line loads the file
	this.media.src = this.src = this._path + this.file;
	
	//add event handlers
	this._addEventHandlers();

	if (this._type === "audio"){
	    this.media.autobuffer = true;
	    this.media.load();
	}

	
	return this;
    },
    //Adds event handlers to update the counters when 
    //the asset is successfully or unsuccessfully loaded
    _addEventHandlers : function () {
	var that = this;
	//'canplaythrough' event is a Browser Hack recommended by chromium devs
	//http://code.google.com/p/chromium/issues/detail?id=20251&q=loading%20audio&colspec=ID%20Stars%20Pri%20Area%20Type%20Status%20Summary%20Modified%20Owner%20Mstone%20OS#c4

	that.media.addEventListener(
	    "canplaythrough", 
	    function (e) { 
		Karma.karma._counters.loaded++;
		Karma.karma._updateStatus();
		that.status = "loaded";}, false);
	
	that.media.addEventListener(
	    "error", 
	    function (e) { 
		Karma.karma._counters.errors++;
		that.status = "error";
		var errorMsg = "Error: " + that._type.toUpperCase() +
		    " " + that.name + " cannot be loaded."; 
		Karma.karma._updateStatus(errorMsg);
	    }, 
	    false);
	that.media.addEventListener(
	    "abort", 
	    function (e) { 
		Karma.karma._counters.total++;
		that.status = "aborted";
		var errorMsg = "ABORT: " + that._type.toUpperCase() +
		    " " + that.name + " loading was aborted."; 
		Karma.karma._updateStatus(errorMsg);

	    }, false);

    },
    play : function () {
	    this.media.play();  
    }
    
};

/** NYI:Prototypal object for Video files 
 *  @class This object is the prototype for video files
 *  @ throws {Error} if the individual audio asset is set to be localized but 
 *  the globale locale is not set on the Karma.karma object
 *  @ throws {Error} if the name and file properties are not supplied
 *  @example
 *  kAudio is the prototype object for audio
 *  The audio assets are loaded in a distinctly different way
 *  from the canvas or svg assets. They also have distinctly different
 *  helper methods 
 *  
 *  You initialize the kVideo assets by passing an array of objects
 */
Karma.kVideo = {
    /** file location of asset
     * @type String
     * @default ""
     */
    file : "",
    /** media object
     * @type Video
     * @default undefined 
     */	
    media : undefined,
    //actual path to the file
    _path : "",
    //if using localized version of this asset
    _localized : false,
    _type : "video", 
    //initializes kVideo instance with values provided by user
    _init : function (video) {
	video._localized = video._localized || false;
	Karma.karma._counters.total++;

	if (video.name === undefined || video.file === undefined){
	    throw new Error("properties name and file have to be defined");
	} else {
	    this.name = video.name;
	    this.file = video.file;
	}

	this.media = new Video(); 
	
	if(Karma._isLocalized(video._localized)){
	    this._localized = video._localized;
	    this._path = Karma.karma._localePath  + "video/";
	} else {
	    this._path = Karma.karma._assetPath + "video/";
	}


	//IMPORTANT: This one magic line loads the file
	this.media.src = this.src = this._path + this.file;
	
	//add event handlers
	this._addEventHandlers();

	return this;
    },
    //Adds event handlers to update the counters when 
    //the asset is successfully or unsuccessfully loaded
    _addEventHandlers : function () {
	var that = this;
	//'canplaythrough' event is a Browser Hack recommended by chromium devs
	//http://code.google.com/p/chromium/issues/detail?id=20251&q=loading%20audio&colspec=ID%20Stars%20Pri%20Area%20Type%20Status%20Summary%20Modified%20Owner%20Mstone%20OS#c4

	that.media.addEventListener(
	    "canplaythrough", 
	    function (e) { 
		Karma.karma._counters.loaded++;
		Karma.karma._updateStatus();
		that.status = "loaded";}, false);
	
	that.media.addEventListener(
	    "error", 
	    function (e) { 
		Karma.karma._counters.errors++;
		that.status = "error";
		var errorMsg = "Error: " + that._type.toUpperCase() +
		    " " + that.name + " cannot be loaded."; 
		Karma.karma._updateStatus(errorMsg);
	    }, 
	    false);
	that.media.addEventListener(
	    "abort", 
	    function (e) { 
		Karma.karma._counters.total++;
		that.status = "aborted";
		var errorMsg = "ABORT: " + that._type.toUpperCase() +
		    " " + that.name + " loading was aborted."; 
		Karma.karma._updateStatus(errorMsg);

	    }, false);

    }
    
};



/** Prototypal object for each canvas element submitted to Karma in the
 * Karma() method
 * @throws {Error} if the name and domId for the canvas element are not specified
 * @thows {Error} if the supplied domId does not match an element in the DOM
 * @class This object is the prototype for each canvas element submitted to Karma in the
 * Karma() method
 */
Karma.kCanvas = {
    /** Name of the canvas, used internally by karma.js
     * @type String
     * @default ''
     */
    name : '',
    /** Width of canvas element
     * @type Number
     * @default 0
     */
    width: 0,
    /** Height of canvas element
     * @type Number
     * @default 0
     */
    height: 0,
    /**  Whether canvas is visible
     * @type boolean
     * @default true
     */
    visible: true,
    /** Element ID for canvas element in html document
     * @type String
     * @default undefined
     */
    domId: undefined,
    /** Reference to the DOM element
     * @type DOMElement
     * @default undefined
     */
    node: undefined,
    /** The 2 Dimensional Rendering context property for this canvas
     * @type 2DRenderingContext
     * @default undefined
     */
    ctx: undefined,

    //initializes object with values provides by user
    _init: function (config) {
	for (var option in config){
	    if (config.hasOwnProperty(option)){
		switch (option){
		case "name":
		    this.name = config[option];
		    break;
		case "domId":
		    this.domId = config[option];
		    break;
		case "width":
		    if(!this.height){
			throw new Error("If you specify a width you must also" +
					"specify a height");
		    }
		    this.width = config[option];
		    break;
		case "height":
		    if(!this.width){
			throw new Error("If you specify a height you must also" +
					"specify a width");
		    }
		    this.height = parseInt(config.option, 10);
		    break;
		case "fps":
		    this.fps = parseInt(config.option, 10);
		    break;
		}
	    }
	}
	
	if(this.domId && document.getElementById(this.domId)){
	       	this.node = document.getElementById(this.domId);
		this.ctx = this.node.getContext('2d');
	} else {
	    throw new Error('you must specify a valid domId that' +
			    'is in your html page');
	}

	if(!config.height && !config.width){
	    this.width = parseInt(this.node.getAttribute('width'), 10);
	    this.height = parseInt(this.node.getAttribute('height'), 10);
	}

	return this;
    },
    /** Clear area of canvas element specified by parameters, if no
     * parameters supplied, clears entire canvas
     * @param {Number} [x=0] x coordinate, defaults to zero if left blank
     * @param {Number} [y=0] y coordinate, defaults to zero if left blank  
     * @param {Number} [width=0] width of area to be cleared, defaults 
     * entire width of canvas
     * @param {Number} [height=0] height of area to be cleared, defaults 
     * entire height of canvas
     * @returns this
     * @example
     * 
     * k.canvas.ninja.clear();
     * // clears the entire ninja canvas
     * 
     * k.canvas.ninja.clear(0, 10, 20, 30);
     * //clears a specific portion of the ninja canvas
     * 
     */
    clear : function ( x, y, width, height ) {
	var that = this;
	that.ctx.clearRect(
	    x || 0,
	    y || 0, 
	    width  || that.width, 
	    height || that.height
	);
	return that;
    },
  
    //These are all properties or methods of the canvas element's
    //2 dimensional context
    _chainingFunctions : [
	"globalAlpha", "globalCompositeOperation", "lineWidth", "lineCap", 
	"lineJoin", "miterLimit", "font", "textAlign", "textBaseline", "save", 
	"restore", "scale", "rotate", "translate", "transform", "setTransform", 
	"clearRect", "fillRect", "strokeRect", "beginPath", "closePath", 
	"moveTo", "lineTo", "quadraticCurveTo", "bezierCurveTo", "arcTo", 
	"arc", "rect", "fill", "stroke", "clip", "fillText", "strokeText", 
	"measureText", "isPointInPath", "strokeStyle", "fillStyle", 
	"createLinearGradient", "createRadialGradient", "createPattern", 
	"shadowOffsetX", "shadowOffsetY", "shadowBlur", "shadowColor", 
	//"mozTextStyle", "mozDrawText", "mozMeasureText", "mozPathText", 
	"mozTextAlongPath", "drawImage", "getImageData", "putImageData", 
	"createImageData", "drawWindow"
    ]
};


/** Prototypal object for each svg element submitted to Karma in the
 * Karma() method
 * @throws {Error} if the name and domId for the svg element are not specified
 * @thows {Error} if the supplied domId does not match an element in the DOM
 * @class This object is the prototype for each svg element submitted to Karma in the
 * Karma() method
 */
Karma.kSvg = {
    /** name of instance, used internally 
     * @typeof string
     * @default ""
     */
    name : "",
    /** width of element 
     * @type number
     * @default 0
     */
    width: 0,
    /** height of element 
     * @type number
     * @default 0
     */
    height: 0,
    /** Status of element, either "loaded" or "error"
     * @type string
     * @default ""
     */
    status: "",
    /**  Whether canvas is visible
     * @type boolean
     * @default true
     */
    visible: true,
    /** Element ID for canvas element in html document
     * @type String
     * @default undefined
     */
    domId: undefined,
    /** Reference to the DOM element
     * @type DOMElement
     * @default undefined
     */
    node: undefined,
    /** Reference to the SVGDocument 
     * @type SVGDocument
     * @default undefined
     */
    doc: undefined,
    /** Reference to the root element of the SVG Document 
     * @type DocumentElement
     * @default undefined
     */
    root: undefined,
    _localized : undefined,
    _chainingFunctions: [],
    _init: function (config) {
	Karma.karma._counters.total++;

	for (var option in config){
	    if (config.hasOwnProperty(option)){
		switch (option){
		case "name":
		    this.name = config[option];
		    break;
		case "domId":
		    this.domId = config[option];
		    break;
		case "width":
		    if(!this.height){
			throw new Error("If you specify a width you must also" +
					"specify a height");
		    }
		    this.width = parseInt(config[option], 10);
		    break;
		case "height":
		    if(!this.width){
			throw new Error("If you specify a height you must also" +
					"specify a width");
		    }
		    this.height = config[option];
		    break;
		case "fps":
		    this.fps = config[option];
		    break;
		}
	    }
	}
	
	if(this.domId && document.getElementById(this.domId)){
	       	this.node = document.getElementById(this.domId);
	} else {
	    throw new Error('you must specify a valid domId that' +
			    'is in your html page');
	}

	if(!config.height && !config.width){
	    this.width = parseInt(this.node.getAttribute('width'), 10);
	    this.height = parseInt(this.node.getAttribute('height'), 10);
	}
	
	var that = this;
	that._addEventHandlers();
		   
	return this;
	
	
    },
    _addEventHandlers : function () {
	var that = this;	
	that.doc = that.node.getSVGDocument();	
	that.node.addEventListener(
		"load", 
	    function (e) { 
		that.doc = that.node.getSVGDocument();    
		that.root = that.doc.documentElement;
		Karma.karma._counters.loaded++;
		Karma.karma._updateStatus();
		that.status = "loaded";
	    }, false);

	that.node.addEventListener(
	    "error", 
	    function (e) { 
		Karma.karma._counters.loaded--;
		Karma.karma._counters.errors++;
		that.status = "error";
		var errorMsg = "Error: " + that._type.toUpperCase() +
		    " " + that.name + " cannot be loaded."; 
		Karma.karma._updateStatus(errorMsg);
	    }, 
	    false);
	that.node.addEventListener(
	    "abort", 
	    function (e) { 
		that.status = "aborted";
		var errorMsg = "ABORT: " + that._type.toUpperCase() +
		    " " + that.name + " loading was aborted."; 
		Karma.karma._updateStatus(errorMsg);

	    }, false);

    }
};
