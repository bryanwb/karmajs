/*
   http://wiki.sugarlabs.org/go/Karma
   Karma Framework v1.0alpha 
   under MIT license: http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt
*/
//
//var console = { log:""};
(function($){
	
	
	
	
	
	$.karma = function( options ){
		//START of private stuff
		/**
		* localizeLanguage
		* get the language acording to the browser language
		*/
		var localizeLanguage = function () {
			//console.log +=  navigator.language +"\n";
			var lang = navigator.language || navigator.browserLanguage; //mozilla / ie
			lang = lang.replace(/_/, '-').toLowerCase();
			if (lang.length > 3 ) {
				var country = lang.substring(3, 5);
				lang = lang.substring(0, 2);
				if ( country.match(/[^a-zA-Z]/) === null ) {
					country = country.toUpperCase();
					return  { "lang": lang + "-" + country, "langCode": lang, "countryCode": country };
				}
			}
			return { "lang": lang };
		}
		/**
		*i18n
		*i18n wrapper, creates a new Gettext object and returns a shortcout 'i18n' to translate that elements
		*/
		var i18n = function ( options ) {
			var gt = new Gettext( options );
			if ( typeof ( gt ) === 'undefined' )
				throw new Error("Unable to initialize Gettext object");
			var i18n = function (str1, str2, str3, str4 ) {
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
			}
			return i18n;
		};
		/**
		*
		*/
		var localiseContent = function ( lang ) {
			var toFix = ["images", "sounds", "videos"];
			for (var i = 0; i < toFix.length; i++) {
				path[ toFix[ i ] ].localized = path[ toFix[ i ] ].localized.replace('\$', lang );
			}
		}
		/**
		*
		*/
		var tryLocalize = function ( ) {
			var loaded = undefined;
			var tryNext = true;
			//try to load the po or json language file if it exists. 
			//the lang order is acording to options.language.alternatives
			//the type (po or json or ...) is defined in supportedLangFiles
			$.each( options.language.alternatives, function ( c, lang ) {
				for (var i=0; i < supportedLangFiles.length && tryNext === true; i++) {
					$.ajax({
						url: path.po + lang + "." + supportedLangFiles[i].ext,
						cache: true,
						dataType: "text",
						async: false, //important: touch it at your own risk
						success: function( data, textStatus ){
							
							loaded =  lang + "." + supportedLangFiles[i].ext;
							//i18n
							//we pass the data so we avoid re-loading the file
							//creates the shorcout
							options.i18n.root[ options.i18n.shortcout ] =  i18n(
								{ 
									domain 	: lang, 
									file 	: { type: supportedLangFiles[i].type , uri: this.url, data: data } 
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
		
		
		
		
		//
		//relative path to the po, images, sounds, etc.  from the html
		//localized is recalculated in tryLocalize
		//defined here: http://wiki.sugarlabs.org/go/Karma/Bundle_layout
		var path = {
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
		var supportedLangFiles = [ 
			{ ext: "po",   type: 'application/x-po' },
			{ ext: "json", type: 'application/json'}
		];
		//END of private stuff
		
		// default options 
		var defaultOptions ={
			container:   undefined,
			language:   { 
							lang: 			undefined,
							alternatives: 	['en-US', 'en'],
							countryCode: 	undefined,
							langCode:		undefined,
							loaded:			undefined		//private
						},
			i18n:		{
							root: 			self,
							shortcout: 		"_"
						},
			canvasName:  undefined,
			width:       100,
			height:      100,
			fps:		 24
		};
		var k = {
			container: undefined,
			w: 100,
			h: 100,
			canvas: undefined,
			ctx: undefined,
			id: undefined,
			fillStyle: undefined,
			
		};
		var output={ 
			language: 	{	 },
			library:	{ images: [], sounds: [], videos:[], shapes:[] }
		};
		//1 argument: string.  assume that it's the container
		if ( typeof options === "string" ) {
			options = { container: options };
		} else {
			if ( typeof options.language === "string" ) {
				//if language is string, assume that it's the language.lang
				defaultOptions.language.lang = options.language ;
			}else {

				$.extend( defaultOptions.language, localizeLanguage() );
			}
		}
		
		$.extend( options, defaultOptions );

		//add the localized language to the language.alternatives
		if ( typeof options.language.countryCode !== "undefined" ) {
			options.language.alternatives.unshift( options.language.langCode, options.language.countryCode );
		}
		if ( typeof options.language.lang !== "undefined" ) {
			options.language.alternatives.unshift( options.language.lang );
		}
		//try to load the localized lang file (po or json or ...)
		
		output.language.loaded = tryLocalize( );
		
		//*************************************
		/**
		*
		*
		*/
		var KObject = function() {
			
			this.localized = true;
			
		}
		var Shape = function() {
			this.x = 0;
			this.y = 0;
			
			this.shapes = [];
			this.images = [];
		}
		Shape.prototype = new KObject();
		
		Shape.prototype.draw = function () {
			
		}

		
		var KImage =function ( options ) { //todo: add path, w, h, sync
			/*if (typeof options === "undefined" || typeof options.file === "undefined" ) {
				throw new Error("Unable to initialize KImage");
			}*/
			//private functions
			var that = this;
			this.parse= function( file ){
				//alert("okj");
				return this.localized === true ? 
						  path.images.localized + file : 
						  path.images.generic + file;
			}
			//
			if (typeof options.localized === "boolean" ) {
				this.localized = options.localized;
			}
			
			this.type = "image"
			this._status = undefined;
			this.src  =  this.parse(options.file);
			this.x = 0;
			this.y = 0;
			//callbacks
			this.callbacks = options.callbacks || [] ;
			//
			//img stuff
			this.img = new Image();
			this.img.src = this.src;
			this._status = "loading";
			
			this.img.onerror = function () {
				that._status = "error";
				that.onerror();
			}
		}
		KImage.prototype = new KObject();
		
		KImage.prototype.onload = function  ( cb ) {  
			this.img.onload = function () {
				this._status = "loaded";
				if (typeof cb === "function" ) cb(); 
			}

		}
		KImage.prototype.onerror = function  (  ) { }
		KImage.prototype.display = function  ( x, y ) {	
			if ( this.img.complete === true ) {
				k.ctx.drawImage( this.img, x || this.x, y || this.y );  
			}else {
				
				//throw new Error("Error on drawing the image" + this.src );
			}
		}
		KImage.prototype.status  = function  ( ) {
			return this._status;
		}
		//
		var KSound = function( options ) {
			
			if (typeof options === "string" ) {
				//return new Audio( options );
				return new Audio( options );
			}else {
				return new Audio();
			}
		}
		KSound.prototype = new KObject();
		
		var TimeLine = function (  ) {
			this.fps = defaultOptions.fps || fps;
			this.paused = false;
			this.frame = 0;
			
			//
			this.shapes = [];
			this.sounds = [];
			this.timelines = [];
			//
			this.keys = [  ]; //frame, 
		}
		TimeLine.prototype.pause = function() { 
			this.paused = true;
		}
		TimeLine.prototype.play = function() {
			if ( this.paused === false ) {
				this.draw( frame );
			}
		}
		TimeLine.prototype.draw = function() {
			for( var i=0; i<this.shapes.length; i++){
				this.shapes[ i ].draw();
			}
		}
		//
		if ( typeof options.container === "string" ) {
			k.container = $(options.container); 	
		}else if ( typeof options.container === "object" ){ //<-- uncomplete
			k.container = options.container; 
		}
		
		//
		
		//environment
		output.init = function ( items ) {
			
			var counter = 0;
			var checkAllLoaded = function() {
				counter++;
				if (counter == items["images"].length )  {//+ items["sounds"].length
					
					for (var i in output.library.images) {
						
						//output.library.images[i].display();
						
					}
					k.masterCb();
				}
			}
			
			$.each ( items["images"], function ( key, val ) {
				output.library.images[ val.id ] = output.image( { file: val.file, localized: val.localized } );
				output.library.images[ val.id ].onload( checkAllLoaded );
			});
			
		}
		
		output.draw = function ( cb ) {
			k.masterCb = cb;
		}
		output.background = function ( options ) {
			if(typeof options === "string") {
				if (options[0]==="#") {
					k.container.css({'background-color' : options });
				}
			}
		}
		output.size = function ( w, h ) {
			k.canvas = document.createElement("canvas");
			k.canvas.width  = k.w = w;
			k.canvas.height = k.h = h;
			k.ctx = k.canvas.getContext("2d");
			k.container[0].appendChild( k.canvas );
			//k.container.append('<canvas id="'+k.id+'" width="'+ k.w +'" height="'+ k.h +'">');
		}
		//shape
		output.shape = function ( options ){ 
			return new KShape( options );
		}
		//image
		output.image = function ( options ){ 
			return new KImage( options );
		}
		//sound
		output.sound = function ( options ){
			return new KSound( options );
		}
		//math
		output.math = {
			rand : function ( lower, upper ){
				return Math.round ( Math.random() * (upper - lower) + lower );
			}
		}
		//geometry
		output.geometry = {
			distance2 : function ( a, b ) {
				return   (b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y); 
			},
			distance : function ( a, b ) {
				//return   Math.sqrt( this.distance2( a, b ) ); 
			}
		}
		//graphics
		
		output.rect = function ( x, y, w, h ){
			if ( w == 0 || h == 0) return;
			k.ctx.beginPath();
			k.ctx.fillStyle = "#006699";//k.fillStyle; 
			k.ctx.rect( x, y, w, h );
			k.ctx.fill();
			k.ctx.closePath();
		}
		
		//
		return output;
		
	};
	/*$.fn.extend({
		karma : function( id ) {
		//if (id===undefined) return ;		
			return this.each(function() {
				if ( this.getContext !== undefined) {
					ctx = this;
				}
			});
		}
	});*/
	
	/*$.each(karmaNameSpace, function(i) {
		//$.fn[i] = this;
		$.karma[i] = this;
	});*/
	
	
})(jQuery);
