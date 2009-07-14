
    $(document).ready(function () {

//	var myLang = navigator.language;
//        myLang = "es-SP";

	var loadLang = function(newlocale) {
	    $('head').append('<script type="text/javascript"' +
			  'src="./locale/' + newlocale +
			  '.json"> </script>');
	    var i;
	    for (i in mylocale){
		$(':contains(' + i + '):last').html(mylocale[i]);
       	    }
	};

	//loadLang("es-SP");

	var myscore = 0;
	$('#btnYes').click(function () {
	    myscore++;
	    $("#txtScore").html("" + myscore);
	});
	$('#btnNo').click(function () {
	    myscore--;
	    $("#txtScore").html("" + myscore);
	});
	$('#btnRestart').click(function () {
	    myscore=0;
	    $("#txtScore").html("" + myscore);
	});
 
	$('#btnRTL').click(function (){
	    $('html[dir=ltr]').width() == null ? $('html').attr('dir', 'ltr') : 
		$('html').attr('dir','rtl');
	});

	$('#btnLoEN').click(function(){ loadLang("en-US");});

	$('#btnLoNE').click(function (){
	    
	});

	$('#btnLoHE').click(function (){
	    
	});

	$('#btnLoES').click(function(){loadLang("es-SP");});


	
    });

