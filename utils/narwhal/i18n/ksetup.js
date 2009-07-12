

load('./lib/env.rhino.js');
window.location = ('./i18n/test.html');
load('./i18n/jquery.js');
var mystr = "";
mystr = $('meta')[0].tagName;

file = require('file');
file.write('./i18n/testnw.txt', mystr); 