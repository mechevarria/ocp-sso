#!/bin/bash

keystore=application.keystore
config_dir="${HOME}/local/runtimes/eap/standalone/configuration"

echo "generating ${keystore} in ${config_dir}"

keytool -genkey -keyalg RSA -keystore ${config_dir}/${keystore} -storepass password -keypass password -validity 999 -alias server -dname "cn=EAP,o=Red Hat,c=US"
