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


	 test("Basic Requirements", function() {
		  expect(5);

		  //Need to test if doctype is html5
		  // and if browser supports html5

		  ok( Karma, "Karma library loaded");
		  ok( Array.prototype.push, "Array.push()" );
		  ok( Function.prototype.apply, "Function.apply()" );
		  ok( document.getElementById, "getElementById" );
		  ok( document.getElementsByTagName, "getElementsByTagName" );
	      });

	 test("Karma.create", function(){
		  expect(2);
		  var mock = {};
		  //test against empty object
		  same(Karma.create({}), mock, "doesn't match empty object");
		  mock.age = 30;
		  var mock1 = Karma.create(mock);
		  equals(mock.age, mock1.age, "child object inherits property");
		  
	      });

	 test("Karma.clone", function(){
		  expect(2);

		  var mock = { name: "foo", age: 30, children : ["adrian", "sheila",
								 "stephanie"], spouse: { wife: "Marie"}};
		  same(Karma.clone(mock), mock, 
		       "cloned object matches original");
		  mock.spouse.wife = "Marjorie";
		  same(Karma.clone(mock), mock, 
		       "cloned object matches original after original changed after cloning");
		  
	      });

	 test("Karma.objectPlus", function(){
		  expect(2);

		  var warrior = { name : "conan", age : 30, dance : true};
		  var oldProto = warrior.__proto__;
		  var ninja = { dance : false, tattoo : true};
		  var newProto = warrior.__proto__;

		  Karma.objectPlus(warrior, ninja);
		  ok ( warrior.dance === ninja.dance && warrior.tattoo 
		       === ninja.tattoo, "target object wasn't updated with source");
		  ok ( oldProto === newProto, "the object prototype changed.");
	      });
	 
	 test("Karma.copyObjectPlus", function(){
		  expect(2);
		  var warrior = { name : "conan", age : 30, dance : true};
		  var copyWarrior = Karma.clone(warrior);
		  var ninja = { dance : false, name : "Yoshi"};

		  var ninja1 =  Karma.copyObjectPlus(warrior, ninja);

		  ok ( ninja1.dance === ninja.dance && ninja1.age === warrior.age &&
		       ninja1.name === ninja.name, 
		       "target object wasn't updated with source");
		  ok ( warrior.__proto__.isPrototypeOf(ninja1), 
		       "the protoypeObject changed");	 

	      });


	 module("Module Karma core library");
	 

	 test("Karma()", function () { 
		  expect(2);
		  var karma1 = Karma();
		  ok(k.initialized === true, 
		     "Karma() sets initialized property on k");
		  var karma2 = Karma();
		  ok (karma1 === karma2, "Karma() only allows one instance of Karma.karma");
		  
	      });
	 
	 test("Karma.isHtml5()", 
	     function(){		 
		 expect(2);
		 // throw error if doctype not set to html5
		 
		 ok(shouldError(
			function(){
			    var doctype = "xhtml";
			    Karma.isHtml5(doctype);     
			}), "The doctype has to be set to <!DOCTYPE html>"
				+ " in order to use karma");		       
		 var errorElem = document.getElementById('errorDoctype');
		 var regex = new RegExp('ERROR', 'i');
		 ok(regex.test(errorElem.innerText), "The Error placeholder"
		    + "contains error message");
		 
		 //cleanup
		 errorElem.parentElement.removeChild(errorElem);
		 });

	 test("Karma.karma.init()", function() {
		  expect(5);
		  ok(
		      shouldNotError(
			  function(){
			      k.init();
			  }), "Karma.karma.init() does not throw errors when " +
			  "initialized with no options");
		  
		  k.reset();

		  ok(shouldError(function () {
				     k.init({locale : "foo"});}), 
		      "emits error on invalid locale");

		  k.reset();

		  var goodOptions = {locale : "en", images : [{ name: "chimp", 
								file : 'chimp.png' }], 
				     sounds : [{ name: "correct", file : 'correct.ogg'}], 
				     surfaces : [{ name: "test", canvas : 'testCanvas'}]};

		  ok(shouldNotError(function () { k.init(goodOptions);}), 
		     "accepts good options");
		  
		  k.reset();
		  
		  var badOptions = {locale : "en", images : [{ name: "chimp", 
							       file : 'chimp.png' }], 
				    sounds : [{ name: "correct", file : 'notthere.ogg'}], 
				    surfaces : [{ name: "", canvas : 'noCanvas'}]};
		  
		  ok(shouldError(function () { k.init(badOptions); }), 
		     "Rejects bad options");
		  
		  k.reset();

		  //test that init won't overwrite private properties
		  k.init({_counters : { errors : 500}});
		  ok(k._counters.errors !== 500, "Private property not overwritten");     
		  
		  k.reset();
	      });

	 
	 test("Karma.karma.ready()", function () {
		  expect(3);
		  ok(shouldError(function () {k.ready();}), "Uninitialized karma instance " + 
		       "generates error on .ready()");
		  
		  k.reset();

		  k.init().ready();
		  var starterMsg = document.getElementById('starterMsg');
		  ok(starterMsg, 
		     "Karma.karma.ready() with no callback displays starter msg");
		  //clean up
		  document.body.removeChild(starterMsg);
		  k.reset();
		  
		  var ninjaName = "Bruce Lee";
		  var testCb = function () { ninjaName = "Chuck Norris";};
		  
		  k.init().ready(testCb);
		  ok (ninjaName === "Chuck Norris", "ready() calls callback");

		  k.reset();
		  
	      });
	 asyncTest("Karma.karma.ready() check callback execution",
		   function(){
		       //test that callback isn't called while asset isn't ready yet
		       expect(2);
		       var ninjaName = "Bruce Lee";
		       var testCb = function () { ninjaName = "Chuck Norris";};
		       k.reset().init();
		       k._counters.total = 5000;  
		       k.ready(testCb);
		       ok( ninjaName === "Bruce Lee", "callback not called before all assets loaded");
		       k._counters.total = 0;
		  
		       //wait for callback to be called by ready 
		       setTimeout(function() {
				      ok (ninjaName === "Chuck Norris", 
					  "ready() calls callback after assets loaded");
				      k.reset();
				      start();},
				  200);
		   });

	 test("karma.isValidLocale(locale)",
	      function () {
		  /* reject locale if has more than 2 letters
		   * before dash or underscore
		   * 
		   */
		  expect(4);
		  // test valid locale
		  ok(k.isValidLocale("en"), "Valid locale option accepted");

		  // test valid locale
		  ok(k.isValidLocale("en-us"), "Valid locale option accepted");
		  
		  //test invalid locale
		  ok(!k.isValidLocale("foo"), "Invalid locale rejected");		  

		  //test invalid locale
		  ok(!k.isValidLocale("en_Foobar"), "Invalid locale rejected");		  

	      });


	 test("karma.normalizeLocale(locale)", function () { 
		  /*
		   * change any "-" dash to underscore
		   * make sure first part lowercase
		   * make sure part after underscore is uppercase
		   *
		   * don't do anything if already ok
		   * 
		   * don't choke on locale w/ only two letters 
		   */
		  expect(3);
		  ok (k.normalizeLocale("EN-us") === "en_US",
		      "lowercase, uppercase, and dash properly changed");
		  ok (k.normalizeLocale("en_US") === "en_US", 
		      "Doesn't screw up locale that is already ok");
		  ok (k.normalizeLocale("en") === "en",
		      "handles 2 letter locale.");
		  
	      });

	 
	 test("karma.computeLocalePath(locale)",
	      function() {
		  /* 
		   * for locale es_SP 
		   *    make sure returns path  "../assets/locale_name/" 
		   * 
		   */
		  expect(2);
		  ok(Karma.computeLocalePath("en_US") === 
		     "assets/en_US/", "computes correct path");

		  ok(Karma.computeLocalePath("es") === 
		     "assets/es/", "computes correct path");
	      });

	 test("Karma.kMedia",
	      function (){
		  expect(0);

	      });

	 
	 /* list of tests for kMedia.init
	  * 
	  * throw error if type, name, and file not specified
	  * 
	  * for file that doesn't exist
	  *    status set to error
	  *    increment _conters.total
	  *    increment _counters.errors
	  *    error msg appended to karma-loader
	  * 
	  * for file that does exist
	  *    status set to loaded
	  *    increment _counters.total and _counters.loaded
	  *    updates karma-loader correctly
	  * 
	  * repeat above tests for localized media
	  * 
	  * emit error if locale not set but asset has localized set to true
	  * 
	  */		  

	 test("Karma.kMedia.init({})", 
	      function () {
		  expect(1);
		  var kMock = Karma.create(Karma.kMedia);
		  ok(shouldError(
			 function(){ 
			     kMock.init({});
			     }), "Throw error if _type, name, or file not specified");
	      });


	 //have to do this asynchronously let the error event propagate
	 asyncTest("Karma.kMedia.init(/* bad options */)",
	      function(){
		  expect(4);
		  var kMedia1 = Karma.create(Karma.kMedia);		  
		  k.reset().init();
		  var oldErrors = k._counters.errors;
		  var oldTotal = k._counters.total;
		  kMedia1.init({name: "notthere", _type : "image",
				file: "notthere.png"});
	     
	    	 setTimeout(
		     function (){
			 ok(kMedia1.status === "error", "bad file name produces error");
			 ok(k._counters.errors === oldErrors + 1 , 
			    "Error counter was incremented on load error");
			 ok(k._counters.total === oldTotal + 1 , 
			    "Total Assets counter was incremented");
			 var errorMsg = $('#karma-status>ol>li').text();
			 var regex = new RegExp('error', 'i');
			 ok(regex.test(errorMsg),
			    "error message appended");
			 k.reset();
			 start();
		     },10);
	     });
			  


	 asyncTest("Karma.kMedia.init(/* good options */)",
	     function(){
		 expect(3);
		 k.reset().init();
		 var oldErrors = k._counters.errors;
		 var oldTotal = k._counters.total;
		 var kMock = { name: "chimp", _type: "image", file: "happyMonkey.jpg"};
		 var kMedia1 = Karma.create(Karma.kMedia).init(kMock);
		 
		 setTimeout(
		     function () {
		      ok(kMedia1.status === "loaded", "Good file is loaded");		
		      ok(k._counters.errors === oldErrors, 
		      "Error counter not incremented");
		      ok(k._counters.total === oldTotal + 1 , 
			 "Total Assets counter was incremented");
			 k.reset();
		      start();
		  }, 10);
	     });


	 test("Karma.kMedia.init( /* localize an asset when locale not set */)",
	      function(){
		  expect(1);
		  var kMock = Karma.create(Karma.kMedia);
		  k.locale = undefined;
		  
		  ok(shouldError(
			 function () {
			     kMock.init({ name: 'esMonkey', file: 'happyMonkey.jpg',
			     _type: 'image', localized: true });
			 }), 
			 "You can't localize an asset if the locale isn't defined for your lesson");
	      });

	
	 asyncTest("Karma.kMedia.init() w/ localized file",
		   function(){
		       expect(2);
		       k.reset().init();
		       var kMock = Karma.create(Karma.kMedia);	
		       var oldErrors = k._counters.errors;
		       var oldTotal = k._counters.total;
		       kMock.init({ name : 'monkey', file : 'happyMonkey.jpg', 
				    _type : "image", localized : true});
		       
		       setTimeout(
			   function(){
			       ok(k._counters.errors === oldErrors,
				  "Properly loads localized file");
			       ok(k._counters.total === oldTotal + 1 , 
				  "Total Assets counter was incremented");
			       k.reset();
			       start();
			   }, 10);
	     });

					 


	 test("Karma.isLocalized(boolLocalized)",
		 function(){
		  /*
		   * reject non-boolean values
		   * 
		   * produce error if item is localized but not
		   * locale isn't set for karma object
		   */
	 	     expect(4);
		     
		     k.locale = "en";
		     ok(Karma.isLocalized(true),
			"handles true string value");
		     ok(Karma.isLocalized(false),
			"handles false string value");
		     ok(shouldError(function(){
					Karma.isLocalized("true");}),
			"rejects non-boolean value");

		     k.locale = undefined;
		     ok(shouldError(function(){
					Karma.isLocalized(true);
				    }), 
			"Emits error if item is localized but Karma instance isn't");
		  
	      });
	 
	 
	 /* Karma.makeImages tests
	  * good image added to k.images and # of images incremented
	  *       
	  * bad image not added, error msg appended, and # of images 
	  * not incremented
	  * 
	  * for n good images, w/ at least 1 localized, all n images added
	  */
	 asyncTest("Karma.makeImages(images) w/ good images",
	     function(){
		 expect(2);
		 k.reset().init();
		     var imageConfigs = [ 
			 {name:"chimp", 
			 file:"happyMonkey.jpg"},
			 {name:"chili", file:"chili.png"},
			 {name:"plussign", file:"plussign.png"}
		     ];    

		 setTimeout(
		     function(){
			 ok(shouldNotError(Karma.makeImages(imageConfigs)), 
			 "Good Images created w/out throwing errors");
			 ok(k.images.length === 3, 
			 "images array has proper # of items");
			 start();
		     }, 10);
		 k.reset();
	     });



		       
	 
	 
	 /* Karma.makeSounds tests
	  * good image added to k.sounds and # of sounds incremented
	  * 
	  * bad sound not added, error msg appended, and # of sounds
	  * not incremented
	  * 
	  * for n good sounds, n sounds added
	  * 
	  * play method added to each sound
	  */

	 /* Karma.makeCanvases tests
	  * 
	  * throw error is domId not specified
	  * 
	  * throw error if canvas not in dom
	  * 
	  * canvas height and width set to same as dom
	  * 
	  * if valid canvas, added to k.canvases
	  * 
	  */

	 //Karma.makeSvgs tests

	 //Karma.makeVideos tests
	 
	 //Karma.kCanvas
	 
	 //Karma.kSvg
	 
	 

	 //Karma.kSound.play()
	 
	 //Karma.kSound.stop()
	 
	 //Karma.kVideo.play()
	 
	 //Karma.chainMaker


	 /*
	  //this is boilerplate text for an asyncTest
	  //don't delete it unless u love typing ;)
	  asyncTest(" ",
	       function(){
		 expect(0);
		 setTimeout(
	             function(){
		        start();	 
		     }, 100);
	     });

	  */

	 
     });