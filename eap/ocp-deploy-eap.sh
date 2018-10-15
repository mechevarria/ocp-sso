#!/bin/bash

# prefixing project with user to allow multiple people building the same project on the same cluster
proj_name="$(oc whoami)-ntier"
oc project ${proj_name}

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

oc new-app \
--name=eap-app \
-p SOURCE_REPOSITORY_URL=https://github.com/mechevarria/ocp-sso \
-p SOURCE_REPOSITORY_REF=master \
-p CONTEXT_DIR=/eap \
eap71-basic-s2i

oc set env --from=configmap/ntier-config dc/eap-app

echo "deleting default http route"
oc delete route eap-app
oc create route edge --service=eap-app --cert=server.cert --key=server.key
