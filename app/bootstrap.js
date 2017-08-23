(function () {
    'use strict';

    angular.element(document).ready(function () {
        var keycloak = Keycloak();

        keycloak.init({onLoad: 'login-required'})
            .success(function () {
                angular.bootstrap(document, ['patternfly.app']);
            })
            .error(function () {
                window.location.reload();
            });
    });

})();