#!/bin/bash

oc login -u admin

for resource in sso72-image-stream.json \
  sso72-https.json \
  sso72-mysql.json \
  sso72-mysql-persistent.json \
  sso72-postgresql.json \
  sso72-postgresql-persistent.json \
  sso72-x509-https.json \
  sso72-x509-mysql-persistent.json \
  sso72-x509-postgresql-persistent.json
do
  oc replace -n openshift --force -f \
  https://raw.githubusercontent.com/jboss-openshift/application-templates/ose-v1.4.11/sso/${resource}
done

oc -n openshift import-image redhat-sso72-openshift:1.1
