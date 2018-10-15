#!/usr/bin/env bash

# prefixing project with user to allow multiple people building the same project on the same cluster
proj_name="$(oc whoami)-ntier"
oc project ${proj_name}

oc new-app \
--name=springboot-app \
-p APPLICATION_NAME=springboot-app \
-p SOURCE_REPOSITORY_URL=https://github.com/mechevarria/ocp-sso \
-p SOURCE_REPOSITORY_REF=master \
-p CONTEXT_DIR=/springboot \
openjdk18-web-basic-s2i

oc set env --from=configmap/ntier-config dc/springboot-app