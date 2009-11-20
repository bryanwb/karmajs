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

	 //unit test suite uses this function
	 Karma.karma.reset = function () {
	     if (this.statusDiv){
		 this.statusDiv.parentNode.removeChild(this.statusDiv);
	     }

	     var starterMsg = document.getElementById('starterMsg');
	     if(starterMsg){
		 starterMsg.parentNode.removeChild(starterMsg);
	     }
	     
	     this._assetPath = "assets/",
	     this.locale = undefined,
	     this._localized = false,
	     this._localePath = "",
	     this.images = {},
	     this.canvases = {},
	     this.sounds = {},
	     this.svgs = {},
	     this.videos = {},
	     this.initialized = false,
	     this.statusDiv= undefined,
	     this._counters = { total : 0, errors : 0, loaded : 0};
	     this.loaderDiv = undefined;
	     return this;
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
	 


	 //have to do this asynchronously let the error event propagate
	 asyncTest("Karma.kMedia.init(/* bad options */)", 4, 
	      function(){
		  var kMedia1 = Karma.create(Karma.kMedia);		  
		  k.reset().init();
		  var oldErrors = k._counters.errors;
		  var oldTotal = k._counters.total;
		  try {
		      kMedia1.init({name: "notthere", _type : "image",
				file: "notthere.png"});
		  } catch (e){}
	     
	    	 setTimeout(
		     function (){
			 ok(kMedia1.status === "error", "bad file name produces error");
			 ok(k._counters.errors === oldErrors + 1 , 
			    "Error counter was incremented on load error");
			 ok(k._counters.total === oldTotal + 1 , 
			    "Total Assets counter was incremented");
			 ok(checkErrorMsg(),
			    "error message appended");
			 k.reset();
			 start();
		     },100);
	     });
			  


     });