#!/bin/bash

oc project ntier
oc delete all --selector app=sso72-x509-postgresql-persistent
