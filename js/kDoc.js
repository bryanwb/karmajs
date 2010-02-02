$(document).ready(
    function(){

	var back = 'index.html';


	var $help = $('#kHelpText').dialog({
		position:[ "right", "top"], 
		modal:'true',autoOpen:false,width:500,
		height: 400
		});

	var parseUrlParams = function(){
	    
	    var doc = '';
	    var params = window.location.search.slice(1).split('&');
	    if (params){
		back = params[0].split('=')[1];
		doc = params[1].split('=')[1];
	    }

	    $('#iframeLessonPlan').attr('src', "" + doc + ".html");
	};

	parseUrlParams();
		
	$('#kHeaderHelpBtn').click(function(){ $help.dialog('open');});

	
	$('#kHeaderBackBtn').click(function(){
				       window.location = back;
				   });

	$('#iframeLessonPlan').load(
	    function(){
		
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