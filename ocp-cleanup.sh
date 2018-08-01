#!/bin/bash

oc project nodejs-eap
oc delete all --selector app=nodejs-app
