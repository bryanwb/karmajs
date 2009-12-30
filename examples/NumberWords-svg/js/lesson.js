$(document).ready(
    function(){
	var k = Karma({
			  svg :[{'name':"crossword", 'domId':'crossword'}  ]
	});

	k.ready(function() {
		var root = k.svg.crossword.root;
		    $('#group1', root).addClass('foo')
			[0].onclick= function() { console.log('foo');};
		$('#group2:not(#group1)', root)[0].onclick = function() { console.log('bar');};    
		    $('#group2', root).animate({svgFill:"blue"}, 1000);

	});

    });