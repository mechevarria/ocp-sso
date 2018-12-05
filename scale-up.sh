#/bin/bash

proj_name="$(oc whoami)-ntier"
oc project ${proj_name}

oc scale --replicas=1 dc sso-postgresql
sleep 2
oc scale --replicas=1 dc sso
oc scale --replicas=1 dc mysql
sleep 2
oc scale --replicas=1 dc eap-app
oc scale --replicas=1 dc springboot-app
oc scale --replicas=1 dc nodejs-app
