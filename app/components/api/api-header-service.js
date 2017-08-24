(function () {
    'use strict';

    angular.module('patternfly.app')
        .factory('ApiHeaderSrvc', Service);

    Service.$inject = ['$q', '$location', 'AuthSrvc'];

    function Service($q, $location, AuthSrvc) {

        var methods = {};

        methods.request = function (config) {
            var deferred = $q.defer();
            if (AuthSrvc.keycloak.token) {
                AuthSrvc.keycloak.updateToken(5).success(function () {
                    config.headers = config.headers || {};
                    config.headers.Authorization = 'Bearer ' + AuthSrvc.keycloak.token;

                    deferred.resolve(config);
                }).error(function () {
                    $location(AuthSrvc.logoutUrl);
                });
            }
            return deferred.promise;
        };

        return methods;
    }
})();