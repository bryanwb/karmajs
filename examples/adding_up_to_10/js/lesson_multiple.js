$(document).ready(function(){
var k = $.karma ({container: "#karma-main"});
k.layer( {id:"card1", width:250, height:250} ), 
k.layer( {id:"card2", width:250, height:250} ),
k.layer( {id:"card3", width:250, height:250} )

k.init({
	images: [
		{id: "ball",   file: "ball.png",   localized : false },
		{id: "ballon", file: "ballon.png", localized : false },
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
	library.images["ballon"].draw( layers["card2"].ctx );
	library.images["banana"].draw( layers["card3"].ctx );
});
});