$(document).ready(function(){

  
	var canvasDrawing = $("#canvasDrawing")[0];
	var ctxDrawing    = canvasDrawing.getContext("2d"); 
	
	var canvas    =$("#canvas")[0];
	var ctx       = canvas.getContext("2d"); 
	
	var canvasTmp = $("#canvasTmp")[0]; 
	var ctxTmp    = canvasTmp.getContext("2d"); 
	
	
	var path={
		images: "images/"
	};
	//
	var points=[]; //points of the quadrilateral
	var comb=[ {x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}];
	function reset() {
		ctxDrawing.clearRect(0, 0, canvas.width, canvas.height);  
		ctxTmp.clearRect(0, 0, canvas.width, canvas.height);
		started=false;
		points=[];
	}
	//
	var buttons= {
		next:{ x:510, y:135, width:30, height:30, 
			mouseup:function( ev ) {alert("next pressed");}, 
			mousedown:function( ev ) { },
			mouseover:function( ev ) { }  
			},
		prev:{ x:330, y:135, width:30, height:30, 
			mouseup:function( ev ) {alert("prev pressed");}, 
			mousedown:function( ev ) { },
			mouseover:function( ev ) { } 
			},
		erase:{ x:10, y:230, width:70, height:24, 
			mouseup:function( ev ) { 
			 	reset();
			},
			mousedown:function( ev ) {},
			mouseover:function( ev ) {
				imgErase.src= path.images + "eraseOver.png";
				imgErase.onload = function(){
					ctx.drawImage( imgErase, 10, 230 );
					ctx.font = "bold 13px sans-serif";
					ctx.fillStyle = "#000000";
					ctx.fillText ( "Erase", 25, 245 );
				}
			
			}
		}
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
		SegSegInt: function  ( a, b, c, d) {
			var s,t,num,den;
			den = a.x * (d.y - c.y) + b.x * (c.y - d.y) + d.x * (b.y - a.y) - c.x * (a.y -b.y);
			if (denom<=0.1) return false;
			num = a.x * (d.y - c.y) + c.x * (a.y - d.y) + d.x * (c.y - a.y);
			s= num / den;
			num = - ( a.x * (c.y -b.y) + b.x*(a.y-c.y) + c.x*(b.y -a.y));
			t= num / den;
			return ( 0.0<=s && s<=1.0 && 0.0<=t && t <=1.0);
 
		}
	};
	
	
	var imgBg = new Image(); 	//creates the image element for background
	var imgErase = new Image();	//creates the image element for erase button
	var imgPrev = new Image();	//creates the image element for previous button
	var imgNext = new Image();	//creates the image element for next button

	imgBg.src = path.images + "bg.png";
	//imgBg.onload = function(){
		//ctx.drawImage( imgBg, 0, 0 );
				
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
					points.push( {x:valx, y:valy} );
				
					if (points.length==5) {
						if ( !(points[0].x===points[4].x && points[0].y===points[4].y) ){ 
							alert("that's not a quadrilateral"); 
							
						}
						
						var match;
						// match ? 
						for ( var i=0,lim; i<4; i++) {
							lim=i+4;
							for ( var j=i , k=0; j<lim; j++,k++){
								comb[k]=points[ j%4 ];
							}
							for ( var j=0; j<4;j++){
								match=true;
								if ( !(points[j].x===comb[j].x && points[j].y===comb[j].y) ){
									match=false;
									break;
								}
							}
							if ( match===true ) {
								var c="";
								for ( var j=0; j<4;j++){
									c+="("+points[j].x+","+points[j].y+") ";
								}
								c+="\n";
								for ( var j=0; j<4;j++){
									c+="("+comb[j].x+","+comb[j].y+") ";
								}
								c+="\n"+i;
								//alert(c);
							}
						}
						reset();
					}	
					

					mouse.x0 = ev.layerX;
					mouse.y0 = ev.layerY;
					
					//do updating
					ctxDrawing.drawImage(canvasTmp, 0, 0);
					ctxTmp.clearRect(0, 0, canvas.width, canvas.height);
					
				
				}, 
				mousedown:function( ev ) { 
					ctxTmp.moveTo( mouse.x, mouse.y );
					//set the default beahavior
					if (started !==true) {
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
    //}	

	
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
	var mouse= {x:0, y:0, x0:0, y0:0, minDist:0, listeners:[] };
	var debug,d;
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
			$("#debug").html( mouse.x +" "+mouse.y );
			ctxTmp.clearRect(0, 0, canvas.width, canvas.height);
			ctxTmp.lineWidth = 2;
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
			//debug+="<br>"+i+" d="+ d +" <="+mouse.minDist;
			//(buttons[i].width/2) * (buttons[i].height/2)
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
	/*
	//deprecated
	canvasTmp.addEventListener('mouseup',   onMouseUp,   false);
	canvasTmp.addEventListener('mousedown', onMouseDown, false);
    canvasTmp.addEventListener('mousemove', onMouseMove, false);
	*/
	//Karma handler (need to work around mouse out)
	canvasTmp.addEventListener('mouseup',   mouseHandler, false);
	canvasTmp.addEventListener('mousedown', mouseHandler, false);
	canvasTmp.addEventListener('mousemove', mouseHandler, false);
	
	//wiring (Karma stuff)
	//mouseHandler will call this listener :)
	mouse.listeners.push( drawing );
	
	
	
});