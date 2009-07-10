/*
*	timer.js
*/
	

$debug("Initializing Window Timer.");

//private
var $timers = [];

$w.setTimeout = function(fn, time){
	var num;
	return num = window.setInterval(function(){
		fn();
		window.clearInterval(num);
	}, time);
};

window.setInterval = function(fn, time){
	var num = $timers.length+1;
	
    if (typeof fn == 'string') {
        var fnstr = fn; 
        fn = function() { 
            eval(fnstr); 
        }; 
    }
	if(time===0){
	    fn();
	}else{
	    $debug("Creating timer number "+num);
    	$timers[num] = new $env.timer(fn, time);
    	$timers[num].start();
	}
	return num;
};

window.clearInterval = window.clearTimeout = function(num){
	if ( $timers[num] ) {
	    
	    $debug("Deleting timer number "+num);
		$timers[num].stop();
		delete $timers[num];
	}
};	
	