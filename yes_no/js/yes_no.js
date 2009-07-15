
    $(document).ready(function () {

	var myLang = navigator.language;
        myLang = "es-SP";

	var params = { "domain" : "en-US",
	    "locale_data" : json_locale_data
		     };

	gt = new Gettext(params);
        
	function _ (msgid) {
	    return gt.gettext(msgid);
	}


	var loadLang = function(newlocale) {
	    $('head').append('<script type="text/javascript"' +
			  'src="./locale/' + newlocale +
			  '.json"> </script>');
	    
	    var locale_data = json_locale_data[newlocale];
	    for (var i in locale_data){
		if ( i !== ""){
		    $(':contains(' + i + '):last').html(locale_data[i][1]);
		}
       	    }
	};



	loadLang("es-SP");

	// testing out getting strings from code
	$('#btnLoHE').text(_("Not Hebrew"));  


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

