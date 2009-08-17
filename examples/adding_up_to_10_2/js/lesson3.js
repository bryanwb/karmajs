$(document).ready(function(){

var k = $.karma ({container: "#karma-main", lang: "es-MX"});
k.size(1200, 800);
k.init({
	images: [
		{id: "ball",   file: "ball.png",   localized : false },
		{id: "ballon", file: "ballon.png", localized : false },
		{id: "banana", file: "banana.png", localized : false },
		{id: "chilli", file: "chilli.png", localized : false },
		{id: "fish"  , file: "fishx.png",   localized : false },
		{id: "flower", file: "flower.png", localized : false }
	]
	,
	sounds: [
		{id: "correct",  file: "correct.ogg"   },
		{id: "incorrect",file: "incorrect.ogg" }
	]
});
k.main(function() {
	var imgNames = ["ball", "ballon", "banana", "chilli", "fish", "flower" ];
	//game logic
	var total, level=0, time, n0, n1, correct;
	var choice=[];
	
	total = k.math.rand( 3, 9 ); //the total
	n0 = total - k.math.rand(1, total - 1 ); //first number
	n1 = total - n0; //second number
	
	for (var i=0; i<3; i++) {
		choice[ i ] = k.math.rand( 3, 9 ); // generate the 3 options
	}
	//chose one option (ONE correct option) and then put the correct value into it 
	correct = k.math.rand( 0, 2 );	
	choice[ correct ] = total;
	
	var imgId = imgNames[ level ] ;
	var maskd=250;
	var card = function ( n, minx, miny, d ) {
		gk.ctx.save();
		k.rectangle({x:minx, y:miny, width:maskd, height:maskd,
			stroke:false,fill:false}).draw();
		//do the clip
		gk.ctx.clip();
		var pos = [];
		var x, y, flag;
		for (var i=0; i<n; i++) {
			do {
				flag = false;
				x = minx + k.math.rand( 0, d );
				y = miny + k.math.rand( 0, d );
				for ( var j=0; j<pos.length; j++) {
					if ( k.geometry.distance2( pos[j], {"x": x, "y": y} ) 
					< 4000 ) {
						flag = true;
						break;
					}
				}
				
			}while ( flag === true );
			pos.push( { "x":x, "y": y } );
			k.library.images[ imgId ].draw( x, y )
		}
		
		gk.ctx.restore();
	}
	
	//put the cards
	d=200;
	card( n0 , 160, 100, d);
	card( n1 , 550, 100, d);
	card( choice[ 0 ] ,  65, 480, d);
	card( choice[ 1 ] , 360, 480, d);
	card( choice[ 2 ] , 650, 480, d);
	
});

});