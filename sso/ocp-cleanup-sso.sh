#!/bin/bash

proj_name="$(oc whoami)-ntier"
oc project ${proj_name}
oc delete all --selector app=sso72-x509-postgresql-persistent
oc delete configmap ntier-config
oc delete pvc sso-postgresql-claim
