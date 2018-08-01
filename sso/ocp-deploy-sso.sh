#!/bin/bash

project="$(oc projects | grep sso-nodejs-eap)"

if [[ -z ${project} ]]; then
  oc new-project sso-nodejs-eap --display-name="SSO N-Tier" --description="SSO secured node.js frontend, JBoss EAP backend and Postgresql datastore with encrypted traffic"
else
  oc project sso-nodejs-eap
fi

oc policy add-role-to-user view system:serviceaccount:$(oc project -q):default

oc secret new sso-app-secret keystore.jks jgroups.jceks truststore.jks

oc secrets link default sso-app-secret

oc new-app sso72-postgresql-persistent \
 -p HTTPS_SECRET="sso-app-secret" \
 -p HTTPS_KEYSTORE="keystore.jks" \
 -p HTTPS_NAME="jboss" \
 -p HTTPS_PASSWORD="mykeystorepass" \
 -p JGROUPS_ENCRYPT_SECRET="sso-app-secret" \
 -p JGROUPS_ENCRYPT_KEYSTORE="jgroups.jceks" \
 -p JGROUPS_ENCRYPT_NAME="secret-key" \
 -p JGROUPS_ENCRYPT_PASSWORD="password" \
 -p SSO_ADMIN_USERNAME="admin" \
 -p SSO_ADMIN_PASSWORD="Redhat1!" \
 -p SSO_REALM="eap-js-realm" \
 -p SSO_TRUSTSTORE="truststore.jks" \
 -p SSO_TRUSTSTORE_PASSWORD="mykeystorepass" \
 -p SSO_TRUSTSTORE_SECRET="sso-app-secret" \
