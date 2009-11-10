 $(document).ready(function(){
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

     var shouldError = function (errorFactory){

	 errorFactory.args = errorFactory.args || [];
	 errorFactory.ctx = errorFactory.ctx || this;

	 try {
	     errorFactory.func.apply(errorFactory.ctx, 
				  errorFactory.args);
	 } catch (err){ 
	     if (errorFactory.err) {
		 return errorFactory.err === err;
	     } else { 
		 return true;
	     }
	 
	 return false;
	 };
     };
	 
     var shouldNotError = function () {
	 return !shouldError(arguments);
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
	 mock1 = Karma.create(mock);
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

	 ninja1 =  Karma.copyObjectPlus(warrior, ninja);

	 ok ( ninja1.dance === ninja.dance && ninja1.age === warrior.age &&
	      ninja1.name === ninja.name, 
	      "target object wasn't updated with source");
	 ok ( warrior.__proto__.isPrototypeOf(ninja1), 
	      "the protoypeObject changed");	 

     });


     module("Module Karma core library");
     
     test("Karma()", function () { 
	 
	 same(Karma.create(Karma.karma).init(), Karma(), 
	      "Karma() w/ no arguments returns the karma object");}
	 );
 
     
     var options = {locale: "en-US", 
	 images: [ {name: "monkey",   file: "happyMonkey.jpg"}],
	 sounds: [ {name: "trigger",  file: "trigger.ogg"}],
	 svgs: [ {name: "uruguay", file: "uruguay.svg"}],
	 surfaces: [ {name:"testCanvas", canvas:"testCanvas"}]};

	 
     //test that entered options reflected in returned karma object
     test("Karma(options)", function () {
	 var karma1 = Karma(options);
	 ok(karma1.images[0].name === "ball", "image name set properly");
	 var karma2 = Karma.create(Karma.karma).init(options);
	 same(karma1, karma2, "Karma() returns same object as running init on Karma.karma");
	 ok(karma1.locale === options.locale, "locale set");
	 var canvasElem = document.getElementById(options.surfaces.canvas);
	 ok(karma1.surfaces[0].canvas === canvasElem, "Canvas element matches original");

	 //check that asset files match originals
	 //have to do this asynchronously to wait until the files are all loaded
	 setTimeout(function () {
	     var imageFile = getFile(options.images[0].file).responseText;
	     same(imageFile, karma1.images[0].toString(), "Returned image matches original");
	     var soundFile = getFile(options.sounds[0].file).responseText;
	     same(soundFile, karma1.sounds[0].toString(), "Returned image matches original");
	     var svgFile = getFile(options.svgs[0].file).responseText;
	     same(svgFile, karma1.svg[0].toString(), "Returned image matches original");
	 }, 2000);
     });

     test("Karma.karma", function () { 
	 var options;
	 karma1 = Karma.create(Karma.karma);
	 
     });
     
     test("Karma.karma.init()", function() {	  
	 var goodOptions = {locale : "en", images : [{ name: "chimp", 
						   file : 'chimp.png' }], 
			sounds : [{ name: "correct", file : 'correct.ogg'}], 
			surfaces : [{ name: "test", canvas : 'testCanvas'}]};
	 
	 var karma5 = Karma.create(Karma.karma);
	 ok(shouldNotError(karma5.init(goodOptions)), "accepts good options");
	 
	 var badOptions = {locale : "en", images : [{ name: "chimp", 
	     file : 'chimp.png' }], 
	     sounds : [{ name: "correct", file : 'notthere.ogg'}], 
	     surfaces : [{ name: "", canvas : 'noCanvas'}]};
	 
	 ok(shouldError(karma5.init(badOptions), "Rejects bad options"));

     });

     test("Karma.karma.sanitizeLocale(locale)", function () { 
	 // check valid locale
	 ok(Karma.karma.sanitizeLocale("en"), "Valid locale option accepted");
	 
	 //test invalid locale
	 ok(Karma.karma.sanitizeLocale("foo"), "Invalid locale rejected");
     });


     test("Karma.karma.ready()", function () {
	 var karma3 = Karma.create(Karma.karma);
	 test(shouldError(karma3.ready()), "Uninitialized karma instance" + 
	      "generates error on .ready()");

	 karma3.init();
	 var testElem = $('#karma-test');
	 ok(testElem, "karma.run() w/ no args puts out default message");	 
	 if(testElem){ 
	     testElem.remove();
	 }
	     
	 var ninjaName = "Bruce Lee";
	 var testCb = function () { ninjaName = "Chuck Norris";}
	 var karma4 = Karma.create(Karma.karma).init().run(testCb);
	 ok (ninjaName === "Chuck Norris", "run() calls callback");

	 //test that callback isn't called while asset isn't ready yet
	 var ninjaName = "Bruce Lee";
	 try{
	     var karma4 = Karma({ images : { name: "notthere", file : "notthere.png"}});
	 } catch (e) {}
	 ok( ninjaName === "Bruce Lee", "callback not called before all assets loaded");
     });

     
     test("Karma.kMedia", 
	  function () {
	      var kMock = { name: "chimp", type: "image", file: "chimp.png",
		  src: "./chimp.png"};
	      
	      ok(kMock.src === "./chimp.png", "src matches file");
	      kMock.file = "nothere.png";
	      
	      mockErr = new Error("This file cannot be found");
	      mockErr.name = "fileNotFound";

	      ok(shouldError({ func: Karma.kMedia.init, error: mockErr,  ctx: kMock}),
		  "bad file name produces error");
	      ok(kMedia.path, "kMedia.path");
	      ok(kMedia.media, "kMedia.media");
	      ok(kMedia.src === "" + kMock.path + kMock.file, "file path is correct");
	      
	      //I don't know how to test that eventHandlers have been added
	      // nor how to test that they will be properly dispatched
	     /* kMedia1 = Karma.create( Karma.kMedia );
	     
	      //check event listeners loaded
	      var handlers = ['ready', 'load', 'abort', 'error'];
	      ok(function () {
		  kMedia1.init({ name: "chimp", type: "image", file: "chimp.png",
				 src: "./chimp.png"}); 
		  
		  
		  
	      }, "All event handlers loaded");

	      kMock = copyObjectPlus(Karma.kMedia, kMock);
	      
	      //trigger event handlers
	      var ev = document.createEvent('HTMLEvents');
	      ev.initEvent('load');
	      ok(kMock.elem.dispatchEvent(ev), "load event attached");
             */

	  });

	 
     
/*     test("Karma.kMedia.init load event", );
     test("Karma.kMedia.init error event", );
     test("Karma.kMedia.init abort event", );

     test("Karma.kImage", function () { 
	 

     });

    
     test("Karma.kSound", function () { 
	 

     });
     
     test("Karma.kSvg", function () { 
	 

     });
  */
	    
 
 });