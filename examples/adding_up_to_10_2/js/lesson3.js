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
	/*,
	sounds: [
		{id: "correct",  file: "correct.ogg"   },
		{id: "incorrect",file: "incorrect.ogg" }
	]*/
});
k.main(function() {
	var imgNames = ["ball", "ballon", "banana", "chilli", "fish", "flower" ];
	//game logic
	var total, level, time, n0, n1, correct;
	var choice=[];
	
	total = k.math.rand( 3, 9 ); //the total
	n0 = total - k.math.rand(1, total - 1 ); //first number
	n1 = total - n0; //second number
	
	for (var i=0; i<3; i++) {
		choice[ i ] = k.math.rand( 3, 9 ); // generate the 3 options
	}
	correct = k.math.rand( 0, 2 );	//chose one option (correct option) and then put the correct value into it 
	choice[ correct ] = total;
	
	var imgId = imgNames[ 0 ] ;
	var card = function ( n, minx, miny, d ) {
		var pos = [];
		var x, y, flag;
		for (var i=0; i<n; i++) {
			do {
				flag = false;
				x = minx + k.math.rand( 0, d );
				y = miny + k.math.rand( 0, d );
				for ( var j=0; j<pos.length; j++) {
					if ( k.geometry.distance2( pos[j], {"x": x, "y": y} ) < 3000 ) {
						flag = true;
						break;
					}
				}
				
			}while ( flag === true );
			pos.push( { "x":x, "y": y } );
			k.library.images[ imgId ].draw( x, y )
		}
	}
	var d=200;
	/*
	k.rect(165, 102, d, d);
	k.rect(550, 102, d, d);
	k.rect(65,  480, d, d);
	k.rect(360, 480, d, d);
	k.rect(650, 480, d, d);
	*/
	//
	card( n0 , 160, 100, d);
	card( n1 , 550, 100, d);
	card( choice[ 0 ] ,  65, 480, d);
	card( choice[ 1 ] , 360, 480, d);
	card( choice[ 2 ] , 650, 480, d);
});

});