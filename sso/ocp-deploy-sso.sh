#!/bin/bash

# prefixing project with user to allow multiple people building the same project on the same cluster
proj_name="$(oc whoami)-ntier"
proj_exists="$(oc projects | grep ${proj_name})"

# if project doesn't exist, make a new one.  Otherwise switch to that project
if [[ -z ${proj_exists} ]]; then
  oc new-project ${proj_name} --display-name="SSO N-Tier" --description="SSO secured node.js frontend, JBoss EAP backend and Postgresql datastore with encrypted traffic"
else
  oc project ${proj_name}
fi

oc policy add-role-to-user view system:serviceaccount:$(oc project -q):default

template=sso72-x509-postgresql-persistent

oc new-app ${template} \
 -p SSO_ADMIN_USERNAME="admin" \
 -p SSO_ADMIN_PASSWORD="Redhat1!" \
 -p SSO_REALM="java-js-realm"
 
 sleep 1
 route_name=$(oc get routes -l app=${template} | { read line1 ; read line2 ; echo "$line2" ; } | awk '{print $2;}')
 
 # config map is used by clients to connect to rh-sso and database
 oc create configmap ntier-config \
    --from-literal=AUTH_URL=https:\/\/${route_name}/auth \
    --from-literal=KEYCLOAK=true \
    --from-literal=PUBLIC_KEY=changeme \
    --from-literal=PG_CONNECTION_URL=jdbc:postgresql:\/\/postgresql\/jboss \
    --from-literal=PG_USERNAME=pguser \
    --from-literal=PG_PASSWORD=pgpass
