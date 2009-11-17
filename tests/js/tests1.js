 $(document).ready(
     function(){
	 // k is a shortcut for the Karma object
	 var k = Karma.karma;

	 var hasProperties = function (properties) {
	     for ( prop in properties) {
		 if (!this[prop]){
		     return false;
		 }
		 else {
		     return true;
		 }
	     }
	 };

	 var shouldError = function ( cb ){
	     try {
		 cb();
	     } 
	     catch (e) {
		 return true;
	     }
	     return false;	 
	 };
	 
	 var shouldNotError = function ( cb ) {
	     return !shouldError( cb );
	 };
	 
	 module("Module Helpers");


	
	 asyncTest("Karma.kMedia.init() w/ localized file", 2, 
		   function(){
		       k.reset().init();
		       var kMock = Karma.create(Karma.kMedia);	
		       var oldErrors = k._counters.errors;
		       var oldTotal = k._counters.total;
		       kMock.init({ name : 'monkey', file : 'happyMonkey.jpg', 
				    _type : "image", localized : true});
		       
		       setTimeout(
			   function(){
			       console.log('foo');
			       ok(k._counters.errors === oldErrors,
				  "Properly loads localized file");
			       ok(k._counters.total === oldTotal + 1 , 
				  "Total Assets counter was incremented");
			       k.reset();
			       start();
			   }, 10);
	     });
	
	

	 
     });