#!/bin/bash

project="$(oc projects | grep ntier)"

if [[ -z ${project} ]]; then
  oc new-project ntier --display-name="SSO N-Tier" --description="SSO secured node.js frontend, JBoss EAP backend and Postgresql datastore with encrypted traffic"
else
  oc project ntier
fi

oc policy add-role-to-user view system:serviceaccount:$(oc project -q):default

oc new-app sso72-x509-postgresql-persistent \
 -p SSO_ADMIN_USERNAME="admin" \
 -p SSO_ADMIN_PASSWORD="Redhat1!" \
 -p SSO_REALM="eap-js-realm"
