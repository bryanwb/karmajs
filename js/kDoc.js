$(document).ready(
    function(){

	var back = 'index.html';

	var parseUrlParams = function(){
	    var doc = '';
	    var params = window.location.search.slice(1).split('&');
	    if (params){
		back = params[0].split('=')[1];
		doc = params[1].split('=')[1];
	    }

	    $('#iframeLessonPlan').attr('src', "" + doc + ".html");
	};

	var $kHeader = $('#kHeader').kHeader({title:"Lesson Plan", zoom: true});
		
	
	$('#kHeaderBackBtn').click(function(){ window.location = back; });

	parseUrlParams();
	Karma.scaleToViewport();
});