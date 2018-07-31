#!/bin/bash

oc login -u developer

project="$(oc projects | grep nodejs-eap)"

if [[ -z ${project} ]]; then
  oc new-project nodejs-eap --display-name="node.js and EAP"
else
  oc project nodejs-eap
fi

oc new-app https://github.com/mechevarria/jboss-client \
 --name=nodejs-app
 
oc expose svc/nodejs-app
