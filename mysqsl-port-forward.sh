#!/usr/bin/env bash

# https://docs.openshift.com/container-platform/3.10/dev_guide/port_forwarding.html

name='mysql'
port=3306

pod_name=$(oc get pods --selector app=${name} | { read line1 ; read line2 ; echo "$line2" ; } | awk '{print $1;}')

echo "Setup ${name} connection in your IDE with localhost and port ${port}"
oc port-forward ${pod_name} ${port}:${port}