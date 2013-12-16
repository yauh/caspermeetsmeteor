#!/bin/bash
# Mac OS X 10.9 has this nasty bug where it shows all kinds of messages for CoreText fonts
# this mutes them
/usr/local/bin/casperjs $@ 2> >(grep -v CoreText 1>&2)
