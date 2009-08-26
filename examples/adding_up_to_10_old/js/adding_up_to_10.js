$(document).ready(function(){
  
	var canvasDrawing = $("#canvasDrawing")[0];
	var ctxDrawing    = canvasDrawing.getContext("2d"); 
	
	var canvas    =$("#canvas")[0];
	var ctx       = canvas.getContext("2d"); 
	
	
	var path={
		images: "images/"
	};
	
	//f of functions, a "place" to put functions ;)
	var f= {
		rand: function ( lower, upper){
    		return Math.round ( Math.random() * (upper - lower) + lower );
		} 
	
	}
    //logic game
    var total, n0, n1, correct;
    var choice=new Array();
    
    total = f.rand( 3, 9 ); //the total
    n0 = total - f.rand(1, total - 1 ); //first number
    n1 = total - n1; //second number
	
	for (var i=0; i<3; i++) {
		choice[ i ] = f.rand( 3, 9 ); // generate the 3 options
	}
	correct = f.rand( 0, 2 );	//chose one option (correct option) and then put the correct value into it 
	choice[ correct ] = total;
	
	//
	var lang, gt;
	var supportedLangs = [ "en-US", "es-MX", "ne-NE", "he-IL"];
	function init( userLang ) {
		if (userLang===undefined)  {
			lang = $.localise.defaultLanguage.substr(0,2);
			for (var i=0; i < supportedLangs.length; i++) {
				if (supportedLangs[i].substr(0,2) == lang ) {
					lang = supportedLangs[i];
					$("input[@name='langSelector']:eq("+ i +")").attr("checked", true); 
					break;
				}
			}
		}else {
			lang = userLang;	
		}
		gt = new Gettext({ 'domain' : lang });
	
		//debug info	
		var l= ["choose an option", "Time", "Level", "Restart"];
		var s="";
		$.each( l, function( i, val ){
			s+=val+": "+ gt.gettext( val ) + "<br/>";
		});
		$("#debug").html( s );
		
		//
	}
	
	$(":input[@name='langSelector']").change(function(){	
		init ( $("input[@name='langSelector']:checked").val() );
	});
	
	init();
	
});
