
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
	    
	    locale_data = json_locale_data[newlocale];

	    // Write translatable strings that are inline
	    for (var i in locale_data){
		if ( i !== ""){
		    $(':contains(' + i + '):last').html(locale_data[i][1]);
		}
       	    }
	    

	   //write translatable strings that are stored in attributes
	   $('img[alt!=""]').each(function(){
	       var alttxt = "";
	       alttxt = $(this).attr("alt");
	       var newalttxt = locale_data[alttxt][1];
	       $(this).attr("alt", newalttxt);
	       
	   });
           

	};

	var loadAssets = function(newlocale) {
	    //if the src attribute is empty,
	    //jquery returns the file name for document
	    $('img[src!=' + window.location + '],' +
	      'audio[src!=' + window.location + ']')
	    .each(function () { 
		var assetsrc = $(this).attr("src")
		.replace(/([^\/]*$)/, newlocale + "_$1");
		$(this).attr('src', assetsrc);
		if ($(this)[0].tagName === "AUDIO"){
		    $(this).load();
		}
	    });
	    
	};


	loadLang(newlocale);
	loadAssets(newlocale);

    };


    //$('#btnLoHE').text(_("Not Hebrew"));  


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
	audio[2].play()
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
	localize("ne-NP");
    });

    $('#btnLoHE').click(function (){
	$('html').attr("dir", "rtl");
	localize("he-IS");
    });

    $('#btnLoES').click(function(){localize("es-SP");});


    
});
