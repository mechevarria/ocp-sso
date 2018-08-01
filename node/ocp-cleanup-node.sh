#!/bin/bash

oc project ntier
oc delete all --selector app=nodejs-app
