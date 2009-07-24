/* http://keith-wood.name/localisation.html
   Localisation assistance for jQuery v1.0.4.
   Written by Keith Wood (kbwood{at}iinet.com.au) June 2007. 
   Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
   MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
   Please attribute the author if you use it. */

(function($) { // Hide scope, no $ conflict

// Localise it!
$.localise= {
	/* Retrieve the default language set for the browser. */
	defaultLanguage : normaliseLang(navigator.language /* Mozilla */ || navigator.userLanguage /* IE */)
};

/* Ensure language code is in the format aa-AA. */
function normaliseLang(lang) {
	lang = lang.replace(/_/, '-').toLowerCase();
	if (lang.length > 3) {
		lang = lang.substring(0, 3) + lang.substring(3).toUpperCase();
	}
	return lang;
}

})(jQuery);