(function() {
    'use strict';

    angular.module('patternfly.app')
        .controller('ItemCtrl', Controller);

    Controller.$inject = ['$scope', '$uibModal', 'ItemSrvc'];

    function Controller($scope, $uibModal, ItemSrvc) {

        $scope.create = function() {
            $scope.open();
        };

        $scope.update = function(item) {
            $scope.item = ItemSrvc.get({
                id: item.id
            });

            $scope.open($scope.item);
        };

        $scope.delete = function(id) {
            ItemSrvc.delete({
                    id: id
                },
                function() {
                    $scope.$emit('success', 'Car deleted successfully');
                    activate();
                });
        };

        $scope.save = function(item) {
            if (item.id) {
                ItemSrvc.update(item,
                    function() {
                        $scope.$emit('success','Car updated successfully');
                        activate();
                    });
            } else {
                ItemSrvc.save(item,
                    function() {
                        $scope.$emit('success','Car saved successfully');
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
                'model': '',
                'createDate' : '',
                'lastUpdateDate' : ''
            };
        };

        $scope.confirm = function(item) {
            var itemDelete = $uibModal.open({
                templateUrl: 'app/components/item/delete/item-delete.html',
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
                templateUrl: 'app/components/item/edit/item-edit.html',
                controller: 'ItemEditCtrl',
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
            $scope.items = ItemSrvc.query();
            $scope.displayedItems = $scope.items;
        }

        activate();
    }
})();
