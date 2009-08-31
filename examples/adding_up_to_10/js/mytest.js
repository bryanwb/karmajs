window.addEventListener('load', function() {
    var actionTopLeftCanvas = document.getElementById('actionTopLeftCanvas');
    var atlCtx = actionTopLeftCanvas.getContext('2d');

    var ballImg = document.getElementById('ball');
    atlCtx.drawImage(ballImg, 0, 0);
    actionTopLeftCanvas.setAttribute('width', '45%');
    atlCtx.drawImage(ballImg, 2, 2, 30, 15);


/*    var mainTopCanvas = document.getElementById('mainTopCanvas');
    var mainBottomCanvas = document.getElementById('mainBottomCanvas');	
    var asideCanvas = document.getElementById('asideCanvas');

    var tcCtx = mainTopCanvas.getContext('2d');
    var bcCtx = mainBottomCanvas.getContext('2d');
    var acCtx = asideCanvas.getContext('2d');
    var startY = 0;
    
    var logo = new Image();

    	logo.src = 'assets/generic/images/logo_w_name.png';
	logo.onload = function () {};

	tcCtx.drawImage(logo, 0, 0, 0, 0);
	tcCtx.drawImage(logo, 30, 60, 258, 80);

	
	var timerFn = function () {
	    if (startY !== 0) {
       	    tcCtx.clearRect(0, startY - 10,300,10);
	    }	
	    tcCtx.fillRect(0, startY,300,10);
	    startY = startY + 10;    
	    
	};

	var id = setInterval (timerFn, 1000);
*/


}, false);
	

