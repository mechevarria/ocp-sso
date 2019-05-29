#!/usr/bin/env bash

export PORT=4200
export EAP="https://eap-app-developer-ntier.192.168.42.119.nip.io/"
export SPRINGBOOT="http://springboot-app-developer-ntier.192.168.42.119.nip.io/"
export AUTH_URL="https://sso-developer-ntier.192.168.42.119.nip.io/auth"
export KEYCLOAK="true"

npm run start
