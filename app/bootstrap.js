(function () {
    'use strict';

    var keycloak = Keycloak();

    angular.element(document).ready(function () {
        keycloak.init({onLoad: 'login-required'})
            .success(loadProfile)
            .error(reload);
    });

    function loadProfile() {
        keycloak.loadUserProfile()
            .success(saveAuthLoadAngular)
            .error(reload);
    }

    function saveAuthLoadAngular(profile) {
        angular.module('patternfly.app').factory('AuthSrvc', function () {
            return {
                keycloak: keycloak,
                profile: profile,
                logoutUrl: keycloak.authServerUrl + '/realms/' + keycloak.realm + '/protocol/openid-connect/logout?redirect_uri=' + window.location.href
            };
        });
        // Finally load the angular application
        angular.bootstrap(document, ['patternfly.app']);
    }

    function reload() {
        window.location.reload();
    }

})();