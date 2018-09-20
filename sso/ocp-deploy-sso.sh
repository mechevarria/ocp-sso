#!/bin/bash

project="$(oc projects | grep ntier)"

if [[ -z ${project} ]]; then
  oc new-project ntier --display-name="SSO N-Tier" --description="SSO secured node.js frontend, JBoss EAP backend and Postgresql datastore with encrypted traffic"
else
  oc project ntier
fi

oc policy add-role-to-user view system:serviceaccount:$(oc project -q):default

template=sso72-x509-postgresql-persistent

oc new-app ${template} \
 -p SSO_ADMIN_USERNAME="admin" \
 -p SSO_ADMIN_PASSWORD="Redhat1!" \
 -p SSO_REALM="java-js-realm"
 
 sleep 1
 route_name=$(oc get routes -l app=${template} | { read line1 ; read line2 ; echo "$line2" ; } | awk '{print $2;}')
 
 oc create configmap ntier-config \
    --from-literal=AUTH_URL=https:\/\/${route_name}/auth \
    --from-literal=KEYCLOAK=true \
    --from-literal=PUBLIC_KEY=changeme \
    --from-literal=PG_CONNECTION_URL=jdbc:postgresql:\/\/postgresql\/jboss \
    --from-literal=PG_USERNAME=pguser \
    --from-literal=PG_PASSWORD=pgpass
