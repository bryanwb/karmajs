load('lib/env.rhino.js');
window.location = ('test.html');
load('jquery.js');
var mystr = "";
mystr = $('meta')[0].tagName;

file = require('file');
file.write('testnw.txt', mystr); 