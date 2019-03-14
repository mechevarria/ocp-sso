#!/usr/bin/env bash

# https://docs.okd.io/latest/dev_guide/copy_files_to_container.html

pod_name=$(oc get pods --selector app=sso73-x509-postgresql-persistent | { read line1 ; read line2 ; echo "$line2" ; } | awk '{print $1;}')

oc rsync themes/coreui ${pod_name}:/opt/eap/themes/
