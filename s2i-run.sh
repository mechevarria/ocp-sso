#!/bin/bash

port=8080
tag=s2i-build/jboss-api

docker run \
-p ${port}:${port} \
-e PG_CONNECTION_URL=jdbc:postgresql://192.168.42.101:5432/jboss \
-e PG_USERNAME=jboss \
-e PG_PASSWORD=jboss \
-e AUTH_SERVER_URL=http://192.168.42.1:8180/auth \
${tag} \
