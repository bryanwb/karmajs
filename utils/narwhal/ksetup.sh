#!/bin/bash
# This script holds utilities for Karma lessons
# MIT License
# copyright 2009 Bryan W Berry

narwhal=./bin/narwhal

    
kgettext() {

    if [ -z ./narwhal/bin ] ; then
	echo "You need narwhal js interpreter in order to proceed"
        exit 1
    fi

    $narwhal ./i18n/ksetup.js
    exit 0
}



case "$1" in 
    "--kgettext")
	kgettext
	;;
    "--help")
	echo "Usage:  --gettext html_file.html target_file.po"
	;;
    *) 
	echo "no other options right now"
	;;
esac