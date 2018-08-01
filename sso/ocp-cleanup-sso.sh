#!/bin/bash

oc project ntier
oc delete all --selector app=sso72-postgresql-persistent
