//This code loads in html for knavbar into a <section>
//tag with the id="navigation"
$(document).ready(function(){    
    
    //updates the links in knavbar
    //specific to the context
    var modify = function(){
	document.write('foo');
	$('#knavbarHome').attr('href', 'foo');
	
    };

    var foo = $('#navigation').load('chakra/kfoo.html #knavbar', modify);
    var x = 0;
});