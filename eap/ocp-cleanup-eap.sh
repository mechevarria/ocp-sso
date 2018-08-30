#!/bin/bash

oc project ntier
oc delete all --selector app=eap-app
oc delete dc/postgresql
oc delete all --selector name=postgresql
oc delete service postgresql
oc delete secret credentials
oc delete secret postgresql
