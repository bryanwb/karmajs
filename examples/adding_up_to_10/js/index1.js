$(document).ready(function () {
    var k = $.karma({container: "#karma-main"});
y
    //k.size(200,200);

    k.init({images: [
	{id: "ball",   file: "ball.png",   localized : false },
	{id: "ballon", file: "ballon.png", localized : false },
	{id: "banana", file: "banana.png", localized : false },
	{id: "chilli", file: "chilli.png", localized : false },
	{id: "fish"  , file: "fish.png",   localized : false },
	{id: "flower", file: "flower.png", localized : false }
    ], sounds: [
	{id: "correct",  file: "correct.ogg"   },
	{id: "incorrect",file: "incorrect.ogg" }]
	   });

    var imgNames = ["ball", "balloon", "banana", "chilli", "fish", "flower" ];
    var canvases = ["leftBox", "rightBox", "bottomLeftBox", "bottomMiddleBox",
	"bottomRightBox", "timer", "scorebox", "monkey"];

    var leftCanvas = document.getElementById('left');
    var ltCtx = leftCanvas.getContext('2d');

    k.library.images[""].draw(20, 30);

});

