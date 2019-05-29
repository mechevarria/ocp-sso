// blank values are replaced at runtime by the set-config.js node script
(function(window) {
  window._env = window._env || {};

  window._env.url = '${AUTH_URL}';
  window._env.realm = 'java-js-realm';
  window._env.clientId = 'js';
  window._env.enabled = '${KEYCLOAK}';
})(this);
