#!/usr/bin/env bash

oc login -u admin

# Copied from https://red.ht/2EvS3gl

for resource in sso73-image-stream.json \
  sso73-https.json \
  sso73-mysql.json \
  sso73-mysql-persistent.json \
  sso73-postgresql.json \
  sso73-postgresql-persistent.json \
  sso73-x509-https.json \
  sso73-x509-mysql-persistent.json \
  sso73-x509-postgresql-persistent.json
do
  oc replace -n openshift --force -f \
  https://raw.githubusercontent.com/jboss-container-images/redhat-sso-7-openshift-image/sso73-dev/templates/${resource}
done
