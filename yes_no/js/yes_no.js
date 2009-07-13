
    $(document).ready(function () {
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

	$('#btnLoEN').click(function (){
	    
	});

	$('#btnLoNE').click(function (){
	    
	});

	$('#btnLoHE').click(function (){
	    
	});

	$('#btnLoES').click(function (){
	    
	});


	
    });

