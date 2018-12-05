#!/bin/bash

# prefixing project with user to allow multiple people building the same project on the same cluster
proj_name="$(oc whoami)-ntier"
oc project ${proj_name}

echo "Creating mysql database"

db_service=mysql

oc new-app \
--name=mysql \
-p MYSQL_USER=myuser \
-p MYSQL_PASSWORD=mypass \
-p MYSQL_DATABASE=jboss \
-p DATABASE_SERVICE_NAME=${db_service} \
mysql-persistent

echo "Waiting for mysql to finish deploying before deploying EAP"
sleep 11

oc new-app \
--name=eap-app \
-p SOURCE_REPOSITORY_URL=https://github.com/mechevarria/ocp-sso \
-p SOURCE_REPOSITORY_REF=eap \
-p CONTEXT_DIR=/eap \
eap71-basic-s2i

oc set env --from=configmap/ntier-config dc/eap-app

echo "deleting default http route"
oc delete route eap-app
oc create route edge --service=eap-app --cert=server.cert --key=server.key
