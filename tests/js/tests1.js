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
	 

	 asyncTest("Karma.makeSvgs good svg loads",  
	       function(){
	           expect(4);
		   k.reset().init();
		   var svgs = [{name: "testSvg", domId:"testSvg"}];
		   Karma.makeSvgs(svgs);
		 setTimeout(
	             function(){
			 ok(k.svgs['testSvg'], "svg exists");
			 ok(k._counters.loaded === 1, "loaded counter incremented "
			    + "with good localized svg");
			 ok(k._counters.total === 1, "total counter incremented "
			    + "with good localized svg");
			 ok(k._counters.errors === 0, "error counter not incremented "
			    + "with good localized svg");
		        start();	 
		     }, 500);
	     });

	 /*	 asyncTest("Karma.makeSvgs good localized svg loads",  
	       function(){
	           expect(3);
		   k.reset();
		   var svgs = [{name: "testSvg", domId:"testSvg", 
			      localized : true}];
		   Karma.makeSvgs(svgs);
		 setTimeout(
	             function(){
			 ok(k._counters.loaded === 1, "loaded counter incremented "
			    + "with good localized svg");
			 ok(k._counters.total === 1, "total counter incremented "
			    + "with good localized svg");
			 ok(k._counters.errors === 0, "error counter not incremented "
			    + "with good localized svg");
		        start();	 
		     }, 500);
	     });	 

	 	 asyncTest("Karma.makeSvgs nonexistent localized svg throws error",  
	       function(){
	           expect(3);
		   k.reset();
		   var svgs = [{name: "testSvg", domId:"testSvg", 
			      localized : true}];
		   Karma.makeSvgs(svgs);
		 setTimeout(
	             function(){
			 ok(k._counters.loaded === 0, "loaded counter not incremented "
			    + "with bad localized svg");
			 ok(k._counters.total === 1, "total counter incremented "
			    + "with bad localized svg");
			 ok(k._counters.errors === 1, "error counter incremented "
			    + "with bad localized svg");
		        start();	 
		     }, 500);
	     });
*/

	 //Karma.makeVideos tests
	 

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
	  }, 500);
	     });

	  */

	 
     });