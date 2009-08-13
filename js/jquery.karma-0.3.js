/**
* Karma Framework
* http://wiki.sugarlabs.org/go/Karma
* under MIT license: http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt
*
*
*/



//(function ($) {
var Karma = function( options ) {
	var that = this;
	this.version = "0.2 alpha";
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
	this.supportedLangFiles = [ 
		{ ext: "po",   type: 'application/x-po' },
		{ ext: "json", type: 'application/json'}
	];
	//
	//PRIVATE STUFF start
	/**
	* getLanguage
	* get the language acording to the browser language
	*/
	var getLanguage = function () {
		//console.log +=  navigator.language +"\n";
		var lang = navigator.language || navigator.browserLanguage; //mozilla / ie
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
	*i18nWrapper
	*creates a new Gettext object and returns a shortcut function to translate strings
	*/
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
	*
	*/
	var localiseContent = function ( lang ) {
		
		var toFix = ["images", "sounds", "videos"];
		for (var i = 0; i < toFix.length; i++) {
			that.paths[ toFix[ i ] ].localized = that.paths[ toFix[ i ] ].localized.replace('\$', lang );
		}
	}
	/**
	*
	*/
	var loadAlternatives = function ( ) {
		var loaded = undefined;
		var tryNext = true;
		//try to load the po or json language file if it exists. 
		//the lang order is acording to options.language.alternatives
		//the type (po or json or ...) is defined in supportedLangFiles
		$.each( that.language.alternatives, function ( c, lang ) {
			for (var i=0; i < that.supportedLangFiles.length && tryNext === true; i++) {
				$.ajax({
					url: that.paths.po + lang + "." + that.supportedLangFiles[i].ext,
					cache: true,
					dataType: "text",
					async: false, //important: touch it at your own risk
					success: function( data, textStatus ){
						
						loaded =  lang + "." + that.supportedLangFiles[i].ext;
						//i18n
						//we pass the data so we avoid re-loading the file
						//creates the shorcout
						that.i18n.root[ that.i18n.shortcut ] =  i18nWrapper(
							{ 
								domain 	: lang, 
								file 	: { 
											type: that.supportedLangFiles[i].type , 
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
					},
		canvas:  	undefined,
		width:      100,
		height:     100,
		fps:		24
	};
	//
	this.output={ 
		language: 	{	 },
		library:	{ images: [], sounds: [], videos:[], shapes:[] }
	};
	
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
	this.output.language.loaded = loadAlternatives( );
	//

	//initializes the container
	if ( typeof this.container === "string" ) {
		this.container = $( this.container );
	}
	//
	gk = {
		"paths" : this.paths,
		"container" : this.container
	}
}

/**
*
**/
Karma.prototype.size = function ( w, h) {
	this.canvas = document.createElement("canvas");
	
	this.canvas.width  = this.width  = ( w || this.width );
	this.canvas.height = this.height = ( h || this.height);
	if ( this.canvas.getContext ) {
		this.ctx = this.canvas.getContext("2d");
		this.container[ 0 ].appendChild( this.canvas );
	}else {
		throw new Error ("Your browser doesn't support canvas, \
		try Firefox or Google chrome");
	}
	gk.canvas = this.canvas;
	gk.ctx = this.ctx;
	
	return this;
}

Karma.prototype.geometry = {
	radians : function( angle ){
		return ( angle / 180 ) * Math.PI;
	}
}
Karma.prototype.init = function( array ) {
	//this.pendingToLoad = array;
}
Karma.prototype.main = function ( cb ) {
	if ( this.pendingToLoad ) {
		
	}else {
		if ( cb ) cb();
	}
}

//helper

var valid = function ( arg, type, ret ) {
	if ( type ) {
		if ( typeof arg === type ) return ret || true;
		return false
	}
	if ( typeof arg !== "undefined" ) return true;
	return false;
}


//
//karma wrapper, we avoid using "new"
$.karma = function (options) {
	var k =new Karma( options );
	//
	/*
	* Master Class creator
	*supports multiple inheritance, warning it's NOT optimal
	*/
	 Class = function ( ) {
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
	}
	 kObject = Class(
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
	 KGraphic = Class(
		kObject,
		{
			init: function ( options ) {
				if ( valid( options.localized ) ) 
					kObject.init.call(this, options.localized );
				var defaultOptions = {
					x : 0,
					y : 0,
					z : 0,
					visible : true
				}
				$.extend( this, defaultOptions, options);
			},
			isPointInPath : function() {},
			draw : function() {}
			
		}
	);
	
	 KGroup = Class(
		KGraphic,
		{
			init: function ( options ) {
				this.childNodes = [];
				this.sorted = true;
			},
			add : function ( o ) {
				this.childNodes.push ( o );
				this.sorted = false;
			},
			
			draw : function() {
				if ( this.childNodes.length > 0 ) {
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
			isPointInPath : function() {}
			
		}
	);
	 KMedia = Class(
		kObject,
		{
			init: function (file, type, options ) {
				if ( !file || !type ) {
					throw new Error ("file and type needed");
				}
				if ( valid ( options ) ) 
					kObject.init.call (this, options);
					
				this.file = file;
				this.type = type;
				
				this.status = undefined;
				this.path = undefined;
				this.media = undefined;
				switch ( this.type ) {
					case"image": this.media = new Image(); break;
					case "sound": this.media = new Sound(); break;
					default: throw new Error ("Media type not supported"); 
				}
				this.path = gk.paths[ this.type + "s" ][ this.localized ? "localized": "generic" ];
				this.media.src = this.src = this.path + this.file;
				this.media.addEventListener("onload", function (e) { alert("ok"); }, false);
				
				/*that.media.addEventListener( "onload",  function (e) { alert("l");  }, false )
				this.media.addEventListener( "onerror",  function (e) { alert("e"); }, false )
				this.media.addEventListener( "onabort",  function (e) { alert("a"); }, false )
				*/
			},
			
		}
	);
	 KImage = Class(
		KGraphic,
		KMedia,
		{
			init: function ( options ) {
				if ( valid (options, "string") ) {
					options = { file:options };
				}
				if ( valid( options ) ) {
					KGraphic.init.call(this, options);
					KMedia.init.call(this, options.file, "image", options );
				}
				var defaultOptions = {
					w : undefined,
					h : undefined,
				}
				$.extend( this, defaultOptions, options);
			},
			isPointInPath : function() {},
			draw : function( x, y ) {
				if ( this.isLoaded() ) {
					this.x = x || this.x;
					this.y = y || this.y;
					gk.ctx.drawImage( this.media, this.x , this.y );
				}
			},
			isLoaded : function () {
				if ( !this.media.complete ) return false;
				if ( !this.media.naturalWidth || this.media.naturalWidth === 0) 
					return false;
				return true;
			}
		}
	);
	
	
	
	var aImage = function( ) {
				this.x=0;
				this.y=0;
				this.media = new Image();
				this.media.src= "assets/generic/images/ball.png";
				var that = this;
				/*this.media.onload = function() {
					gk.ctx.drawImage (that.media, 0, 0);
				}
				this.media.addEventListener( "load", function (e) { alert("ok");}, false);*/

	}
	aImage.prototype.draw = function( x, y ) {
				if ( this.isLoaded() ) {
					
					this.x = x || this.x;
					this.y = y || this.y;
					gk.ctx.drawImage( this.media, this.x , this.y );
				}
			}
	aImage.prototype.isLoaded = function () {
				if ( !this.media.complete ) return false;
				if ( !this.media.naturalWidth || this.media.naturalWidth === 0) 
					return false;
				return true;
			}
	//var x= new KGraphic( {localized: true })
	//var x = new KMedia( "file1", "image", {localized: true} );
	//var x = new KImage({file: "ball.png", localized: false, z: 0});
	//alert (x.localized)
	
	
	k.size(500,500);

	var img1 = new aImage();
	img1.x=200;
	img1.y=300;
	img1.media.addEventListener("load", function (e) {img1.draw();}, false);
	
	


	k.image = function ( args ) { return new KImage( args ) };
	k.group = function ( args ) { return new KGroup( args ) };
	
	return k;
}
//})(jQuery);