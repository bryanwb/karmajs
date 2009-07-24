/*
   http://wiki.sugarlabs.org/go/Karma
   Karma Framework v1.0alpha 
   under MIT license: http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt
*/
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
	
	
	$.karma=function( container ){
		

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
		
		if ( typeof container === "string" ) {
			k.main = $(container); 
		}else if ( typeof container === "object" ){ //<-- uncomplete
			k.main = container; 
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
