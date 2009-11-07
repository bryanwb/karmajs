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

     test("Karma", function () { 


	 same( Karma.karma, Karma({}), 
	     "Karma() returns the karma object");

	 var options = {locale: "en-US", 
	     images: [ {name: "monkey",   file: "happyMonkey.jpg"}],
	     sounds: [ {name: "trigger",  file: "trigger.ogg"}],
	     surfaces: [ {name:"testCanvas", canvas:"testCanvas"}]};


	 karma1 = Karma(options);
	 ok(karma1.images[0].name === "ball", "image name set properly");
	 
	 ok(karma1.locale === options.locale, "locale set");
	 
	 var canvasElem = document.getElementById(options.surfaces.canvas);
	 ok(karma1.surfaces[0].canvas === canvasElem, "Canvas element matches original");

	 //check that the image file matches original
	 var imageFile = getFile(options.images[0].file).responseText;
	 same(imageFile, karma1.images[0].toString(), "Returned image matches original");

	 var soundFile = getFile(options.sounds[0].file).responseText;
	 same(soundFile, karma1.sounds[0].toString(), "Returned image matches original");

	 
     });
     
 
     test("Karma.karma", function () { 
	 var options;
	 karma1 = Karma.create(Karma.karma);
	 var goodOptions = {locale : "en", images : [{ name: "chimp", 
						   file : 'chimp.png' }], 
			sounds : [{ name: "correct", file : 'correct.ogg'}], 
			surfaces : [{ name: "test", canvas : 'testCanvas'}]};
	 
	 // check valid locale
	 ok(Karma.karma.checkLocale("en"), "Valid locale option accepted");


	 //test invalid locale
	 ok(Karma.karma.checkLocale("foo"), "Invalid locale rejected");
	 
	 
/*	 //check that init() called on each asset
	 ok(function () { 
	     for ( var category in karma1){
		 initCategories = new RegExp("images||sounds||svg||videos");
		 
		 if (initCategories.match(category.toString())){
		     for ( var asset in category) {
			 if (!asset.hasOwnProperty("init")){
			     return false;
			 }
		     }
		 }
	     } 
	     return true;
	 }, "an init method called on each asset");
*/
     });
    
	    
		   
     test("Karma.kMedia", 
	  function () {
	      var kMock = { name: "chimp", type: "image", file: "chimp.png",
		  src: "./chimp.png"};
	      
	      ok(kMock.src === "./chimp.png", "src matches file");
	      kMock.file = "nothere.png";
	      
	      mockErr = new Error("This file cannot be found");
	      mockErr.name = "fileNotFound";

	      ok(shouldError({ func: kMock.init, error: mockErr,  ctx: kMock}),
		  "bad file name produces error");
	      ok(kMedia.path, "kMedia.path");
	      ok(kMedia.media, "kMedia.media");
	      ok(kMedia.src === "" + kMock.path + kMock.file, "file path is correct");
	      
	      //test load event

	      //test error event

	      //test abort event


	  });

	 
/*
	 kMock.sounds = [{ name: "correct", file : 'notthere.ogg'}];
	 ok( Karma.karma.validate(options), "It accepted a sound that" +
	   "doesn't exist");

	 kMock.surfaces = [{ name: "test", canvas : 'notThereCanvas'}];	 
	 ok( Karma.karma.validate(options), "It accepted a canvas element" + 
	     "that doesn't exist");
*/

     
 /*    test("Karma.kMedia.init localized", 
	  function() {
	      properties = ["name", "localised", "file", ];
	 
	      ok(hasProperties.call(Karma.kMedia, properties), 
		 "kMedia has the " + "properties it should have");
	      
	  });
     
     test("Karma.kMedia.init load event", );
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
    