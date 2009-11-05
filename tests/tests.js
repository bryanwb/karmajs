 $(document).ready(function(){

     // Testing helper methods

     module("Module Helpers");

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
	      ninja1.name === ninja.name, "target object wasn't updated with source");
	 ok ( warrior.__proto__.isPrototypeOf(ninja1), "the protoypeObject changed");	 

     });


     module("Module Karma core library");

     test("Karma", function () { 
	 var options = {locale: "en-US", 
	     images: [ {name: "ball",   file: "ball37px.png"}],
	     sounds: [ {name: "correct",  file: "correct.ogg"}],
	     surfaces: [ {name:"topLt", canvas:"topLtCanvas"}]};
	 
	 var karma1 = Karma.karma;

	 ok( karma1.__proto__.isPrototypeOf(Karma.karma), "Karma() doesn't return" +
	   " a prototype of Karma.karma ");

     });

     test("kObject", function () {
	 var kMock = Karma.kObject;
	 ok ( kMock.localized === false, "kObject is properly instantiated");
	 var options = {localized: true};
	 kMock.init(options);
	 ok (kMock.localized === true, "kObject init properly sets localized value");
     });

     test("Karma.karma.validate", function () { 
	 var kMock = Karma.karma;
	 
	 kMock.images = [{ name: "chimp", file : 'chimp.png' }] ;
	 kMock.sounds = [{ name: "correct", file : 'correct.ogg'}];
	 kMock.surfaces = [{ name: "test", canvas : 'testCanvas'}];
	 ok( kMock.validate(options), "It didn't accept good options");

	 kMock.images = [{ name: "chimp", file : 'notThere.png' }] ;
	 ok( Karma.karma.validate(options), "It accepted an image that" +
	   "doesn't exist");
/*
	 kMock.sounds = [{ name: "correct", file : 'notthere.ogg'}];
	 ok( Karma.karma.validate(options), "It accepted a sound that" +
	   "doesn't exist");

	 kMock.surfaces = [{ name: "test", canvas : 'notThereCanvas'}];	 
	 ok( Karma.karma.validate(options), "It accepted a canvas element" + 
	     "that doesn't exist");
*/
     });
    
     test("Karma.karma.init", function () { 
	 

     });
     


     test("Karma.kimage.validate", function () { 
	 

     });
    
     test("Karma.kimage.init", function () { 
	 

     });
     
	    

 });
    