
//common.js modules use exports object
if(!this.exports) {
    exports = {};
}
	
	
var Karma = exports.Karma = function (options) {
    //throw error if doctype is not set to html5
    Karma.isHtml5(document.doctype.nodeName);

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

//Enables function chaining for a specified list of function names
//IMPORTANT: use of closures here with "this" and "that" is __very__
//complicated here
Karma.makeChain = function (chainingFunctions) {
    var that = this;
    var chainFunction = function ( name ){
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
       chainFunction( chainingFunctions[ i ] );
   }
};

//Throws big ugly error if doctype isn't html5
Karma.isHtml5 = function (doctype){
    var regex = new RegExp("^html$", 'i');
    if(regex.test(doctype) !== true){
	var errorMsg =  "ERROR: The doctype must be set to <!DOCTYPE html> "
	       + "in order to use Karma. Karma require you use html5";
	var errorElem = document.createElement('div');
	errorElem.setAttribute('id', 'errorDoctype');
	       errorElem.innerText = errorMsg;
	document.body.appendChild(errorElem);
	   throw new Error (errorMsg);
	}
};



Karma.karma = {     
    locale : undefined,
    _localized : false,
    _assetPath : "assets/",
    _localePath : "",
    images : {},
    sounds : {},
    canvases : {},
    svgs : {},
    videos : {},
    initialized : false,
    statusDiv: undefined,
    _counters : { total : 0, errors : 0, loaded : 0},

    //init initializes all the assets passed to Karma, that's it
    //it returns 'this' so it can be used for function chaining
    init: function(options) {
	this.initialized = true;
	
	//set up message that show count of assets loaded
	//and has an ordered list to append error messages to
	var statusDiv = this.statusDiv = document.createElement('div');
	this.loaderDiv = document.createElement('div');	
	var errorList = document.createElement('ol');

	statusDiv.setAttribute('id', 'karma-status');
	statusDiv.innerText = 'Karma is loading ...';
	this.loaderDiv.setAttribute('id', 'karma-loader');
	this.loaderDiv.setAttribute('class', 'status');
	errorList.setAttribute('id', 'errorList');

	statusDiv.appendChild(this.loaderDiv);
	this.statusDiv.appendChild(errorList);
	document.body.appendChild(statusDiv);

	//chain the functions for kCanvas and kSvg
	Karma.makeChain.call(Karma.kCanvas, 
	    Karma.kCanvas.chainingFunctions);
	//Karma.makeChain.apply(Karma.kSvg, Karma.kSvg.chainingFunctions);


	
	//regular expression that matches the name of aprivate property
	// the karma object
	var regexPrivate = new RegExp('^_.*');
	
	for ( var option in options ) {
	    if (option === "images" || option === "sounds" || option === 
		"svgs" || option === "videos" || option === "canvases"){ 
		
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
	    case "canvases":
		options[option]._type = 'canvas';
		Karma.makeCanvases(options[option]);
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
	    this.loaderDiv.setAttribute('style', 'display:none;');
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
	this.loaderDiv.innerText = "" + loaded + " / " + total + 
	    "" + (errors > 0 ? " Errors [ "+ errors+" ]" : '');
	if (errorMsg) {
	    var liError = document.createElement('li');
	    liError.innerHTML = errorMsg;
	    var errorList = document.getElementById('errorList');
	    errorList.appendChild(liError);  
	}
    },	    
    
    isValidLocale : function (locale) {
	//matches 2 letter country code then optionally
	//a dash or underscore followed by a country or language identifier
	//i currently only allow a language identifier 2-3 chars long

	var localeRegex = new RegExp('^[a-zA-Z][a-zA-Z]([-_][a-zA-z]{2,3})?$');
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
	   this.statusDiv.parentNode.removeChild(this.statusDiv);
	}

	var starterMsg = document.getElementById('starterMsg');
	if(starterMsg){
	    starterMsg.parentNode.removeChild(starterMsg);
	}
	 
	this._assetPath = "assets/",
	this.locale = undefined,
	this._localized = false,
	this._localePath = "",
	this.images = {},
	this.canvases = {},
	this.sounds = {},
	this.svgs = {},
	this.videos = {},
	this.initialized = false,
	this.statusDiv= undefined,
	this._counters = { total : 0, errors : 0, loaded : 0};
	this.loaderDiv = undefined;
	return this;
    },

    // Below are geometry and math helper methods
    
    /**
	Converts a value from degrees to radians.
	@param {Number} angle The angle in degrees 
	@returns {Number} The The angle in radians 
	**/
    radians : function( angle ){
	return ( angle / 180 ) * Math.PI;
    },
    /**
	Gets the square of the Euclidian (ordinary) distance between 2 points.
	@param {Number} Point Point No. 0 
	@param {Number} Point Point No. 1
	@returns {Number} The square of the Euclidian distance 
	**/
    distance2 : function ( p0, p1 ) {
	return   (p1.x - p0.x) * (p1.x - p0.x) + (p1.y - p1.y) * (p1.y - p1.y); 
    },
    /**
	Gets the Euclidian (ordinary) distance between 2 points.<br>
	<b>Warning:</b> It's slower than distance2 function
	@param {Number} Point Point No. 0 
	@param {Number} Point Point No. 1
	@returns {Number} The Euclidian distance 
	**/
    distance : function ( p0, p1 ) {
	return   Math.sqrt( this.distance2( p0, p1 ) ); 
    },
    rand : function ( lower, upper ){
		return Math.round ( Math.random() * (upper - lower) + lower );
    }
    
};


Karma.kMedia = {
    file : "",
    path : "",
    localized : false,
    _type : "", 
    media : undefined,

    init : function (asset) {


	asset.localized = asset.localized || false;
	
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
	
	if(Karma.isLocalized(asset.localized)){
	    this.localized = asset.localized;
	    this.path = Karma.karma._localePath + 
		this._type + "s/";
	} else {
	    this.path = Karma.karma._assetPath +
		this._type + "s/";
	}

	if(this._type === 'sound'){
	    this.media.autobuffer = true;
	}

	//IMPORTANT: This one magic line loads the file
		this.media.src = this.src = this.path + this.file;
	
	//add event handlers
	this.addEventHandlers();

	if (this._type === "sound"){
	    this.media.load();
	}

	
	return this;
    },
    addEventHandlers : function () {
	var that = this;
	that.media.addEventListener(
	    "load", 
	    function (e) { 
		Karma.karma._counters.total++;
		Karma.karma._counters.loaded++;
		Karma.karma.updateStatus();
		that.status = "loaded";}, false);
	that.media.addEventListener(
	    "error", 
	    function (e) { 
		Karma.karma._counters.total++;
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
		Karma.karma._counters.total++;
		that.status = "aborted";
		var errorMsg = "ABORT: " + that._type.toUpperCase() +
		    " " + that.name + " loading was aborted."; 
		Karma.karma.updateStatus(errorMsg);

	    }, false);

    },
    
};


Karma.isValidType = function (type){
    var regex = new RegExp('^(image||svg||sound||video||canvas)$');
    return regex.test(type);
};

Karma.isLocalized = function (boolLocalized) {
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

Karma.computeLocalePath = function(locale) {
    return Karma.karma._assetPath + locale + "/";
};

Karma.makeImages = function (imgConfigs){
    var makeImage = function (imgConfig){
	var image = undefined;
	imgConfig._type = "image";
	image = Karma.create(Karma.kMedia).init(imgConfig);
	Karma.karma.images[imgConfig.name] = image;
    };
		       
    imgConfigs.forEach(function(imgConfig){ makeImage(imgConfig);});
		
};

Karma.makeSounds = function (soundConfigs){
    var makeSound = function (soundConfig){
	var sound = undefined;
	soundConfig._type = "sound";
	sound = Karma.create(Karma.kMedia).init(soundConfig);
	sound.play = function () {
	    //hack to fix the audio "stuttering" problem
	    //more info: https://bugs.launchpad.net/karma/+bug/426108
	    this.media.currentTime = 0.1;
	    this.media.play();  
	};
	Karma.karma.sounds[soundConfig.name] = sound;
    };
		       
    soundConfigs.forEach(function(soundConfig){ makeSound(soundConfig);});

};


Karma.makeCanvases = function (canvasConfigs){
    var makeCanvas = function (canvasConfig){
	var canvas = undefined;
	canvas = Karma.create(Karma.kCanvas).init(canvasConfig);
	Karma.karma.canvases[canvasConfig.name] = canvas;
    };
		       
    canvasConfigs.forEach(function(canvasConfig){ makeCanvas(canvasConfig);});

};


Karma.kCanvas = {
    name : '',
    width: 0,
    height: 0,
    visible: true,
    domId: undefined,
    node: undefined,
    ctx: undefined,
    fps: 24,
    init: function (config) {
	for (var option in config){
	    switch (option){
	    case "name":
		this.name = config[option];
		break;
	    case "domId":
		this.domId = config[option];
		break;
	    case "width":
		if(!this.height){
		    throw new Error ("If you specify a width you must also"
				     + "specify a height");
		}
		this.width = config[option];
		break;
	    case "height":
		    if(!this.width){
			throw new Error ("If you specify a height you must also"
					 + "specify a width");
		}
		this.height = parseInt(config[option]);
		break;
	    case "fps":
		this.fps = parseInt(config[option]);
		break;
	    }
	}
	
	if(this.domId && document.getElementById(this.domId)){
	       	this.node = document.getElementById(this.domId);
		this.ctx = this.node.getContext('2d');
	} else {
	    throw new Error('you must specify a valid domId that'
			    + 'is in your html page');
	}

	if(!config.height && !config.width){
	    this.width = parseInt(this.node.getAttribute('width'));
	    this.height = parseInt(this.node.getAttribute('height'));
	}

	return this;
    },
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
   
    chainingFunctions : [
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



Karma.makeSvgs = function (svgConfigs){
    var makeSvg = function (svgConfig){
	var svg = undefined;
	svg = Karma.create(Karma.kSvg).init(svgConfig);
	Karma.karma.svgs[svgConfig.name] = svg;
    };
		       
    svgConfigs.forEach(function(svgConfig){ makeSvg(svgConfig);});

};

Karma.kSvg = {
    name : "",
    width: 0,
    height: 0,
    status: undefined,
    visible: true,
    domId: undefined,
    node: undefined,
    doc: undefined,
    chainingFunctions: [],
    init: function (config) {
	for (var option in config){
	    switch (option){
	    case "name":
		this.name = config[option];
		break;
	    case "domId":
		this.domId = config[option];
		break;
	    case "width":
		if(!this.height){
		    throw new Error ("If you specify a width you must also"
				     + "specify a height");
		}
		this.width = parseInt(config[option]);
		break;
	    case "height":
		    if(!this.width){
			throw new Error ("If you specify a height you must also"
					 + "specify a width");
		}
		this.height = config[option];
		break;
	    case "fps":
		this.fps = config[option];
		break;
	    }
	}
	
	if(this.domId && document.getElementById(this.domId)){
	       	this.node = document.getElementById(this.domId);
	} else {
	    throw new Error('you must specify a valid domId that'
			    + 'is in your html page');
	}

	if(!config.height && !config.width){
	    this.width = parseInt(this.node.getAttribute('width'));
	    this.height = parseInt(this.node.getAttribute('height'));
	}

	var that = this;
	that.addEventHandlers();
	

	return this;
	
	
    },
    addEventHandlers : function () {
	var that = this;
	that.node.addEventListener(
	    "load", 
	    function (e) { 
		console.log('foofoo');
		that.doc = that.node.getSVGDocument();    
		Karma.karma._counters.total++;
		Karma.karma._counters.loaded++;
		Karma.karma.updateStatus();
		that.status = "loaded";
	    }, false);

	that.node.addEventListener(
	    "error", 
	    function (e) { 
		console.log('foobar');
		Karma.karma._counters.total++;
		Karma.karma._counters.errors++;
		that.status = "error";
		var errorMsg = "Error: " + that._type.toUpperCase() +
		    " " + that.name + " cannot be loaded."; 
		Karma.karma.updateStatus(errorMsg);
	    }, 
	    false);
	that.node.addEventListener(
	    "abort", 
	    function (e) { 
		Karma.karma._counters.total++;
		that.status = "aborted";
		var errorMsg = "ABORT: " + that._type.toUpperCase() +
		    " " + that.name + " loading was aborted."; 
		Karma.karma.updateStatus(errorMsg);

	    }, false);

    }
};

Karma.makeVideos = function (videos){

};
