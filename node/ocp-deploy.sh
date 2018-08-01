#!/bin/bash

project="$(oc projects | grep nodejs-eap)"

if [[ -z ${project} ]]; then
  oc new-project nodejs-eap --display-name="SSO N-Tier" --descrption="SSO secured node.js frontend, JBoss EAP backend and Postgresql datastorei with encrypted traffic"
else
  oc project nodejs-eap
fi

oc new-app https://github.com/mechevarria/ocp-sso \
--context-dir=node \
--name=nodejs-app
 
oc create route edge --service=nodejs-app --cert=server.cert --key=server.key
