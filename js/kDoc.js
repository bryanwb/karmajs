$(document).ready(function(){

var $help = $('#kHelpText').dialog({
				      position:[ "right", "top"], 
				      modal:'true',autoOpen:false,width:500,
				      height: 400
				  });

$('#kHeaderHelpBtn').click(function(){ $help.dialog('open');});

    
$('#kHeaderBackBtn').click(function(){
	console.log('foobar');
	var back = 'index.html';
	var backHash = window.location.hash;
	if (backHash){
	    back = backHash.split('#')[1];
	}
	
	window.location = back;
    }
);

$('#iframeLessonPlan').load(function(){
	
	 var iframeScale = 1.0;
	 var iframeStyle = window.frames[0].document.body.style;
	 var translateY = 0;

	 $('#zoomIn').click(
	     function(){
		 iframeScale = iframeScale + 0.1;
		 translateY = translateY + 50;
		 var scale = 'scale(' + iframeScale + ')';
		 var translate = "translate(0px, " + translateY + "px)";

		 iframeStyle.MozTransform = scale + ' ' + translate;
		 iframeStyle.WebkitTransform = scale + ' ' + translate;
 	     });
				 
	 $('#zoomOut').click(
		 function(){
		 iframeScale = iframeScale - 0.1;
		 translateY = translateY - 50;
		 
		 var scale = 'scale(' + iframeScale + ')';
		     var translate = "translate(0px, " + translateY + "px)";


		 iframeStyle.MozTransform = scale + ' ' + translate;
		 iframeStyle.WebkitTransform = scale + ' ' + translate;

		 });
    
	});

Karma.scaleToViewport();
		      

});