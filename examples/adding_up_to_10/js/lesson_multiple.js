$(document).ready(function(){
var k = $.karma ({container: "#karma-main"});
k.layer( {id:"inline1", canvas:"inlineCanvas1"} );
k.layer( {id:"inline2", canvas:"inlineCanvas2"} );
k.layer( {id:"card1", width:250, height:250} ); 
k.layer( {id:"card2", width:250, height:250} );
k.layer( {id:"card3", width:250, height:250} );

k.init({
	images: [
		{id: "ball",   file: "ball.png",   localized : false },
		{id: "balloon", file: "balloon.png", localized : false },
		{id: "banana", file: "banana.png", localized : false },
		{id: "chilli", file: "chilli.png", localized : false },
		{id: "fish"  , file: "fish.png",   localized : false },
	    {id: "flower", file: "flower.png", localized : false },
	    {id: "plussign", file: "plussign.png", localized : false },
	    {id: "happyMonkey", file: "happyMonkey.jpg", localized : false },
	    {id: "scorebox", file: "scorebox.png", localized : false }
	]
	,
	sounds: [
		{id: "correct",  file: "correct.ogg"   },
		{id: "incorrect",file: "incorrect.ogg" }
	]
});
k.main(function() {
	var [library, layers ] = [k.library, k.layers];
	library.images["ball"].draw( layers["card1"].ctx );
	library.images["balloon"].draw( layers["card2"].ctx );
	library.images["banana"].draw( layers["card3"].ctx );
	library.images["ball"].draw( layers["inline1"].ctx );
	library.images["fish"].draw( layers["inline2"].ctx );
	

	layers["inline2"].addEventListener(
		"click", 
		function(){layers["inline2"].clear();}
	);
    layers["inline2"].ctx.fillStyle = "#000";
    layers["inline2"].ctx.fillRect(0, 0, 150, 150);
    layers["card2"].ctx.fillStyle = "#000";
    layers["card2"].ctx.fillRect(0, 0, 150, 150);
    
	
});
});