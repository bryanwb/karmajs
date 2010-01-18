 $(document).ready(
     function(){
	 // k is a shortcut for the Karma object
	 var k = Karma;

	 var hasProperties = function (properties) {
	     for (var prop in properties) {
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

	 //unit test suite uses this function
	 k.reset = function () {
	     while($('#starterMsg').length === 1){
		 $('#starterMsg').remove();
	     };

	     while($('#karma-status').length === 1){
		 $('#karma-status').remove();
	     };
	     
	     this._assetPath = "assets/";
	     this.locale = undefined;
	     this._localized = false;
	     this._localePath = "";
	     this.image = {};
	     this.canvas = {};
	     this.audio = {};
	     this.svg = {};
	     this.video = {};
	     this._initialized = false;
	     this._statusDiv = undefined;
	     this._counters.total = 0; 
	     this._counters.errors = 0; 
	     this._counters.loaded = 0; 
	     this._loaderDiv = undefined;
	     return k;
	 };

	 //clean up any error message crap left behind
	 //by initializing and resetting Karma
	 //call it in the last asynchronous test
	 var removeMsgs = function () {
	     while($('#karma-status').length === 1){
		 $('#karma-status').remove();
	     };
	 };

	 
	 module("Module Helpers");


	 test("Basic Requirements", function() {
		  expect(5);

		  //Need to test if doctype is html5
		  // and if browser supports html5

		  ok( k, "Karma library loaded");
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
		  ok( warrior.dance === ninja.dance && warrior.tattoo ===
		       ninja.tattoo, "target object wasn't updated with source");
		  ok( oldProto === newProto, "the object prototype changed.");
	      });
	 
	 test("Karma.copyObjectPlus", function(){
		  expect(2);
		  var warrior = { name : "conan", age : 30, dance : true};
		  var copyWarrior = Karma.clone(warrior);
		  var ninja = { dance : false, name : "Yoshi"};

		  var ninja1 =  Karma.copyObjectPlus(warrior, ninja);

		  ok( ninja1.dance === ninja.dance && ninja1.age === warrior.age &&
		       ninja1.name === ninja.name, 
		       "target object wasn't updated with source");
		  ok( warrior.__proto__.isPrototypeOf(ninja1), 
		       "the protoypeObject changed");	 

	      });


	 module("Module Karma core library");
	 

	 test("Karma()", function () { 
		  expect(2);
		  var karma1 = Karma();
		  ok(k._initialized === true, 
		     "Karma() sets initialized property on k");
		  var karma2 = Karma();
		  ok(karma1 === karma2, "Karma() only allows one instance of Karma");
		  
	      });
	 
	 test("Karma._isHtml5()", 
	     function(){		 
		 expect(2);
		 // throw error if doctype not set to html5
		 
		 ok(shouldError(
			function(){
			    Karma._init();
			    var doctype = "xhtml";
			    Karma._isHtml5(doctype);     
			}), "The doctype has to be set to <!DOCTYPE html>" +
				" in order to use karma");		       
		 var errorElem = document.getElementById('errorDoctype');
		 var regex = new RegExp('ERROR', 'i');
		 ok(regex.test(errorElem.innerText), "The Error placeholder" +
		    "contains error message");
		 
		 //cleanup
		 var doctype = "xhtml";
		 errorElem.parentNode.removeChild(errorElem);
		 });

	 test("Karma._init()", function() {
		  expect(5);
		  k.reset();
		  ok(
		      shouldNotError(
			  function(){
			      k._init();
			  }), "Karma._init() does not throw errors when " +
			  "initialized with no options");
		  
		  k.reset();

		  ok(shouldError(function () {
				     k._init({locale : "foo"});}), 
		      "emits error on invalid locale");

		  k.reset();

		      var goodOptions = {locale : "en", 
			  image : [{ name: "chimp", 
			      file : 'happyMonkey.jpg' }
				  ],  
			      audio : [{ name: "correct", 
					 file : 'correct.ogg'}
				      ], 
			       canvas : [{ name: "test", domId : 'testCanvas'}]};

		  ok(shouldNotError(function () { k._init(goodOptions);}), 
		     "accepts good options");
		  
		  k.reset();
		  
		  var badOptions = {locale : "blabla", image : [{ name: "chimp", 
							       file : 'chimp.png' }], 
				    audio : [{ name: "correct", file : 'notthere.ogg'}], 
				    canvas : [{ name: "", domId : 'noCanvas'}]};
		  
		  ok(shouldError(function () { k._init(badOptions); }), 
		     "Rejects bad options");
		  
		  k.reset();

		  //test that init won't overwrite private properties
		  k._init({_counters : { errors : 500}});
		  ok(k._counters.errors !== 500, "Private property not overwritten");     
		  
		  k.reset();
	      });



	 test("Karma.ready()", function () {
		  expect(3);
		  ok(shouldError(function () {k.ready();}), "Uninitialized karma instance " + 
		       "generates error on .ready()");
		  
		  k.reset();

		  k._init().ready();
		  var starterMsg = document.getElementById('starterMsg');
		  ok(starterMsg, 
		     "Karma.ready() with no callback displays starter msg");
		  //clean up
		  document.body.removeChild(starterMsg);
		  k.reset();
		  
		  var ninjaName = "Bruce Lee";
		  var testCb = function () { ninjaName = "Chuck Norris";};
		  
		  k._init().ready(testCb);
		  ok(ninjaName === "Chuck Norris", "ready() calls callback");

		  k.reset();
		  
	      });


	 test("karma._isValidLocale(locale)",
	      function () {
		  expect(4);
		  // test valid locale
		  ok(k._isValidLocale("en"), "Valid locale option accepted");

		  // test valid locale
		  ok(k._isValidLocale("en-us"), "Valid locale option accepted");
		  
		  //test invalid locale
		  ok(!k._isValidLocale("foo"), "Invalid locale rejected");		  

		  //test invalid locale
		  ok(!k._isValidLocale("en_Foobar"), "Invalid locale rejected");		  

	      });


	 test("karma._normalizeLocale(locale)", function () { 
		  expect(3);
		  ok(k._normalizeLocale("EN-us") === "en_US",
		      "lowercase, uppercase, and dash properly changed");
		  ok(k._normalizeLocale("en_US") === "en_US", 
		      "Doesn't screw up locale that is already ok");
		  ok(k._normalizeLocale("en") === "en",
		      "handles 2 letter locale.");
		  
	      });

	 
	 test("karma._computeLocalePath(locale)",
	      function() {
		  expect(2);
		  ok(Karma._computeLocalePath("en_US") === 
		     "assets/en_US/", "computes correct path");

		  ok(Karma._computeLocalePath("es") === 
		     "assets/es/", "computes correct path");
	      });



	 //have to do this asynchronously let the error event propagate
	 asyncTest("Karma.kImage._init( bad options )", 
	      function(){
		  expect(4);
		  var kImage1 = Karma.create(Karma.kImage);		  
		  k.reset()._init();
		  var oldErrors = k._counters.errors;
		  var oldTotal = k._counters.total;
		  try {
		      kImage1._init({name: "notthere", file: "notthere.png"});
		  } catch (e){}
	     
	    	 setTimeout(
		     function (){
			 ok(kImage1.status === "error", "bad file name produces error");
			 ok(k._counters.errors >= oldErrors + 1 , 
			    "Error counter was incremented on load error");
			 ok(k._counters.total === oldTotal + 1 , 
			    "Total Assets counter was incremented");
			 ok(checkErrorMsg(),
			    "error message appended");
			 //k.reset();
			 start();
		     }, 1000);
	     });
			  


	 asyncTest("Karma.kImage._init( good options )", 
	     function(){
		 expect(3);
		 k.reset()._init();
		 var oldErrors = k._counters.errors;
		 var oldTotal = k._counters.total;
		 var kMock = { name: "chimp", file: "happyMonkey.jpg"};
		 var kImage2 = Karma.create(Karma.kImage)._init(kMock);
		 
		 setTimeout(
		     function () {
		      ok(kImage2.status === "loaded", "Good file is loaded");		
		      ok(k._counters.errors === oldErrors, 
		      "Error counter not incremented");
		      ok(k._counters.total === oldTotal + 1 , 
			 "Total Assets counter was incremented");
			 k.reset();
		      start();
		  }, 1000);
	     });


	 test("Karma.kImage._init( localize an asset when locale not set )",
	      function(){
		  expect(1);
		  var kMock = Karma.create(Karma.kImage);
		  k.locale = undefined;
		  
		  ok(shouldError(
			 function () {
			     kMock._init({ name: 'esMonkey', file: 'happyMonkey.jpg',
			      _localized: true });
			 }), 
			 "You can't localize an asset if the locale isn't defined for your lesson");
	      });

	
	 asyncTest("Karma.kImage._init() w/ _localized file", 
		   function(){
		       expect(2);
		       k.reset()._init();
		       var kMock = Karma.create(Karma.kImage);	
		       var oldErrors = k._counters.errors;
		       var oldTotal = k._counters.total;
		       shouldError(
			   function(){
			       kMock._init({ name : 'monkey', file : 'happyMonkey.jpg', 
				     _localized : true});
			   });
		       
		       setTimeout(
			   function(){
			       ok(k._counters.errors === oldErrors,
				  "Properly loads localized file");
			       ok(k._counters.total === oldTotal + 1 , 
				  "Total Assets counter was incremented");
			       k.reset();
			       start();
			   }, 1000);
		   });

	
	 //k.kAudio._init()

	 //k.kVideo._init()
         test("Karma.kVideo._init()", 
	      function(){
		  k.reset()._init();
		  var config = {'name':'myVideo', 'file':'myVideo.ogv'};
		  var myVideo = Karma.create(Karma.kVideo);
		  ok(shouldError(
			 function(){
			     myVideo._init(config);
			 }), "Video is not yet supported");
		  ok(Karma._counters.errors > 0, "Error counter incremented");
	      });

	 test("Karma._isLocalized(boolLocalized)",
		 function(){
		     expect(4);
		     
		     k.locale = "en";
		     ok(Karma._isLocalized(true),
			"handles true value");
		     ok(Karma._isLocalized(false) === false,
			"handles false value");
		     ok(shouldError(function(){
					Karma._isLocalized("true");}),
			"rejects non-boolean value");

		     k.locale = undefined;
		     ok(shouldError(function(){
					Karma._isLocalized(true);
				    }), 
			"Emits error if item is localized but Karma instance isn't");
		     
	      });
	 
	 
 	 asyncTest("Karma._makeCollection(collection, 'image') w/ good images", 3, 
	     function(){
		 k.reset()._init();
		 var configs = [ 
		     {name : "chimp", file:"happyMonkey.jpg"},
		     {name:"chili", file:"chili.png"},
		     {name:"plussign", file:"plussign.png"}
			     ];    

		 Karma._makeCollection(configs, 'image');
		 setTimeout(
		     function(){
			 ok(k.image.chili.name === configs[1].name, 
			 "can access image by name");
			 ok(k._counters.loaded === 3, 
			 "Counter of loaded assets was properly incremented");
			 ok(k._counters.errors === 0, 
			 "Counter of errors hasn't changed");
			 ok(k._counters.total === 3, 
			 "Counter of total assets properly incremented");
			 k.reset();
			 start();
		     }, 2000);
	     });

	 asyncTest("Karma._makeCollection(collection, 'image') w/ 2 good images and " +
		   "1 bad one.", 4, 
	     function(){
		 k.reset()._init();
		 var configs = [ 
		     {name : "chimp", file:"happyMonkey.jpg"},
		     {name:"notthere", file:"notthere.png"},
		     {name:"chili", file:"chili.png"}
			     ];    
		 Karma._makeCollection(configs, 'image');
		 setTimeout(
		     function(){
			 ok(k._counters.loaded === 2, 
			 "Counter of loaded assets was properly incremented");
			 ok(k._counters.errors === 1, 
			 "Counter of errors was properly incremented");
			 ok(k._counters.total === 3, 
			 "Counter of total assets properly incremented");
			 ok(checkErrorMsg(), "Error Message generated");

			 k.reset();
			 start();
		     }, 2000);
	     });

	 asyncTest("Karma._makeCollection(collection, 'image') w/ 3 good imgs, 1 localized", 
		 function(){
		     expect(4);
		     k.reset()._init({locale: "es"});
		     var configs = [ 
			 {name : "chimp", file:"happyMonkey.jpg", 
			 _localized : true},
		     {name:"chili", file:"chili.png"},
		     {name:"plussign", file:"plussign.png"}
			     ];    

		     Karma._makeCollection(configs, 'image');
		     setTimeout(
			 function(){
			     ok(k.image.chimp._path === 
				"assets/es/image/", 
			     "can access image by name");
			     ok(k._counters.loaded === 3, 
			 "Counter of loaded assets was properly incremented");
			     ok(k._counters.errors === 0, 
			     "Counter of errors hasn't changed");
			     ok(k._counters.total === 3, 
			     "Counter of total assets properly incremented");
			     k.reset();
			     start();
		     }, 2000);
	     });
	       
	 	 
	 asyncTest("Karma._makeCollection(configs, 'audio') w/ good audio",  
	     function(){
		 expect(5);
		 k.reset()._init();
		 var configs = [ 
		     {name : "correct", file:"correct.ogg"},
		     {name:"incorrect", file:"incorrect.ogg"},
		     {name:"trigger", file:"trigger.ogg"}
			     ];    

		 Karma._makeCollection(configs, 'audio');
		 setTimeout(
		     function(){
			 ok(k.audio.correct.name === configs[0].name, 
			 "can access sound by name");
			 ok(k.audio.correct.play, 
			    "play() method is attached");
			 ok(k._counters.loaded === 3, 
			 "Counter of loaded assets was properly incremented");
			 ok(k._counters.errors === 0, 
			 "Counter of errors hasn't changed");
			 ok(k._counters.total === 3, 
			 "Counter of total assets properly incremented");
			 k.reset();
			 start();
		     }, 2000);
	     });

	 asyncTest("Karma._makeCollection(configs, 'audio') w/ 2 good sounds and " +
		   "1 bad one.",  
	     function(){
		 expect(4);
		 k.reset()._init();
		 var configs = [ 
		     {name : "correct", file: "correct.ogg"},
		     {name:"notthere", file: "notthere.ogg"},
		     {name:"trigger", file: "trigger.ogg"}
			     ];    

		 Karma._makeCollection(configs, 'audio');
		 setTimeout(
		     function(){
			 ok(k._counters.loaded === 2, 
			 "Counter of loaded assets was properly incremented");
			 ok(k._counters.errors === 1, 
			 "Counter of errors was properly incremented");
			 ok(k._counters.total === 3, 
			 "Counter of total assets properly incremented");
			 ok(checkErrorMsg(), "Error Message generated");

			 k.reset();
			 start();
		     }, 2000);
	     });

	 asyncTest("Karma._makeCollection(audio, 'audio') w/ 3 good sounds, 1 localized", 
		 function(){
		     expect(4);
		     k.reset()._init({locale: "es"});
		     var configs = [ 
			 {name : "correct", file:"correct.ogg", 
			  _localized: true},
			 {name:"incorrect", file:"incorrect.ogg"},
			 {name:"trigger", file:"trigger.ogg"}
			     ];    

		     Karma._makeCollection(configs, 'audio');
		     setTimeout(
			 function(){
			     ok(k.audio.correct._path === 
				"assets/es/audio/", 
			     "can access sound by name");
			     ok(k._counters.loaded === 3, 
			 "Counter of loaded assets was properly incremented");
			     ok(k._counters.errors === 0, 
				"Counter of errors hasn't changed");
			     ok(k._counters.total === 3, 
				"Counter of total assets properly incremented");
			     start();
		     }, 2000);
	     });

	 test("Karma._makeCollection for Canvases",
	      function(){
		  expect(7);
		  var configs = [{name: "myCanvas"}];
		  ok(shouldError(
			 function(){
			     Karma._makeCollection(configs, 'canvas');
			 }
		     ), "throws error if domId not specified");		     
		  
		  configs = [{name: "myCanvas", domId:"notThere"}];
		  ok(shouldError(
			 function(){
			     Karma._makeCollection(configs, "canvas");
			 }
		     ), "throws error if domId not present in html");
		  
		  configs = [{name: "myCanvas", domId:"testCanvas"}];
		  ok(shouldNotError(
			 function(){
			     Karma._makeCollection(configs, 'canvas');
			 }
		     ), "accepts valid canvas options");

		  ok(k.canvas.myCanvas.ctx instanceof 
		     CanvasRenderingContext2D, "The canvas has valid 2D Context");
		  ok(k.canvas.myCanvas.width === 200,
		     "width set the dom value");
		  ok(k.canvas.myCanvas.height === 200,
		     "height set the dom value");

		  configs = [{name: "badCanvas", domId:"badCanvas", 
		      width: 100}];
		  ok(shouldError(
			 function(){
			     Karma._makeCollection(configs, 'canvas');
			 }
		     ),	 
		     "Throws error if only width or height but not both" +
		     " specified in the html");
		  
	      });

	 test("Karma._makeCollection for SVGs",
	      function(){
		  expect(5);
		  var configs = [{name: "mySvg"}];
		  ok(shouldError(
			 function(){
			     Karma._makeCollection(configs, 'svg');
			 }
		     ), "throws error if domId not specified");		     
		  
		  configs = [{name: "mySvg", domId:"notThere"}];
		  ok(shouldError(
			 function(){
			     Karma._makeCollection(configs, 'svg');
			 }
		     ), "throws error if domId not present in html");
		  
		  configs = [{name: "mySvg", domId:"testSvg"}];
		  ok(shouldNotError(
			 function(){
			     Karma._makeCollection(configs, 'svg');
			 }
		     ), "accepts valid svg options");

		  ok(k.svg.mySvg, "Valid svg accessible by name");

		  configs = [{name: "badSvg", domId:"badSvg", 
		      width: 100}];
		  ok(shouldError(
			 function(){
			     Karma._makeCollection(configs, 'svg');
			 }
		     ),	 
		     "Throws error if only width or height but not both" +
		     " specified in the html");
		  
	      });
     
	 
	 asyncTest("Karma._makeCollection good svg loads",  
	       function(){
	           expect(4);
		   k.reset()._init();
		   $('#nothiddendiv').css('display', 'block');
		   var configs = [{name: "testSvg", domId:"testSvg"}];
		   Karma._makeCollection(configs, 'svg');
		   
		 setTimeout(
	             function(){
			 ok(k.svg.testSvg, "svg exists");
			 ok(k._counters.loaded >= 1, "loaded counter incremented");
			 ok(k._counters.total === 1, "total counter incremented ");
			 ok(k._counters.errors === 0, "error counter not incremented");
			 $('#nothiddendiv').css('display', 'none');
		         start();	 
		     }, 1000);
	     });

	  asyncTest("Karma._makeCollection good localized svg loads",  
	       function(){
	           expect(3);
		   k.reset()._init();
		   $('#nothiddendiv').css('display', 'block');
		   var configs = [{name: "testSvg", domId:"testSvg", 
			      _localized : true}];
		   Karma._makeCollection(configs, 'svg');
		 setTimeout(
	             function(){
			 ok(k._counters.loaded >= 1, "loaded counter incremented " +
			    "with good localized svg");
			 ok(k._counters.total === 1, "total counter incremented " +
			    "with good localized svg");
			 ok(k._counters.errors === 0, "error counter not incremented " +
			    "with good localized svg");
			 $('#nothiddendiv').css('display', 'none');

		        start();	 
		     }, 500);
	     });	 

	 //Karma._makeVideos tests

	 //Karma.shuffle
	 test('Karma.shuffle', function(){
		  var list = [1,2,3,4,5,6,7,8,9,10];
		  var newList = [];
		  var isShuffled = false;
		  
		  for (var i = 0; i < 10; i++){
		      newList = Karma.shuffle(list);
		      for (var j = 0; j < newList.length; j++){ 
			  if(newList[j] !== list[j]){
			      isShuffled = true; 
			      break;
			  }
		      }
		      if (isShuffled === false){
			  break;
		      }
		  }
		  ok(isShuffled, "Shuffles each time");
	      });  
		  
	 //Karma.radians
	 test('Karma.radians',
	       function(){
		   expect(1);
		   ok(Karma.radians(50) >= 0.87 &&
		      Karma.radians(50) <= 0.88,
		      "correct result computed");
	       });

	 //Karma.distance2
	 test('Karma.distance2',
	      function(){
		  ok(Karma.distance2({x: 1, y:2}, {x: 9, y: 15}) === 64,
		    "returns correct value");
	      });

	 //Karma.distance
	 test('Karma.distance',
	      function(){
		  ok(Karma.distance({x: 1, y:2}, {x: 9, y: 15}) === 8,
		    "returns correct value");
	      });

	 //Karma.rand
	 test('Karma.rand',
	      function(){
		  var rand = Karma.rand(5, 8);
		  ok(rand >= 5 && rand <= 8, 
		     "Generates valid range of numbers");
	      }
	     );



	 test("k.canvas['testCanvas'].strokeStyle('#ffffff') " +
	      "sets strokeStyle correctly", 
	      function(){
		  expect(3);
		  var configs = [{name: "myCanvas", domId:"testCanvas"}];
		  Karma._makeCollection(configs, 'canvas');
		  k.canvas.myCanvas.strokeStyle('#ffffff'); 
		  ok( k.canvas.myCanvas.ctx.strokeStyle ===
		      '#ffffff', 'Stroke style properly set');
		  ok(shouldError(
		      function(){
			  k.canvas.myCanvas.ctx.strokeStyle('#ffffff'); 

		      }),"ctx.strokeStyle is a property and not a function");
		  
		  ok(shouldNotError(
		      function(){
			  k.canvas.myCanvas.strokeStyle('#ffffff')
			      .clear().save().restore().clearRect(0, 0, 20, 20);
		      }),"Chaining works!");

	      });
	 
	 test("Karma.ready() removes 'Karma is loading ... ' message",  
		   function(){
		       expect(1);
		       k.reset()._init();
		       k.ready();
		       //firefox puts a space between the colon and none
		       var regex = new RegExp('display: *none');
		       ok(regex.test(k._statusDiv.getAttribute('style')), 
			       "ready() hides Karma is loading message");
			    
		   });

	 //for whatever reason, this test only works if run last
	 asyncTest("Karma.ready() check callback execution",  
		   function(){
		       expect(2);
		       //test that callback isn't called while asset isn't ready yet
		       var foo = "bar";
		       var testCb = function () { 
			   foo = "baz";
		       };

		       k.reset()._init();
		       k._counters.total = 5000;  
		       k.ready(testCb);
		       ok( foo === "bar", "callback not called before all assets loaded");
		       k._counters.total = k._counters.loaded = 0;
		  
		       //wait for callback to be called by ready 
		       setTimeout(function() {
				      ok(foo === "baz", 
					  "ready() calls callback after assets loaded");
				      //called in last asyncTest to remove 
				      //error messages
				      k.reset();
				      start();
				  },
				  10);
		   }); 	 

	 test("Karma.kCanvas 2DRendering Context Helpers",
	      function(){
		 k.reset()._init();
		  var config = {name: "myCanvas", domId:"testCanvas"};
		  var myCanvas = Karma.kCanvas._init(config);
		  myCanvas.globalAlpha(0.2);
		  myCanvas.lineWidth(0.4);
	
		  ok(myCanvas.ctx.globalAlpha >= 0.2 && 
		     myCanvas.ctx.globalAlpha <= 0.21,
		     "globalAlpha property set");
		  ok(myCanvas.ctx.lineWidth >= 0.4 &&
		     myCanvas.ctx.lineWidth <= 0.41,
		     "lineWidth property set");		 
		  k.reset();
		  
	      });
	


     });