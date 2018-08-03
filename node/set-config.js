'use strict';

const editJsonFile = require('edit-json-file');
const keycloakPath = `${__dirname}/dist/assets/data/keycloak.json`;
const authUrl = process.env.AUTH_URL || 'https://192.168.42.1:8543/auth';
const enabled = process.env.KEYCLOAK || true;
const urlKey = 'auth-server-url';
const enabledKey = 'enabled';

console.log(`Setting \"${urlKey}\" to ${authUrl} in ${keycloakPath}\n`);
console.log(`Setting \"${enabledKey}\" to ${enabled} in ${keycloakPath}\n`);

let file = editJsonFile(keycloakPath);

file.set(urlKey, authUrl);
file.set(enabledKey, enabled);

file.save();

console.log(file.get());