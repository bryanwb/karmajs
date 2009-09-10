$(document).ready(function(){
var k = $.karma ({container: "#karma-main"});
k.init({
	images: [
		{id: "ball",   file: "ball37px.png",   localized : false },
		{id: "balloon", file: "balloon.png", localized : false },
		{id: "banana", file: "banana.png", localized : false },
		{id: "chilli", file: "chilli.png", localized : false },
		{id: "fish"  , file: "fish.png",   localized : false },
	    {id: "flower", file: "flower.png", localized : false },
	    {id: "plussign", file: "plussign.png", localized : false },
	    {id: "happyMonkey", file: "happyMonkey.jpg", localized : false },
	    {id: "scorebox", file: "scorebox.png", localized : false }
	],
	surfaces: [
		{id: "card1", width:250, height:250},
		{id: "card2", width:250, height:250},
		{id: "card3", width:250, height:250},
		{id: "inline1", canvas:"inlineCanvas1"},
		{id: "inline2", canvas:"inlineCanvas2"}
	]
});

k.main(function() {
	
	
	var library = k.library;
	var surfaces  = k.surfaces;
	
	
	library.images["ball"].draw( surfaces["card1"].ctx );
	library.images["balloon"].draw( surfaces["card2"].ctx );
	library.images["banana"].draw( surfaces["card3"].ctx );
	library.images["ball"].draw( surfaces["inline1"].ctx );
	library.images["fish"].draw( surfaces["inline2"].ctx );
	
	//surfaces["inline1"].ctx.drawWindow(window, 0, 0, 100, 200, "rgb(0,0,0)");

	surfaces["inline2"].addEventListener(
		"click", 
		function(){surfaces["inline2"].clear();}
	);
	surfaces["inline1"].fillStyle("#006699").fillRect(0, 0, 150, 150);
	/*
	surfaces["inline1"].ctx.fillStyle = "#00f";
    surfaces["inline1"].ctx.fillRect(0, 0, 150, 150);
    surfaces["card1"].ctx.fillStyle = "#000";
    surfaces["card1"].ctx.fillRect(0, 0, 150, 150);*/
});
});