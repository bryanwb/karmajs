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
	
	karmaNameSpace.sounds = {
		counter : 0,
		Sound : function( file ){
			karmaNameSpace.main.append( '<audio class="audio" id="ks' + karmaNameSpace.sounds.counter +'"> </audio>' );
			
			
			//this.counter++;
			//alert(this.counter);
		}
	};
	karmaNameSpace.graphics = {
		
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
		var that={};
		
		if ( typeof container === "string" ) {
			k.main = $(container)[0]; 
		}else if ( typeof container === "object" ){ //<-- uncomplete
			k.main = container; 
		}
		
		//
		//environment
		that.background = function ( options ) {
			if(typeof options === "number") {
				$("#karma-main").css({'background-color' : "red" });
			}
		}
		that.size = function ( w, h ) {
			
			k.canvas = document.createElement("canvas");
			k.canvas.width  = k.w = w;
			k.canvas.height = k.h = h;
			k.ctx = k.canvas.getContext("2d");
			k.main.appendChild( k.canvas );
			//k.main.append('<canvas id="'+k.id+'" width="'+ k.w +'" height="'+ k.h +'">');
			
		}
		that.Image = function ( args ){
			var p={};
			var q={};
			p.img = new Image( );
			q.load = function ( file ){
				p.img.src = file;
			}
			q.display = function ( x, y ) {
				p.img.onload = function(){  
					k.ctx.drawImage(p.img,0,0);  
					p.w = p.img.width;
					p.h = p.img.height;
				}
			}
			return q;
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
