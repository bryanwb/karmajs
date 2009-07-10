/*
* event.js
*/
// Window Events
$debug("Initializing Window Event.");
var $events = [],
    $onerror,
    $onload,
    $onunload;

$w.addEventListener = function(type, fn){
  //$log("adding event listener " + type);
	if ( !this.uuid ) {
		this.uuid = $events.length;
		$events[this.uuid] = {};
	}
	if ( !$events[this.uuid][type] ){
		$events[this.uuid][type] = [];
	}
	if ( $events[this.uuid][type].indexOf( fn ) < 0 ){
		$events[this.uuid][type].push( fn );
	}
};

$w.removeEventListener = function(type, fn){
  if ( !this.uuid ) {
    this.uuid = $events.length;
    $events[this.uuid] = {};
  }
  if ( !$events[this.uuid][type] ){
		$events[this.uuid][type] = [];
	}	
  $events[this.uuid][type] =
    $events[this.uuid][type].filter(function(f){
			return f != fn;
		});
};

$w.dispatchEvent = function(event){
    $debug("dispatching event " + event.type);
    //the window scope defines the $event object, for IE(^^^) compatibility;
    $event = event;
    if (!event.target) {
        event.target = this;
    }
    $debug("event target: " + event.target);
    if ( event.type ) {
        if ( this.uuid && $events[this.uuid][event.type] ) {
            var _this = this;
            $events[this.uuid][event.type].forEach(function(fn){
                $debug('calling event handler '+fn+' on target '+_this);
                fn.call( _this, event );
            });
        }
    
        if (this["on" + event.type]) {
            $debug('calling event handler '+event.type+' on target '+this);
            this["on" + event.type].call(_this, event);
        }
    }
    if(this.parentNode){
        this.parentNode.dispatchEvent.call(this.parentNode,event);
    }
};
	
$w.__defineGetter__('onerror', function(){
  return function(){
   //$w.dispatchEvent('error');
  };
});

$w.__defineSetter__('onerror', function(fn){
  //$w.addEventListener('error', fn);
});

/*$w.__defineGetter__('onload', function(){
  return function(){
		//var event = document.createEvent();
		//event.initEvent("load");
   //$w.dispatchEvent(event);
  };
});

$w.__defineSetter__('onload', function(fn){
  //$w.addEventListener('load', fn);
});

$w.__defineGetter__('onunload', function(){
  return function(){
   //$w.dispatchEvent('unload');
  };
});

$w.__defineSetter__('onunload', function(fn){
  //$w.addEventListener('unload', fn);
});*/