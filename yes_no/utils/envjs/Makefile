JAR = java1.5 -jar rhino/js.jar
export JAVA_HOME=/usr/lib/jvm/java-1.5.0-sun/bin/java

test-rhino:
	ant -emacs test

run-rhino:
	echo "load('dist/env.rhino.js');window.location='test/index.html';" | ${JAR}
