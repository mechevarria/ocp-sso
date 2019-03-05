#!/bin/bash

# prefixing project with user to allow multiple people building the same project on the same cluster
proj_name="$(oc whoami)-ntier"
oc project ${proj_name}

echo "Creating mysql database"

db_service=mysql

oc new-app \
--name=${db_service} \
-p MYSQL_USER=myuser \
-p MYSQL_PASSWORD=mypass \
-p MYSQL_DATABASE=jboss \
-p DATABASE_SERVICE_NAME=${db_service} \
-p MYSQL_VERSION=latest \
mysql-persistent

echo "Waiting for mysql to finish deploying before deploying EAP"
sleep 11

oc new-app \
--name=eap-app \
-p SOURCE_REPOSITORY_URL=https://github.com/mechevarria/ocp-sso \
-p SOURCE_REPOSITORY_REF=master \
-p CONTEXT_DIR=/eap \
eap71-basic-s2i

oc set env dc/eap-app --from=configmap/ntier-config
oc set env dc/eap-app --from=secret/mysql

echo "deleting default http route"
oc delete route eap-app
oc create route edge --service=eap-app --cert=server.cert --key=server.key
