$(document).ready(function(){

var $text = $('#text');
var fontSize = parseInt($text.css('font-size'));

$('#zoomIn').click(
    function(){
	fontSize = fontSize + 2;
	$text.css('font-size', '' + fontSize + 'px');
    });

$('#zoomOut').click(
    function(){
	fontSize = fontSize - 2;
	$text.css('font-size', '' + fontSize + 'px');
    });

var $help = $('#kHelpText').dialog({
				      position:[ "right", "top"], 
				      modal:'true',autoOpen:false,width:500,
				      height: 400
				  });

$('#kHeaderHelpBtn').click(function(){ $help.dialog('open');});

    
});