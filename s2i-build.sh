#!/bin/bash

# https://github.com/openshift/source-to-image/blob/master/docs/cli.md#s2i-build

source_location=.
builder_image=jboss-eap-7/eap71-openshift
tag=s2i-build/jboss-api
flags=-c

s2i build ${source_location} ${builder_image} ${tag} ${flags}
