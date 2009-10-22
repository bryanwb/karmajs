$(document).ready(function(){
  
	var canvasDrawing = $("#canvasDrawing")[0];
	var ctxDrawing    = canvasDrawing.getContext("2d"); 
	
	var canvas    =$("#canvas")[0];
	var ctx       = canvas.getContext("2d"); 
	
	var canvasTmp = $("#canvasTmp")[0]; 
	var ctxTmp    = canvasTmp.getContext("2d"); 
	ctxTmp.lineWidth = 3;
	ctxTmp.lineCap = 'round';
	
	var points=[]; //points of the quadrilateral
	
	function reset() {
		ctxDrawing.clearRect(0, 0, canvas.width, canvas.height);  
		ctxTmp.clearRect(0, 0, canvas.width, canvas.height);
		started=false;
		points=[];
	}
	
	var buttons= {
		next:{ x:510, y:135, width:30, height:30},
		prev:{ x:330, y:135, width:30, height:30}
		};
	
	//f of functions, a "place" to put functions ;)
	var f={
		drawCircle: function ( context, x, y, size){
			context.save();
			//context.translate(x,y);
			context.beginPath();
			context.fillStyle = "#cccccc"
			context.strokeStyle = "#000000" 
			context.lineWidth = 1;
			context.arc( x ,y, size, 0, Math.PI*2, true);
			context.closePath();
			context.fill();
			context.stroke();
			context.restore();
		},
		equals: function (x, y) {
			if ( x.lenght != y.length ) return false;
			for(var propertyName in x) {
				if(x[propertyName] !== y[propertyName]) {
					return false;
				}
			}
			return true;
		}
	};
	var geometry = {
		// 2D cross product.
		// return a positive value, if OAB makes a counter-clockwise turn,
		// negative for clockwise turn, and zero if the points are collinear.
		cross: function ( o, a, b ) {
			return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
		}
	};
	
	//var imgBg = document.getElementById("bg"); 	//creates the image element for background
	var imgErase = document.getElementById("btnErase");;	//creates the image element for erase button
	var imgPrev = document.getElementById("imgPrev");//creates the image element for previous button
	var imgNext = document.getElementById("imgNext");//creates the image element for next button
	
	imgNext.onmouseup = function()
	{
		$.jGrowl("next pressed");
	};
	
	imgPrev.onmouseup = function()
	{
		$.jGrowl("previous pressed");
	};
	
	imgErase.onmouseup = function()
	{
		reset();
	}
	//necessary stuff to do test the figure
	var match = false;
	function sortPoint( a, b) {
		if (a.x == b.x) return (a.y < b.y);
		return (a.x < b.x);	
	}
	function checkQuadrilateral( points ) {
		started = false;
		if ( f.equals (points[0], points[4]) === false ) {
			return false;
		} 
		points.push(points[ 1 ]); //add the second point (pos 1) to create a loop 0-1, 1-2, 2-3, 3-4, 4-1
		//slope
		var m, m0 = undefined;
		for ( var i=0; i<5; i++ ) {
			m  = (points[ (i+1)%6 ].y - points[ i ].y) / (points[ (i+1)%6 ].x - points[ i ].x);	
			if ( m === m0) {				
				return false;
			}
			m0 = m;
		}
		//clockwise or anti-clockwise ?? choose it
		var dir = geometry.cross( points[0], points[1], points[2])<=0 ? 0: 1; // get the direction
		for ( var i=2; i<5; i++ ) {
			if ( (geometry.cross( points[i-2], points[i-1], points[i]) <= 0 ?0:1) != dir) {
				return false;
			}
		}
		return true;
		
	}
		
		
		//drawing area
		ctx.fillStyle = "rgba( 111, 226, 245, 0.7)"; 
		ctx.strokeStyle = "#B74000" 
		ctx.lineWidth = 3;
		ctx.fillRect( 10, 70, 310, 150 ); 
		ctx.strokeRect( 10, 70, 310, 150 ); 
		
		//settings for the grid
		ctx.strokeStyle = "rgba( 111, 226, 245, 1)" 
		ctx.lineWidth = 1;
		//draw the row lines
		for (var i=0; i<5; i ++) {
			ctx.beginPath();
			ctx.moveTo( 330, 70 + i*15 );
			ctx.lineTo( 540, 70 + i*15 );
			ctx.closePath();
			ctx.stroke()
		}
		//draw the column lines
		for (var i=0; i<8; i ++) {
			ctx.beginPath();
			ctx.moveTo( 330 + i*30, 70  );
			ctx.lineTo( 330 + i*30, 130 );
			ctx.closePath();
			ctx.stroke()
		}
		
		
		//the dotButton definition
		var dotButton = function( valx, valy, size){
			var obj={
				x:valx, y:valy, width:size, height:size, 
				mouseup:function( ev ) {
					var p = { x:valx, y:valy };
					if ( points.length > 0 && f.equals( points[ points.length -1 ], p ) ) return;
						
					points.push( p );
				
					//clear the current line in order to adjust it
					ctxTmp.clearRect(0, 0, canvas.width, canvas.height);
					ctxTmp.beginPath();
					if ( points.length === 1) {
						ctxTmp.moveTo( valx + 7,  valy + 7 );
					} else {
						ctxTmp.moveTo(mouse.x0, mouse.y0 );
					}
					ctxTmp.lineTo(valx + 7,  valy + 7);
					ctxTmp.stroke();
					ctxTmp.closePath();
					
					
					//do updating
					ctxDrawing.drawImage(canvasTmp, 0, 0);
					
					//+7 hack, start point for the next line if any
					mouse.x0 = valx + 7;
					mouse.y0 = valy + 7;
					
					if (points.length === 5) {
						if (checkQuadrilateral( points ) === true) {
							$.jGrowl("good! ");
						}else {
							$.jGrowl("that is not a quadrilateral ");
						}
						reset();
					}
				
				}, 
				mousedown:function( ev ) { 
					ctxTmp.moveTo( mouse.x0, mouse.y0 );
					//set the default beahavior
					if (started !== true) {
						mouse.x0 = mouse.x;
						mouse.y0 = mouse.y;
						started = true;
					}
				},
				mouseover:function( ev ) { } 
			}
			return obj;
		};
	
		//draw the circles
		//buttons["dot"]=dotButton(100-25, 100-25, 50);
		//f.drawCircle( ctx, 100, 100, 25);
		for (var i=0; i<5; i++) {
			for (var j=0; j<8; j++) {
				//tricky way.. 
				buttons["dot"+i+""+j]=dotButton(10 + j*40 +15 -7, 70 + i*30 +15 -7, 14);
				f.drawCircle( ctx, 10 + j*40 +15, 70 + i*30 +15, 7);
			}
		}
		
    
	
	//clipping path, this is the drawing region
	ctxTmp.beginPath();
	ctxTmp.moveTo(10,   70);
	ctxTmp.lineTo(320,  70);
	ctxTmp.lineTo(320, 220);
	ctxTmp.lineTo(10,  220);
	ctxTmp.lineTo(10,   70);
	ctx.closePath();
	ctxTmp.clip();
	
	
	
	function distance2 ( x1, x2, y1, y2){
		return   (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1) ; 
	}
	var mouse= {x:0, y:0, x0:0, y0:0, listeners:[] };
	var started=false,counter=0;

	//drawing object	
	
	var drawing={};
	drawing.mouseup =function ( ev ) {
		//see dotButton.mouseup	
	}
	drawing.mousedown = function (ev) {
		//see dotButton.mousedown
	}
	drawing.mousemove = function (ev) {
		if (started) {
			
			ctxTmp.clearRect(0, 0, canvas.width, canvas.height);
			ctxTmp.beginPath();
			
			ctxTmp.moveTo(mouse.x0, mouse.y0);
			ctxTmp.lineTo(mouse.x,  mouse.y );
			ctxTmp.stroke();
			ctxTmp.closePath();
		}
	}
	
	function mouseHandler( ev ){
		
		mouse.x = ev.layerX ;
		mouse.y = ev.layerY;
		
		//calls the listeners if any
		$.each( mouse.listeners, function( i, val ){
			mouse.listeners[i][ev.type]( ev );
		});
		
		
		//debug="";
		$.each(buttons, function( i, val ){
			d = distance2(mouse.x, buttons[i].x + buttons[i].width/2, mouse.y, buttons[i].y + buttons[i].height/2);
			mouse.minDist=(buttons[i].width/2) * (buttons[i].height/2);
			
			if ( d <= mouse.minDist ){
				if ( ev.type==="mousemove"){
					buttons[i]["mouseover"]( ev );
				}
				else {
					buttons[i][ev.type]( ev );
				}
				
				//debug+= ev.type + " fire!";
			}
			
		});
		//$("#debug").html( debug );
	}
	
	//Karma handler (need to work around mouse out)
	canvasTmp.addEventListener('mouseup',   mouseHandler, false);
	canvasTmp.addEventListener('mousedown', mouseHandler, false);
	canvasTmp.addEventListener('mousemove', mouseHandler, false);
	
	//wiring (Karma stuff)
	//mouseHandler will call this listener :)
	mouse.listeners.push( drawing );
	
	
	
});
