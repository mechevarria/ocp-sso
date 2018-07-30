#!/bin/bash

oc login -u developer

oc project nodejs-eap
oc delete all --selector app=nodejs-app
