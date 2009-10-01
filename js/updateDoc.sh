_JSDOCDIR="../utils/jsdoc-toolkit"
_OUTPUTDIR="../docs/jsdoc/"
java -jar $_JSDOCDIR/jsrun.jar $_JSDOCDIR/app/run.js -a -t=$_JSDOCDIR/templates/jsdoc jquery.karma.js -d=$_OUTPUTDIR
