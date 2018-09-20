#/bin/bash

oc project ntier

oc scale --replicas=1 dc sso-postgresql
sleep 2
oc scale --replicas=1 dc sso
oc scale --replicas=1 dc postgresql
sleep 2
oc scale --replicas=1 dc eap-app
oc scale --replicas=1 dc springboot-app
oc scale --replicas=1 dc nodejs-app
