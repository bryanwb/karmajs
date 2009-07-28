/*
   http://wiki.sugarlabs.org/go/Karma
   Karma Framework v1.0alpha 
   under MIT license: http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt
*/
//global var for gettext
var gt;
(function($){
	
	var karmaNameSpace= {
		version : "1.0alpha",
	};
	karmaNameSpace.math = {
		rand : function ( lower, upper ){
    		return Math.round ( Math.random() * (upper - lower) + lower );
		}
	};
	karmaNameSpace.geometry = {
		Point : function ( x, y ) {
			this.x = x; 
			this.y = y;
		},
		/* *
		   2D cross product.
		   return a positive value, if OAB makes a counter-clockwise turn,
		   negative for clockwise turn, and zero if the points are collinear.
		   @param o Point
		   @param a Point 
		   @param b Point
		**/
		cross : function ( o, a, b ) {
			return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
		},
		distance2 : function ( a, b ) {
			alert("distance2");
			return   (b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y); 
		},
		distance : function ( a, b ) {
			return   Math.sqrt( this.distance2( a, b ) ); 
		}
	};
	
	
	$.karma = function( options ){
		//START of private stuff
		/**
		* localiseLanguage
		* get the language acording to the browser language
		*/
		var localiseLanguage = function () {
			var lang= navigator.language || navigator.browserLanguage; //mozilla / ie
			lang = lang.replace(/_/, '-').toLowerCase();
			if (lang.length > 3 ) {
				var country = lang.substring(3, 5);
				lang = lang.substring(0, 2);
				if ( country.match(/[^a-zA-Z]/) === null ) {
					return  lang + "-" + country.toUpperCase();
				}
				return lang;
			}
			return lang;
		}
		//privated vars
		//relative path to the po, images, sounds, etc.  from the html
		//defined here: http://wiki.sugarlabs.org/go/Karma/Bundle_layout
		var path = {
			po: "po/"
			
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
							name: 			localiseLanguage(), //|| 'en-US', 
							alternatives: 	['en-US', 'en'],
							countryCode: 	undefined,
							langCode:		undefined,
							loaded:			undefined
						},
			canvasName:  undefined,
			width:       100,
			height:      100,
			fps:		 24
		};
		//1 argument: string.  assume that it's the container
		if ( typeof options === "string" ) {
			options = { container: options };
		} else if ( options.language === "object" ) {
			//if language is string, assume that it's the language.name
			options.language = { name: options.language };
		}
		$.extend( options, defaultOptions );
		//add the localised language to the language.alternatives
		options.language.langCode = options.language.name.substr(0,2);
		if ( options.language.name.length > 2 ) {
			options.language.countryCode  = options.language.name.substr(3,5);
			options.language.alternatives.unshift( options.language.langCode, options.language.countryCode );
		}
		options.language.alternatives.unshift( options.language.name );
		//try to load the po language file if it exists. The order is acording to options.language.alternatives
		$.each(options.language.alternatives, function ( i, name ) {
			var tryNext = true;
			for (var i=0; i < supportedLangFiles.length && tryNext; i++) {
				tryNext = true;
				$.ajax({
					url: path.po + name + "." + supportedLangFiles[i].ext,
					cache: true,
					async: false, //important: touch it at your own risk
					success: function( data ){
						//call gettext 
						//we pass the data so we avoid re-loading the file
						gt = new Gettext(
							{ 
								domain 	: name, 
								file 	: { type: supportedLangFiles[i].type , uri: this.url, data: data } 
							}
						);
						tryNext = false;
					},
					error: function ( o, e, opt ) {
						//the file doesn't exist or it wasn't possible to load it
					}
				});
				
			}
			return tryNext;
		});
		
		
		
		
		
		var k={
			main: undefined,
			w: 100,
			h: 100,
			canvas: undefined,
			ctx: undefined,
			id: undefined
			
		};
		var that={
			fillStyle: undefined,
		};
		
		if ( typeof options.container === "string" ) {
			k.main = $(options.container); 
			
		}else if ( typeof options.container === "object" ){ //<-- uncomplete
			k.main = options.container; 
		}
		
		//
		//environment
		that.background = function ( options ) {
			if(typeof options === "string") {
				if (options[0]==="#") {
					k.main.css({'background-color' : options });
				}
			}
		}
		that.size = function ( w, h ) {
			
			k.canvas = document.createElement("canvas");
			k.canvas.width  = k.w = w;
			k.canvas.height = k.h = h;
			k.ctx = k.canvas.getContext("2d");
			k.main[0].appendChild( k.canvas );
			//k.main.append('<canvas id="'+k.id+'" width="'+ k.w +'" height="'+ k.h +'">');
			
		}
		//image
		that.image = function ( options ){ //todo: add path, w, h, sync
			var p={};
			var q={};
			p.img = new Image( ); //todo: [w,[h]]
			q.load = function ( file ){
				p.img.src = file;
				//while ( !p.img.complete ) ; 
			}
			q.display = function ( x, y ) {
				p.img.onload = function(){  //add: sync or async option
					k.ctx.drawImage(p.img,0,0);  
					p.w = p.img.width;
					p.h = p.img.height;
				}
			}
			return q;
		}
		//sound
		that.sound = function ( options ){
			if (typeof options === "string" ) {
				return new Audio( options );
			}else {
				return new Audio();
			}
			
		}
		//graphics
		that.rect = function ( x, y, w, h ){
			if ( w == 0 || h == 0) return;
			k.ctx.fillStyle = that.fillStyle; 
			k.ctx.beginPath();
			k.ctx.rect( x, y, w, h );
			k.ctx.fill();
			k.ctx.closePath();
		}
		
		//
		return that;
		
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
	
	$.each(karmaNameSpace, function(i) {
		//$.fn[i] = this;
		$.karma[i] = this;
	});
	
	
})(jQuery);
