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

	 var checkErrorMsg = function(){
	     var errorMsg = $('#errorList>li').text();
	     var regex = new RegExp('error', 'i');
	     return regex.test(errorMsg);
	 };

	 module("Module Helpers");


	 asyncTest("Karma.karma.ready() check callback execution",  
		   function(){
		       expect(2);
		       //test that callback isn't called while asset isn't ready yet
		       k.foo = "bar";
		       var testCb = function () { 
			   k.foo = "baz";
			   console.log(k.foo);
		       };

		       k.reset().init();
		       k._counters.total = 5000;  
		       k.ready(testCb);
		       ok( k.foo === "bar", "callback not called before all assets loaded");
		       k._counters.total = k._counters.loaded = 0;
		  
		       //wait for callback to be called by ready 
		       setTimeout(function() {
				      console.log(k.foo);
				      ok (k.foo === "baz", 
					  "ready() calls callback after assets loaded");
				      delete k.foo;
				      start();
				  },
				  100);
		   });
	 
     });