#!/bin/bash

proj_name="$(oc whoami)-ntier"
oc project ${proj_name}
oc delete all --selector app=eap-app
oc delete dc/postgresql
oc delete all --selector name=postgresql
oc delete service postgresql
oc delete configmap ntier-config
oc delete secret postgresql
