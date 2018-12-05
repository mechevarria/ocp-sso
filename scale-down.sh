#/bin/bash

proj_name="$(oc whoami)-ntier"
oc project ${proj_name}

oc scale --replicas=0 dc nodejs-app
oc scale --replicas=0 dc springboot-app
oc scale --replicas=0 dc eap-app
oc scale --replicas=0 dc postgresql
oc scale --replicas=0 dc sso
oc scale --replicas=0 dc sso-postgresql
