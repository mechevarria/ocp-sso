(function () {
    'use strict';

    angular.element(document).ready(function () {
        var keycloak = Keycloak();

        keycloak.init({onLoad: 'login-required'})
            .success(function () {
                keycloak.loadUserProfile()
                    .success(function (profile) {
                        angular.module('patternfly.app').factory('AuthSrvc', function () {
                            return {
                                keycloak: keycloak,
                                profile: profile,
                                logoutUrl: keycloak.authServerUrl + '/realms/eap-node-realm/protocol/openid-connect/logout?redirect_uri=http://localhost:8181'
                            };
                        });
                        angular.bootstrap(document, ['patternfly.app']);
                    });
            })
            .error(function () {
                window.location.reload();
            });
    });

})();