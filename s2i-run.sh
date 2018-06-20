#!/bin/bash

port=8080
tag=s2i-build/jboss-api

docker run \
-p ${port}:${port} \
-e DB_SERVICE_PREFIX_MAPPING=db-postgresql=PG \
-e PG_DATABASE=jboss \
-e PG_USERNAME=jboss \
-e PG_PASSWORD=jboss \
-e DB_POSTGRESQL_SERVICE_HOST=192.168.42.101 \
-e DB_POSTGRESQL_SERVICE_PORT=5432 \
-e PG_DRIVER=postgresql \
-e PG_JNDI=java:/PostgresDS \
-e AUTH_SERVER_URL=http://192.168.42.1:8180/auth \
${tag} \
