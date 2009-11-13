 $(document).ready(
     function(){
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

	 var shouldError = function ( cb, expectedError ){
	     try {
		 cb();
	     } catch (e){
		 if (expectedError){
		     if (e.name === expectedError.name) {
			 return true;
		     } else {
			 return false;
		     }		     
		 }
		 return true;
	     }
	     return false;	 
	 };
	 
	 var shouldNotError = function ( cb ) {
	     return !shouldError( cb );
	 };
	 
	 var getFile = function (fileName){
	     var xhr = new XMLHttpRequest();
	     xhr.open('GET', options.images[0].file, false);
	     xhr.send('');
	     return xhr;
	 };


	 module("Module Helpers");

	 test("Basic Requirements", function() {
		  ok( Karma, "Karma library loaded");
		  ok( Array.prototype.push, "Array.push()" );
		  ok( Function.prototype.apply, "Function.apply()" );
		  ok( document.getElementById, "getElementById" );
		  ok( document.getElementsByTagName, "getElementsByTagName" );
	      });

	 test("Karma.create", function(){
		  var mock = {};
		  //test against empty object
		  same(Karma.create({}), mock, "doesn't match empty object");
		  mock.age = 30;
		  var mock1 = Karma.create(mock);
		  equals(mock.age, mock1.age, "child object inherits property");
		  
	      });

	 test("Karma.clone", function(){
		  var mock = { name: "foo", age: 30, children : ["adrian", "sheila",
								 "stephanie"], spouse: { wife: "Marie"}};
		  same(Karma.clone(mock), mock, 
		       "cloned object matches original");
		  mock.spouse.wife = "Marjorie";
		  same(Karma.clone(mock), mock, 
		       "cloned object matches original after original changed after cloning");
		  
	      });

	 test("Karma.objectPlus", function(){
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
		  
		  same(Karma.create(Karma.karma).init(), Karma(), 
		       "Karma() w/ no arguments returns the karma object");
	      });
	 
	 

	 test("Karma.karma", function () { 
		  var options;
		  var karma1 = Karma.create(Karma.karma);
		  
	      });
	 
	 test("Karma.karma.init()", function() {
		  
		  Karma.KarmaRoot = undefined;
		  var karma1 = Karma.create(Karma.karma).init();
		  ok(Karma.KarmaRoot , "Karma.karma.init() creates KarmaRoot object");

		  ok(shouldError(function () {
				     karma1.init({locale : "foo"});}), 
		      "emits error on invalid locale");

		  var goodOptions = {locale : "en", images : [{ name: "chimp", 
								file : 'chimp.png' }], 
				     sounds : [{ name: "correct", file : 'correct.ogg'}], 
				     surfaces : [{ name: "test", canvas : 'testCanvas'}]};
		  
		  var karma5 = Karma.create(Karma.karma);
		  ok(shouldNotError(function () { karma5.init(goodOptions);}), 
		     "accepts good options");
		  
		  var badOptions = {locale : "en", images : [{ name: "chimp", 
							       file : 'chimp.png' }], 
				    sounds : [{ name: "correct", file : 'notthere.ogg'}], 
				    surfaces : [{ name: "", canvas : 'noCanvas'}]};
		  
		  ok(shouldError(function () { karma5.init(badOptions); }), 
		     "Rejects bad options");
		  
		  //test that init won't overwrite private properties
		  var karma6 = Karma.create(Karma.karma).init({_counters : { errors : 500}});
		  ok(karma6._counters.errors !== 500, "Private property not overwritten");     
	      });

	 
	 test("Karma.karma.ready()", function () {
		  Karma.KarmaRoot = undefined;
		  var karma3 = Karma.create(Karma.karma);
		  ok(shouldError(function () {karma3.ready();}), "Uninitialized karma instance " + 
		       "generates error on .ready()");
		  
		  karma3 = Karma.create(Karma.karma).init().ready();
		  var starterMsg = document.getElementById('starterMsg');
		  ok(starterMsg, 
		     "Karma.karma.ready() with no callback displays starter msg");
		  //clean up
		  document.body.removeChild(starterMsg);
		  
		  var ninjaName = "Bruce Lee";
		  var testCb = function () { ninjaName = "Chuck Norris";};
		  
		  var karma4 = Karma.create(Karma.karma).init().ready(testCb);
		  ok (ninjaName === "Chuck Norris", "ready() calls callback");

		  
		  //test that callback isn't called while asset isn't ready yet
		  ninjaName = "Bruce Lee";
		  karma4 = Karma.create(Karma.karma).init();
		  karma4._counters.total = 5000;  
		  karma4.ready(testCb);
		  ok( ninjaName === "Bruce Lee", "callback not called before all assets loaded");
		  karma4._counters.total = 0;
		  
		  //wait for callback to be called by ready 
		  setTimeout(function() {
				 ok (ninjaName === "Chuck Norris", 
				     "ready() calls callback after assets loaded");},
			     200);
		  
	      });

	 test("karma.isValidLocale(locale)",
	      function () {
		  /* reject locale if has more than 2 letters
		   * before dash or underscore
		   * 
		   */

		  // test valid locale
		  ok(Karma.karma.isValidLocale("en"), "Valid locale option accepted");

		  // test valid locale
		  ok(Karma.karma.isValidLocale("en-us"), "Valid locale option accepted");
		  
		  //test invalid locale
		  ok(!Karma.karma.isValidLocale("foo"), "Invalid locale rejected");		  

		  //test invalid locale
		  ok(!Karma.karma.isValidLocale("en_Foobar"), "Invalid locale rejected");		  

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

		  ok (Karma.karma.normalizeLocale("EN-us") === "en_US",
		      "lowercase, uppercase, and dash properly changed");
		  ok (Karma.karma.normalizeLocale("en_US") === "en_US", 
		      "Doesn't screw up locale that is already ok");
		  ok (Karma.karma.normalizeLocale("en") === "en",
		      "handles 2 letter locale.");
		  
	      });

	 
	 test("karma.computeLocalePath(locale)",
	      function() {
		  /* 
		   * for locale es_SP 
		   *    make sure returns path  "../assets/locale_name/" 
		   * 
		   */

		  ok(Karma.karma.computeLocalePath("en_US") === 
		     "../assets/en_US/", "computes correct path");

		  ok(Karma.karma.computeLocalePath("es") === 
		     "../assets/es/", "computes correct path");
	      });

	 test("Karma.kMedia",
	      function (){
		  

	      });

	 
	 test("Karma.kMedia.init()", 
	      function () {
		  /* list of tests
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

		  
		  var kMock = Karma.create(Karma.kMedia);
		  ok(shouldError(
			 function(){ 
			     kMock.init({});
			     }), "Throw error if _type, name, or file not specified");

		  var kMedia1 = Karma.create(Karma.karma.kMedia);
		  var oldErrors = Karma.karma._counters.errors;
		  var oldTotal = Karma.karma._counters.total;
		  kMedia1.init({name: "notthere", _type : "image",
				file: "notthere.png"});
		  ok(kMedia1.status === "error", "bad file name produces error");
		  ok(Karma.karma._counters.errors === oldErrors + 1 , 
		     "Error counter was incremented on load error");
		  ok(Karma.karma._counters.total === oldTotal + 1 , 
		     "Total Assets counter was incremented");
		  var errorMsg = $('#karma-loader>ol>li').text();
		  ok(errorMsg === "ERROR: File notthere.png could not be loaded",
		    "correct error message appended");
		 
		  oldErrors = Karma.karma._counters.errors;
		  oldTotal = Karma.karma._counters.total;
		  kMock = { name: "chimp", _type: "image", file: "happyMonkey"};
		  kMedia1 = Karma.create(Karma.karma.kMedia).init(kMock);
		  ok(kMedia1.status === "loaded", "Good file is loaded");		
		  ok(Karma.karma.counterrors === oldErrors, 
		     "Error counter not incremented");
		  ok(Karma.karma._counters.total === oldTotal + 1 , 
		     "Total Assets counter was incremented");

		  kMock = Karma.create(Karma.kMedia);
		  Karma.karma.locale = undefined;
		  ok(shouldError(
			 function () {
			     kMock.init({ name: 'esMonkey', file: 'HappyMonkey.jpg',
					  _type: 'image', localized: true });
			 }), 
		     "You can't localize an asset if the locale isn't defined for your lesson");
				    
				
		  kMock = Karma.create(Karma.kMedia);	
		  oldErrors = Karma.karma._counters.errors;
		  oldTotal = Karma.karma._counters.total;
		  kMock.init({ name : 'trigger', file : 'trigger.ogg', 
					  _type : "sound", localized : true});
		  ok(kMock.status === "error", "Asset has status properly set to error");
		  ok(Karma.karma._counters.errors === oldErrors + 1,
		     "Loading a localized file emits an error event if a localized version doesn't exist");
		  ok(Karma.karma._counters.total === oldTotal + 1 , 
		     "Total Assets counter was incremented");
				
		  kMock = Karma.create(Karma.kMedia);	
		  oldErrors = Karma.karma._counters.errors;
		  oldTotal = Karma.karma._counters.total;
		  kMock.init({ name : 'monkey', file : 'happyMonkey.jpg', 
					  _type : "image", localized : true});
		  ok(Karma.karma._counters.errors === oldErrors,
		     "Properly loads localized file");
		  ok(Karma.karma._counters.total === oldTotal + 1 , 
		     "Total Assets counter was incremented");
	      });
					 


	 test("Karma.isLocalized(boolLocalized)",
	      function(){
		  /*
		   * reject non-boolean values
		   * 
		   * produce error if item is localized but not
		   * locale isn't set for karma object
		   */
		  Karma.KarmaRoot.locale = "en";
		  ok(Karma.isLocalized(true),
		    "handles true string value");
		  ok(Karma.isLocalized(false),
		    "handles false string value");
		  ok(shouldError(function(){
		      Karma.isLocalized("true");}),
		      "rejects non-boolean value");
		  
		  if (Karma.KarmaRoot === undefined) {
		      Karma.KarmaRoot = {};
		  }

		  Karma.KarmaRoot.locale = undefined;
		     
		  ok(shouldError(function(){
		      Karma.isLocalized(true);
		  }), 
		     "Emits error if item is localized but Karma instance isn't");
		  
	      });
	 

	 
	 
     });