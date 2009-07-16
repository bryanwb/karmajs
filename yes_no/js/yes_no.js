
$(document).ready(function () {
    
    function _ (msgid) {
	return gt.gettext(msgid);
    }

    var params = { "domain" : "en-US",
	    "locale_data" : json_locale_data
		     };

    var gt = new Gettext(params);
       

    var audio = $('audio').load();

    var localize = function (newlocale) {

	
	var loadLang = function(newlocale) {
	    //loads the .json file that holds the strings 
	    //for the particular locale
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

	var loadSounds = function(newlocale) {
	    
	};

	var loadImages = function(newlocale) {
	    $('img[src!=' + window.location + ']').each(function () { 
		var imgsrc = $(this).attr("src")
		.replace(/([^\/]*$)/, newlocale + "_$1");
		$(this).attr('src', imgsrc);
	    });
	    
	};


	loadLang(newlocale);
	loadSounds(newlocale);
	loadImages(newlocale);

    };

    //loadLang("es-SP");

    // testing out getting strings from code
    $('#btnLoHE').text(_("Not Hebrew"));  


    var myscore = 0;
    $('#btnYes').click(function () {
	audio[0].play()
	myscore++;
	$("#txtScore").html("" + myscore);
    });
    $('#btnNo').click(function () {
	myscore--;
	audio[1].play()
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

    $('#btnLoEN').click(function(){ 
	localize("en-US");
    });

    $('#btnLoNE').click(function (){
	
    });

    $('#btnLoHE').click(function (){
	localize("en-US");
    });

    $('#btnLoES').click(function(){localize("es-SP");});


    
});

