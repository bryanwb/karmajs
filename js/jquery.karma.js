/*
*	Karma Framework
*	http://wiki.sugarlabs.org/go/Karma
*	
*	Copyright (c)  2009
*	Felipe López Toledo	zer.subzero@gmail.com
*	Bryan W Berry		bryan@olenepal.org
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
* @version 0.5
* @author Felipe Lopez Toledo <zer.subzero@gmail.com>
*/

 
/**
 * See (http://jquery.com/).
 * @class
 * @name jQuery
 * @exports $ as jQuery
*/

(function ($) {
//helpers
/**
Checks if the argument 'arg' is set and if its type is 'type'.<br>
1. if arg is set: it returns 'toReturn' if specified, otherwise it returns 
	'true'
2. if arg is not set: it returns 'false'
@param arg The param to check
@param {Object} [type] The expeted type of 'arg'
@param [toReturn] object or value to return in case 1
@returns true | false | toReturn
@example
var msg = "hi";
valid(msg); //returns true
valid(msg, "String" ); //returns true
valid(msg, "Number"); //returns false
valid(msg, "String",false ); //returns false
valid(msg, "String", "hello" ); //returns "hello"
valid(msg123); //returns false
**/
var valid = function ( arg, type, toReturn ) {
	if ( type ) {
		if ( typeof arg === type ) {
			if ( toReturn )
				return toReturn;
			return true;
		}
		return false
	}
	if ( typeof arg !== "undefined" && arg!== "null" ) return true;
	return false;
}
/**
Clones an object
@param {object} obj The source object
@returns {object} The cloned object
**/
var clone = function( obj ){
    if(obj == null || typeof(obj) != 'object')
        return obj;
    var temp = new obj.constructor(); 
    for(var key in obj)
        temp[ key ] = clone( obj[ key ] );
    return temp;
}

/**
 * Karma
 * @name Karma
 * @class Represents a Karma (master) object.
 * @param {String | Object } options Constructor arguments 
 * @param {String | Object } [options.container] Target DIV-class that will contain any canvas element created using Karma functions
 * @param {String} [options.language] 
*/
var Karma = function(options ) {
	var that = this;
	this.version = "0.3 alpha";
	//
	//relative path to the po, images, sounds, etc.  from the html
	//defined here: http://wiki.sugarlabs.org/go/Karma/Bundle_layout
	//localized is recalculated inside localizeContent ( $ = language.lang )
	this.paths = {
		po: "po/",
		images: {
				localized:	"assets/$/images/",
				generic:	"assets/generic/images/"
				},
		sounds: {
				localized:	"assets/$/sounds/",
				generic:	"assets/generic/sounds/"
				},
		videos: {
				localized:	"assets/$/videos/",
				generic:	"assets/generic/videos/"
				}
	};
	this.supportedLangFileTypes = [ 
		{ ext: "po",   type: 'application/x-po' },
		{ ext: "json", type: 'application/json'}
	];
	//
	//PRIVATE STUFF start
	/**
	Gets the language acording to the browser language
	@returns {Object} <br>
	lang: countryCode and langCode (if specified)
	langCode*: language code represented as xx, example: en.<br>
	countryCode*: country code represented as YY, example: US.<br>
	*optional
	**/
	var getLanguage = function () {
		//console.log +=  navigator.language +"\n";
		var lang = navigator.language || navigator.browserLanguage; //mozilla/ie
		lang = lang.replace(/_/, '-').toLowerCase();
		if (lang.length > 3 ) {
			var country = lang.substring(3, 5);
			lang = lang.substring(0, 2);
			if ( country.match(/[^a-zA-Z]/) === null ) {
				country = country.toUpperCase();
				return  { 
					"lang": lang + "-" + country, 
					"langCode": lang, 
					"countryCode": country 
				};
			}
		}
		return { "lang": lang };
	}
	/**
	Creates a new Gettext object and returns a shortcut function to localise 
	defined strings.<br>We use karma.Gettext.js it's a modification of 
	<a href=http://jsgettext.berlios.de/doc/html/Gettext.html> 
	Gettext.js</a> from beril OS.
	@requires karma.Gettext.js
	@param {Object}  options The arguments of the Gettext constructor
	@returns {Function} A generic function to call Gettext functions
	**/
	var i18nWrapper = function ( options ) {
		var gt = new Gettext( options );
		if ( typeof ( gt ) === 'undefined' )
			throw new Error("Unable to initialize Gettext object");
		return (function (str1, str2, str3, str4 ) {
			var n, context, singular, plural;
			if (typeof(str4) != 'undefined') {
				// number, context, singular, plural
				return gt.npgettext(str2, str3, str4, str1);
			} else if (typeof(str3) != 'undefined') {
				// number, singular, plural
				return gt.ngettext(str2, str3, str1);
			} else if (typeof(str2) != 'undefined') {
				// context, msgid
				return gt.pgettext(str1, str2);
			} else if (typeof(str1) != 'undefined') {
				// msgid
				return gt.gettext(str1);
			} else {
				// nothing passed in; return blank string.
				// XXX: we could error here, but that may cause more harm than good.
				return '';
			}
		});
	};
	/**
	Localises the inline html content and it creates the localised paths for 
	"images", "sounds" and "videos".
	<b>Note:</b>Inline html localisation under development<br> 
	@param {String} lang The language that will be used to localise the content
	@see <a href="http://wiki.sugarlabs.org/go/Karma/Bundle_layout">
		Karma Bundle_layout</a>
	**/
	var localiseContent = function ( lang ) {
		
		var toFix = ["images", "sounds", "videos"];
		for (var i = 0; i < toFix.length; i++) {
			that.paths[ toFix[ i ] ].localized = that.paths[ 
				toFix[ i ] ].localized.replace('\$', lang );
		}
		//dirty hack to support {lang}_AudioFile
		var prefix = lang.substring(0, 2)+"_";
		that.paths[ "sounds" ].localized+=prefix;
		that.paths[ "sounds" ].generic+=prefix;
	}
	/**
	It will attempt to load a language file, the posible languages are defined 
	on language.alternatives.
	<p>The language file type could be: .po (Pootle) or .json (JSON). The 
	precedence between file types is defined according to which is defined first 
	in supportedLangFileTypes. By default Pootle files has precedence over JSON,
	files.</p>
	@see Karma
	@returns {String} The name of the language file loaded. Example: en-US.po
	**/
	var loadAlternatives = function ( ) {
		var loaded = undefined;
		var tryNext = true;
		//try to load the po or json language file if it exists. 
		//the lang order is acording to options.language.alternatives
		//the type (po or json or ...) is defined in supportedLangFileTypes
		$.each( that.language.alternatives, function ( c, lang ) {
			for (var i=0; i < that.supportedLangFileTypes.length 
			&& tryNext === true; i++) {
				$.ajax({
					url: that.paths.po +  lang + "." + 
						 that.supportedLangFileTypes[i].ext,
					cache: true,
					dataType: "text",
					async: false, //important: touch it at your own risk
					success: function( data, textStatus ){
						
						loaded =  lang + "." + 
								  that.supportedLangFileTypes[i].ext;
						//i18n
						//we pass the data so we avoid re-loading the file
						//creates the shorcout
						that.i18n.root[ that.i18n.shortcut ] =  i18nWrapper(
							{ 
								domain 	: lang, 
								file 	: { 
										  type: that.supportedLangFileTypes[i].type, 
										  uri: this.url, data: data 
										} 
							}
						);
						localiseContent( lang );
						tryNext = false;
					},
					error: function ( XHR, textStatus, errorThrown ) {
						//the file doesn't exist or it wasn't possible to load it
						tryNext = true;
					}
				});
				return tryNext;
			}
		});
		return loaded;
	}
	//PRIVATE STUFF end
	// default options 
	var defaultOptions ={
		container:   "#karma-main",
		language:   { 
						lang: 			undefined,
						alternatives: 	['en-US', 'en'],
						countryCode: 	undefined,
						langCode:		undefined,
					},
		i18n:		{
						root: 			self, // self is global
						shortcut: 		"_"
					}
	};
	//
	this.library = { "images": [], "sounds": [], "videos":[], "shapes":[] };
	
	//initializes the defaultOptions argument
	//1 argument: string.  assume it's the container
	if ( typeof options === "string" ) {
		options = { container: options };
		options.language = getLanguage() ;
	} else if (typeof options === "object" ){
		if ( typeof options.lang === "string" ) {
			//if language is string, assume  it's the language.lang
			options.language = { lang: options.lang };
		}
	}
	$.extend( true, defaultOptions, options );
	//
	//copy defaultOptions to this, we use this.xyz instead this.defaultOptions.xyz 
	for (var i in defaultOptions ) {
		this[ i ] = defaultOptions[i];
	}
	
	//initializes i18n
	//add the localized language to the language.alternatives
	if ( typeof this.language.countryCode !== "undefined" ) {
		this.language.alternatives.unshift( 
			this.language.langCode, 
			this.language.countryCode 
		);
	}
	if ( typeof this.language.lang !== "undefined" ) {
		this.language.alternatives.unshift( this.language.lang );
	}
	//try to load the localized lang file (po or json or ...)
	this.language.fileLoaded = loadAlternatives( );
	//initializes the container
	if ( typeof this.container === "string" ) {
		this.container = $( this.container )[ 0 ];
		if ( !valid(this.container) ) delete this.container;
	}
	
	gk = {
		"paths": this.paths
	}
	this.surfaces = {};
}

/** @memberOf Karma **/
Karma.prototype.surface = function ( options ) {
	if ( !valid(options, "object") ){
		var options = { id: "ksurface-"+ (this.surfaces.length + 1 ) };
	}
	options.mainContainer = this.container;
	options.paths = this.paths;
	this.surfaces[ options.id ] = new KSurface( options ); 
	return this.surface[ options.id ];
}


/** @memberOf Karma **/
Karma.prototype.geometry = {
	/**
	Converts a value from degrees to radians.
	@param {Number} angle The angle in degrees 
	@returns {Number} The The angle in radians 
	**/
	radians : function( angle ){
		return ( angle / 180 ) * Math.PI;
	},
	/**
	@param {Number} Point Point No. 0 
	@param {Number} Point Point No. 1
	@returns {Number} The square of the Euclidian distance 
	**/
	distance2 : function ( p0, p1 ) {
		return   (p1.x - p0.x) * (p1.x - p0.x) + (p1.y - p1.y) * (p1.y - p1.y); 
	},
	/**
	Get the Euclidian (ordinary) distance between 2 points.<br>
	<b>Warning:</b> It's slower than distance2 function
	@param {Number} Point Point No. 0 
	@param {Number} Point Point No. 1
	@returns {Number} The Euclidian distance 
	**/
	distance : function ( p0, p1 ) {
		return   Math.sqrt( Karma.prototype.geometry.distance2( p0, p1 ) ); 
	}
}
/**
@memberOf Karma
@namespace Graphics functions.
**/
Karma.prototype.graphics = {
	/**
	Creates a new rectangle. It's a shortcut for calling 'new KRectangle(..)'.
	**/
	rectangle: function ( args ) { return new KRectangle( args ); },
	/**
	Creates a new circle. It's a shortcut for calling 'new KCircle(..)'.
	**/
	circle: function ( args ) { return new KCircle( args ); }
}
/**
@memberOf Karma 
@namespace Math functions.
**/
Karma.prototype.math = {
	/**
	Generates a random bumber between lower bound and upper bound inclusive.
	@param {Number} lower The lower bound
	@param {Number} upper The upper bound
	@returns {Number} The generated number
	**/
	rand : function ( lower, upper ){
		return Math.round ( Math.random() * (upper - lower) + lower );
	}
}
//
//everything inside karma.graphics is exported to karma.prototype
$.extend( Karma.prototype, Karma.prototype.graphics);
//
/**
@param {Object} [toLoad] The Object that has the arrays for preloading.
@param {Array} [toLoad.images] The images 
@param {Array} [toLoad.sounds] The sounds 
@param {Array} [toLoad.videos] The videos 
@memberOf Karma 
@returns {Object} this
**/
Karma.prototype.init = function( toLoad ) {
	this.pendingToLoad = toLoad;
	return this; //chaining :)
}

/**
Main function. Any Karma function call should be inside the callback function.
The callback function will be executed when the preloading finishes.
@param {Function} cb The callback funtion
@memberOf Karma 
@see Karma#init
**/
Karma.prototype.main = function ( cb ) {
	if ( valid( this.pendingToLoad ) ) {
		//loader
		var loaderDiv = $("body").append('<div id=\"karma-loader\">Karma is \
		loading ...<div id=\"karma-loader\" class=\"status\"></div></div>');
		var statusDiv = $("#karma-loader .status");
		
		var statusUpdate = function ( current, error, total) {
			statusDiv.html(current + "/" + total + (error > 0 ? " [ "+error+" ]":''));
		}
		
		var that = this;
		var categories = ["images", "sounds", "videos" ];
		var counters = { "loaded":0, "error": 0 };
		var totalItems = 0;
		//creates the surfaces
		if ( valid( this.pendingToLoad[ "surfaces" ] ) ) {
			$.each (this.pendingToLoad[ "surfaces" ], function( key, config ){
				Karma.prototype.surface.call( that, config );
			});
		}
		statusUpdate( 0, 0, totalItems);
		//get the total items
		for ( var i=0; i < categories.length; i++ ) {
			if ( valid ( this.pendingToLoad[ categories[ i ] ] ) ) {
				totalItems += this.pendingToLoad[ categories[ i ] ].length;
			}
		}
		
		/**
		callback to check if all the items were loaded or got an error when 
		loading
		**/
		var errors=[];
		var checkAllLoaded = function ( ev ) {
			if ( ev.type === "load") counters.loaded += 1;
			else {
				errors.push( ev.target.src );
				counters.error += 1; 
			}
			statusUpdate( counters.loaded, counters.error, totalItems);
			if ( counters.loaded + counters.error === totalItems ) {
				if ( counters.error > 0 ){
					throw ( "Images not found: " + errors );
				}
				$("#karma-loader:hiden:first").fadeOut("slow",function(){ 
					$(this).remove();});
				if ( cb ) cb();
			}
		}
		
		for ( var i=0; i < categories.length; i++ ) {
			var category = categories[ i ];
			if ( valid ( this.pendingToLoad[ category ] ) ) {
				//load all the category elements
				var type = category.substr( 0, category.length-1 )
				$.each (this.pendingToLoad[ category ], function( key, config ){
					var id = config.id;
					delete config.id;
					//register the elements into the library
					that.library[ category ][ id ] =  Karma.prototype[ type ]( 
						config
					);
					that.library[ category ][ id ].media.addEventListener(
						"load",checkAllLoaded,false
					);
					that.library[ category ][ id ].media.addEventListener(
						"error",checkAllLoaded,false
					);
				});
			}
		}
	}else {
		if ( cb ) cb();
	}
}
/**A shortcut for calling 'KImage( )'
@see KImage
@memberOf Karma 
**/
Karma.prototype.image = function ( args ) { return new KImage( args ) };
/**A shortcut for calling 'KSound( )'
@see KSound
@memberOf Karma 
**/
Karma.prototype.sound = function ( args ) { return new KSound( args ) };
/**A shortcut for calling 'KVideo( )'
@see KVideo
@memberOf Karma 
**/
Karma.prototype.video = function ( args ) { alert("Not implemented yet"); };
/**A shortcut for calling 'KGroup( )'
@see KGroup
@memberOf Karma 
**/
Karma.prototype.group = function ( args ) { return new KGroup( args ) };
/**A shortcut for calling 'KButton( )'
@see KButton
@memberOf Karma 
**/
Karma.prototype.button = function ( args ) { return new KButton( args ) };
/**
Mouse
**/
var mouse = {};
/**
Gets the 'x' and 'y' mouse coordinates relatives to the canvas  
@returns {Object} An Object with 'x' and 'y' attributes
**/
mouse.getRelativeCanvasPosition = function ( ev ) {
	if ( !ev ) return;
	var xy ={x:0, y:0};
	xy.x = ev.layerX;
    xy.y = ev.layerY;
	return xy;
}

//Events stuff
var master ={}
master.buttons =[];
var handleEvents = function( ev ) {
	var xy = mouse.getRelativeCanvasPosition( ev  );
	for (var i in master.buttons) {
		if (master.buttons[i].isPointInPath( xy.x, xy.y) ){
			master.buttons[i].onClick( ev );
		}
	}
	/*switch(ev.type){
		case "click": break;
	}*/
	/*var s="";
	for (var i in ev) {
		s+=i+"="+ev[i]+"\n";
	}
	alert(s);*/
};

/**
@returns {Object} A new class 
**/
var Class = function ( ) {
	var log="";
	var parents = [];
	for ( var i = 0; i < arguments.length; i++ ) {
		if ( arguments[i].prototype && arguments[i].init ) {
			parents.push( arguments[i].init );
		}
	}
	var o = function ( ) {
		//we inject all the init functions 
		/*for ( var i = 0; i < this.__parents.length; i++ ) {
			this.__parents[ i ].apply ( this, arguments );
		}*/
		//call the real  class init
		if ( this.init )
			this.init.apply( this, arguments );
	};

	o.prototype ={};
	var a;
	for ( var i =0; i < arguments.length; i++) {
		a = arguments[i];
		log += "**" + typeof a+"\n";
		//if ( a === "function") {
		if (a.prototype) {
			for ( var j in a.prototype ) {
				//log += j+" = "+a.prototype[j]+"\n";
				o[ j ] = o.prototype[ j ] = a.prototype [ j ];
			}
		}
		else {
		//if ( typeof a === "object") {
			for (var j in a) {
				//log += j+" = "+a[j]+"\n";
				o[ j ] = o.prototype[ j ] = a [ j ];
			}
		}
		
	}
	o.prototype.__parents = parents;
	//alert( log );
	return  o; //(function ( ) { return new o( arguments );});
};

/**
Creates a new surface
@param {object} options
@param {string} [options.id] 
@param {string | object} [options.container]
@param {number} [width=100] 
@param {number} [height=100]
@param {number} [fps=24]
@param {boolean} [visible=true]
@memberOf Karma 
**/
var KSurface = Class(
	{
		init: function( options ){
			//fix the container
			if ( valid( options.container, "string" ) && !valid( options.canvas)
			) {
				var name=options.container;
				options.container = $( options.container )[ 0 ];
				if ( !valid (options.container) ){
					// the container must be created inside the mainContainer
					if ( !valid( options.mainContainer ) ){
						throw ("You need to create the Karma master container");
					}
					var div = document.createElement("div");
					div.id = name;
					options.container=options.mainContainer.appendChild( div );
				} 
			}else {
				if ( !valid( options.mainContainer ) ){
					throw ("You need to create the Karma master container");
				}
				options.container = options.mainContainer;
			}
			
			var defaultOptions = {
				//mainContainer: '',//must be overwritten by Karma.container
				id: '',//must be overwritten by the Karma.surface OR user
				container: '', //must be overwritten by Karma.container OR user
				paths: '',	//must be overwritten by Karma.paths
				width: 100,
				height: 100,
				fps: 24,
				visible: true
			}
			$.extend( this, defaultOptions, options);
			
			if ( !this.canvas ) {
				this.canvas = document.createElement("canvas");
				this.canvas.width  = this.width; 
				this.canvas.height = this.height;
				this.canvas.id = this.id;
				this.container.appendChild( this.canvas );
			}else {
			    this.canvas = document.getElementById( options.canvas );
			    if ( !this.canvas ){
					throw new Error ("The canvas id doesn't exist");
			    }
			    this.width = this.canvas.width;
			    this.height = this.canvas.height;
			    if (!this.id){
				this.id = this.canvas.id;
			    }
			}
			if ( this.canvas.getContext ) {
				this.ctx = this.canvas.getContext("2d");
			}else {
				throw new Error ("Your browser doesn't support canvas, \
				try the newest Firefox, Safari or Google Chrome");
			}
			//events
			this.canvas.addEventListener("contextmenu", function(ev){
				//
				},false
			);
			this.canvas.addEventListener("click", 
				handleEvents,
				false
			);
		},
		/**
		Adds an event listener to the surface
		@param {string} type Event type
		@param {function} cb Function call back
		@param {boolean} [bubble=false] If the event must be captured on
			bubbling phase
		**/
		addEventListener : function ( type, cb, bubble ) {
			this.canvas.addEventListener( type, cb, bubble || false );
		},
		/**
		Removes an event listener attached to the surface
		@param {string} type Event type
		@param {function} cb Function call back
		@param {boolean} [bubble=false] If the event must be captured on
			bubbling phase
		**/
		removeEventListener : function ( type, cb, bubble ) {
			this.canvas.removeEventListener( type, cb, bubble || false );
		},
		/**
		Clears a rectangular area within the canvas
		@param {Number} [x=0] Start position of x
		@param {Number} [y=0] Start position of y
		@param {Number} [width=canvas width] Square width
		@param {Number} [height=canvas height] Square height
		**/
		clear : function ( x, y, width, height ) {
			this.ctx.clearRect(
				x || 0,
				y || 0, 
				width  || this.canvas.width, 
				height || this.canvas.height
			);
		},
		draw: function (  ) {
			
		}
	}
);

/**
Karma basic Object 
@class The basic Karma object
@param {Object} [options] Options 
@param {String} [options.localized = true] The object will be localized
@memberOf Karma 
**/
var KObject = Class(
	{
		init: function ( options ) {
			if ( valid(options.localized, "boolean" ) ) {
				this.localized = options.localized;
			}else {
				this.localized = true;
			}
		}
	}
);
/**
Graphics basic Object
@class General methods for any Graphic object
@param {Object} [options] Options 
@param {Number} [options.x = 0] The 'x' position of the object
@param {Number} [options.y = 0] The 'y' position of the object
@param {Number} [options.z = 0] The 'z' index of the object
@param {Number} [options.width = 0] The 'width' of the object
@param {Number} [options.height = 0] The 'height' of the object
@param {Boolean} [options.visible = true] Defines if the object will be visible 
	when drawing
@augments KObject
@memberOf Karma 
**/
var KGraphic = Class(
	KObject,
	{
		init: function ( options ) {
			if ( valid( options.localized ) ) 
				KObject.init.call(this, options.localized );
			var defaultOptions = {
				x : 0,
				y : 0,
				z : 0,
				width: 0,
				height: 0,
				visible : true
			}
			$.extend( this, defaultOptions, options);
		},
		/**
		@memberOf KGraphic
		Determines if the 'x' and 'y' coodinates are inside the object.
		@returns {Boolean} 'true' if the coordinates are inside or on the border
			of the object, otherwise 'false'
		**/
		isPointInPath : function( x, y ) {
			return (this.x <= x &&  (this.x + this.width) >= x && 
					this.y <= y &&  (this.y+this.width)>=y); 
		},
		addEventListener : function (type, cb, bubble) {
			//FIXME
		}
	}
);
/**
Supports multiple objects
@class 
@memberOf Karma 
**/
var KGroup = Class(
	KGraphic,
	{
		init: function ( options ) {
			this.childNodes = [];
			this.sorted = true;
		},
		/**
		@memberOf KGroup
		Adds each argument passed to the funtion to chilNodes.
		@param {Array:KGraphic} arguments The elements to add to childNodes		
		@see KGroup#draw
		**/
		appendChild : function (  ) {
			if ( arguments.length > 0 ) {
				for ( var i = 0; i< arguments.length; i++) {
					this.childNodes.push ( arguments[ i ] );
				}
				this.sorted = false;
				
			}
		},
		removeChild: function () {
			//FIXME
		},
		/**
		@memberOf KGroup
		Draws all the elements in childNodes. The elements are drawed according
		to its 'z' (z-index) value.
		@see KGroup#appendChild
		**/
		draw : function() {
			if ( this.visible && this.childNodes.length > 0 ) {
				if ( !this.sorted ) {
					this.childNodes.sort ( function ( g1, g2 ) {
						return g1.z - g2.z;
					});
					this.sorted = true;
				}
				for (var i in this.childNodes) {
					this.childNodes[ i ].draw();
				}
			}
		},
		isPointInPath : function() {
			//TODO 
		}
		
	}
);

/** @memberOf Karma **/
var KMedia = Class(
	
	KObject,
	{
		init: function (file, type, options ) {
			if ( !file || !type ) {
				throw new Error ("file and type needed");
			}
			if ( valid ( options ) ) 
				KObject.init.call (this, options);
				
			this.file = file;
			this.type = type;
			
			this.status = undefined;
			this.path = undefined;
			this.media = undefined;
			switch ( this.type ) {
				case "image": this.media = new Image(); break;
				case "sound": this.media = new Audio(); break;
				default: throw new Error ("Media type not supported"); 
			}
			this.path = gk.paths[ this.type + "s" ][ 
				this.localized ? "localized": "generic" 
			];
			this.media.src = this.src = this.path + this.file;

			var that = this;
			this.media.addEventListener("load", 
			function (e) { that.status = "loaded";}, false);
			this.media.addEventListener("error", 
			function (e) { that.status = "error";}, false);
			this.media.addEventListener("abort", 
			function (e) { that.status = "aborted";}, false);
		}
	}
);

/** @memberOf Karma **/
var KImage = Class(
	KGraphic,
	KMedia,
	{
		
		init: function ( options ) {
			if ( valid ( options, "string" ) ) {
				options = { file:options };
			}
			if ( valid( options ) ) {
				KGraphic.init.call(this, options);
				KMedia.init.call(this, options.file, "image", options );
			}
			var defaultOptions = {
				//w : undefined,
				//h : undefined,
			}
			$.extend( this, defaultOptions, options);
		},
		draw : function( ctx, x, y ) {
			if ( this.visible && this.isReady() ) {
				this.x = x || this.x;
				this.y = y || this.y;
				ctx.drawImage( this.media, this.x , this.y );
			}
		},
		isReady : function () {
			if ( !this.media.complete ) return false;
			if ( !this.media.naturalWidth || this.media.naturalWidth === 0) 
				return false;
			return true;
		}
	}
);
/**
@class_ 
@memberOf Karma 
*/
var KSound = Class(
	/**@lends_ KMedia*/
	KMedia,
	{
		init: function( options ) {
			if ( valid ( options, "string" ) ) {
				options = { file: options };
			}
			if ( valid( options ) ) {
				KMedia.init.call(this, options.file, "sound", options );
				//next line is important!
				this.media.load();
			}
		},
		isReady: function () {
			return this.readyState === 4;
		},
		play: function (){
			this.media.play();
		}
	}
);
/**@class_ 
@memberOf Karma 
*/
var KShape = Class(
	/**@lends_ KGraphic*/
	KGraphic,
	{
		init : function ( options ) {
			if ( valid( options ) ) {
				KGraphic.init.call(this, options );
			}
			var defaultOptions = {
				fill:	true,
				stroke: true,
				fillStyle: '#000',
				strokeStyle: '#000',
				openPath : false
			}
			$.extend( this, defaultOptions, options);
		},
		draw : function ( ctx ) {
			if ( this.visible ) {
				ctx.fillStyle = this.fillStyle
				ctx.strokeStyle= this.strokeStyle
					if ( this.fill )
						ctx.fill();
					if ( this.stroke )
						ctx.stroke();
					if ( !this.openPath )
						ctx.closePath();
				ctx.restore();
			}
		}
	}
);
/**@class_ */
var KRectangle = Class(
	KShape,
	{
		
		init : function ( options ) {
			//ADD multiple constructors support
			//x,y,w,h
			//w,y,w,h,options
			if ( valid( options ) ) {
				KShape.init.call(this, options );
			}
		},
		draw : function ( ctx ) {
			if ( this.visible ) {
				ctx.save();
				ctx.beginPath();
				ctx.rect( this.x, this.y, this.width, this.height);
				KShape.draw.call( this, ctx );
			}
		},
	    clear : function ( ) {
			if ( this.visible ) {
				
			}
	    }	
	}
	
);

/**@class_ */
var KButton = Class(
	/**@lends_ KGraphic*/
	KGraphic,
	{
		
		init : function ( options ) {
			//ADD multiple constructors support
			//x,y,w,h
			//w,y,w,h,options
			if ( valid( options ) ) {
				KGraphic.init.call(this, options );
			}
			this.id = options.id;
			master.buttons.push(this);
		},
		draw : function ( ) {},
		onClick : function() { } //callback
	}
);
//
/**
Karma function. It's a shotcut for calling 'new Karma(..)'
@param [options] Options passed to the Karma constructor
@returns {Object} a new Karma object
**/
$.karma = function (options) {
	var k =new Karma( options );
	//var x = new KMedia( "file1", "image", {localized: true} );
	//var x = new KImage({file: "ball.png", localized: false, z: 0});
	
	return k;
}
})(jQuery);