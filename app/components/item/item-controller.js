(function() {
    'use strict';

    angular.module('patternfly.app')
        .controller('ItemCtrl', Controller);

    Controller.$inject = ['$rootScope', '$uibModal', 'ItemSrvc'];

    function Controller($rootScope, $uibModal, ItemSrvc) {
        var $ctrl = this;

        $ctrl.create = function() {
            $ctrl.open();
        };

        $ctrl.update = function(item) {
            $ctrl.item = ItemSrvc.get({
                id: item.id
            });

            $ctrl.open($ctrl.item);
        };

        $ctrl.delete = function(id) {
            ItemSrvc.delete({
                    id: id
                },
                function() {
                    $rootScope.$emit('success', 'Car deleted successfully');
                    reload();
                });
        };

        $ctrl.save = function(item) {
            if (item.id) {
                ItemSrvc.update(item,
                    function() {
                        $rootScope.$emit('success','Car updated successfully');
                        reload();
                    });
            } else {
                ItemSrvc.save(item,
                    function() {
                        $rootScope.$emit('success','Car saved successfully');
                        reload();
                    });
            }
        };

        $ctrl.clear = function() {
            $ctrl.items = [];
            $ctrl.displayedItems = [];
            $ctrl.item = {
                'year': '',
                'make': '',
                'id': '',
                'model': '',
                'createDate' : '',
                'lastUpdateDate' : ''
            };
        };

        $ctrl.confirm = function(item) {
            var itemDelete = $uibModal.open({
                component: 'appItemDelete',
                resolve: {
                    item: function() {
                        return item;
                    }
                }
            });

            itemDelete.result.then(function(entity) {
                $ctrl.delete(entity.id);
            });
        };

        $ctrl.open = function(item) {
            var itemSave = $uibModal.open({
                component: 'appItemEdit',
                resolve: {
                    item: function() {
                        return item;
                    }
                }
            });

            itemSave.result.then(function(entity) {
                $ctrl.save(entity);
            });
        };

        function reload() {
            $ctrl.clear();
            $ctrl.items = ItemSrvc.query();
            $ctrl.displayedItems = $ctrl.items;
        }

        $ctrl.$onInit = reload();
    }
})();
