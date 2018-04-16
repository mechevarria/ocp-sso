(function () {
    'use strict';

    var keycloak = Keycloak();

    angular.element(document).ready(function () {
        keycloak.init({onLoad: 'login-required'})
            .success(loadProfile)
            .error(notLoggedIn);
    });

    function loadProfile() {
        keycloak.loadUserProfile()
            .success(loggedIn)
            .error(reload);
    }

    function loggedIn(profile) {
        var auth = {
            loggedIn: true,
            keycloak: keycloak,
            profile: profile,
            logoutUrl: keycloak.authServerUrl + '/realms/' + keycloak.realm + '/protocol/openid-connect/logout?redirect_uri=' + window.location.href
        };

        loadAngular(auth);
    }

    function notLoggedIn() {
        var auth = {
            loggedIn: false,
            keycloak: keycloak,
            profile: {},
            logoutUrl: window.location.href
        };

        loadAngular(auth);

    }

    function loadAngular(auth) {
        angular.module('patternfly.app').factory('AuthSrvc', function () {
            return auth;
        });
        angular.bootstrap(document, ['patternfly.app']);
    }

    function reload() {
        window.location.reload();
    }

})();