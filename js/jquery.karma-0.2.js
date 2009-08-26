/**
* Karma Framework
* http://wiki.sugarlabs.org/go/Karma
* under MIT license: http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt
*
*
*/
(function ($) {
var Karma = function( options ) {
	var that = this;
	this.version = "0.2 alpha";
	//
	//relative path to the po, images, sounds, etc.  from the html
	//defined here: http://wiki.sugarlabs.org/go/Karma/Bundle_layout
	//localized is recalculated in tryLocalize ($ = language.lang)
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
						//localiseContent( lang );
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
		options.language = localizeLanguage() ;
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
		this.language.alternatives.unshift( this.language.langCode, this.language.countryCode );
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
	
}

//*********KObject  START ********
var KObject = function () {
	this.localized = true; //default true: all the content will be localized 
}
//*********KObject  END ********

//*********KMedia  START ********
var KMedia = function () {
	this._type = undefined;
	this._status = undefined;
	this.src = undefined;
	this.media;
}
KMedia.prototype = new KObject();
//*********KMedia  END ********


//*********KImage  START ********
var KImage = function ( options ) {
	var defaultOptions = {
		x: 	0,
		y: 	0,
		width:  0,
		height: 0
	};
	$.extend( defaultOptions, options );
	//copy defaultOptions to this
	for (var i in defaultOptions ) {
		this[ i ] = defaultOptions[ i ];
	}
}
KImage.prototype = new KMedia();
KImage.prototype.display = function ( x, y ) {

}
//*********KImage  END ********

var KClip = function ( options ) {
	var defaultOptions = {
		shapes: []
	};
	$.extend( defaultOptions, options );
	//copy defaultOptions to this
	for (var i in defaultOptions ) {
		this[ i ] = defaultOptions[ i ];
	}
	
}
//*********Karma ************************************

/**
*
**/
Karma.prototype.size = function ( w, h) {
	this.canvas = document.createElement("canvas");
	this.canvas.width  = this.width  = ( this.width  || w );
	this.canvas.height = this.height = ( this.height || h );
	if ( this.canvas.getContext ) {
		this.ctx = this.canvas.getContext("2d");
		this.container[ 0 ].appendChild( this.canvas );
	}else {
		throw new Error ("Your browser doesn't support canvas, try Firefox or Google chrome");
	}
	return this;
}

Karma.prototype.geometry = {
	radians : function( angle ){
		return ( angle / 180 ) * Math.PI;
	}
}
//
//karma wrapper, we avoid using "new"
karma = function (options) {
	return new Karma( options )
}
})(jQuery);