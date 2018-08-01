#!/bin/bash

oc login -u developer

project="$(oc projects | grep nodejs-eap)"

if [[ -z ${project} ]]; then
  oc new-project nodejs-eap --display-name="node.js and EAP"
else
  oc project nodejs-eap
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

sleep 10

oc create -f credentials.yaml

oc create secret eap7-app-secret keystore.jks jgroups.jceks

oc new-app \
--name=eap-app \
-p SOURCE_REPOSITORY_URL=https://github.com/mechevarria/jboss-api \
-p SOURCE_REPOSITORY_REF=master \
-p CONTEXT_DIR=/ \
eap71-https-s2i

oc set env --from=secret/credentials dc/eap-app
