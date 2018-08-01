#!/bin/bash

openssl req -new -newkey rsa:4096 -x509 -keyout xpaas.key -out xpaas.crt -days 365 -subj "/CN=xpaas-sso.ca"

echo "provide mykeystorepass as the password"
keytool -genkeypair -keyalg RSA -keysize 2048 -dname "CN=secure-sso-app.openshift.example.com" -alias jboss -keystore keystore.jks

keytool -certreq -keyalg rsa -alias jboss -keystore keystore.jks -file sso.csr

openssl x509 -req -CA xpaas.crt -CAkey xpaas.key -in sso.csr -out sso.crt -days 365 -CAcreateserial

# reply yes to trust this certificate
keytool -import -file xpaas.crt -alias xpaas.ca -keystore keystore.jks

keytool -import -file sso.crt -alias jboss -keystore keystore.jks

echo "provide password as the jgroups password"
keytool -genseckey -alias secret-key -storetype JCEKS -keystore jgroups.jceks

echo "provide mykeystorepass as the password"
keytool -import -file xpaas.crt -alias xpaas.ca -keystore truststore.jks
