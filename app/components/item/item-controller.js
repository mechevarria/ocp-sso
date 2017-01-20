(function() {
    'use strict';

    angular.module('jboss-client')
        .controller('ItemCtrl', Controller);

    Controller.$inject = ['$scope', '$uibModal', 'ItemSrvc'];

    function Controller($scope, $uibModal, ItemSrvc) {

        $scope.create = function() {
            $scope.clear();
            $scope.open();
        };

        $scope.update = function(id) {
            $scope.item = ItemSrvc.get({
                id: id
            });
            $scope.open(id);
        };
        
        $scope.delete = function(id) {
            ItemSrvc.delete({
                    id: id
                },
                function() {
                    activate();
                });
        };

        $scope.save = function(item) {
            if (item.id) {
                ItemSrvc.update({
                        id: item.id
                    }, $scope.item,
                    function() {
                        activate();
                    });
            } else {
                ItemSrvc.save(item,
                    function() {
                        activate();
                    });
            }
        };

        $scope.clear = function() {
            $scope.items = [];
            $scope.displayedItems = [];
            $scope.item = {
                'year': '',
                'make': '',
                'id': '',
                'model': ''
            };
        };

        $scope.confirm = function(item) {
            var itemDelete = $uibModal.open({
                templateUrl: 'app/components/item/item-delete.html',
                controller: 'ItemDeleteCtrl',
                resolve: {
                    item: function() {
                        return item;
                    }
                }
            });

            itemDelete.result.then(function(entity) {
                $scope.delete(entity.id);
            });
        };

        $scope.open = function(item) {
            var itemSave = $uibModal.open({
                templateUrl: 'app/components/item/item-save.html',
                controller: 'ItemSaveCtrl',
                resolve: {
                    item: function() {
                        return item;
                    }
                }
            });

            itemSave.result.then(function(entity) {
                $scope.save(entity);
            });
        };

        ////////////

        function activate() {
            $scope.clear();
            //$scope.items = ItemSrvc.query();
            $scope.items = [];
            $scope.displayedItems = $scope.items;
        }

        activate();
    }
})();
