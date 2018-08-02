#!/bin/bash

oc delete secret keycloak-secret

oc secrets new keycloak-secret src/assets/data/keycloak.json

oc volume dc/nodejs-app --add --name=keycloak-volume --type=secret --secret-name=keycloak-secret --mount-path=/opt/app-root/src/dist/assets/data --overwrite
