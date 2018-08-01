#!/bin/bash

project="$(oc projects | grep sso-nodejs-eap)"

if [[ -z ${project} ]]; then
  oc new-project sso-nodejs-eap --display-name="SSO N-Tier" --description="SSO secured node.js frontend, JBoss EAP backend and Postgresql datastore with encrypted traffic"
else
  oc project sso-nodejs-eap
fi

echo "Creating postgresql database"

db_service=postgresql

oc new-app \
--name=postgresql \
-p POSTGRESQL_USER=pguser \
-p POSTGRESQL_PASSWORD=pgpass \
-p POSTGRESQL_DATABASE=jboss \
-p POSTGRESQL_VERSION=9.5 \
-p DATABASE_SERVICE_NAME=${db_service} \
postgresql-persistent

oc set env dc/${db_service} POSTGRESQL_MAX_PREPARED_TRANSACTIONS=10

echo "Waiting for Postgresql to finish deploying before deploying EAP"
sleep 11

oc create -f credentials.yaml

oc create secret eap7-app-secret keystore.jks jgroups.jceks

oc new-app \
--name=eap-app \
-p SOURCE_REPOSITORY_URL=https://github.com/mechevarria/ocp-sso \
-p SOURCE_REPOSITORY_REF=master \
-p CONTEXT_DIR=/eap \
eap71-https-s2i

oc set env --from=secret/credentials dc/eap-app
