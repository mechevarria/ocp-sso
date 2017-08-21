(function () {
    'use strict';

    angular.module('patternfly.app')
        .controller('ItemCtrl', Controller);

    Controller.$inject = ['$uibModal', 'NotifySrvc', 'ItemSrvc'];

    function Controller($uibModal, NotifySrvc, ItemSrvc) {
        var $ctrl = this;

        $ctrl.pageConfig = {
            pageNumber: 1,
            pageSize: 10,
            pageSizeIncrements: [5, 10, 20]
        };

        $ctrl.columns = [
            {header: 'ID', itemField: 'id'},
            {header: 'Year', itemField: 'year'},
            {header: 'Make', itemField: 'make'},
            {header: 'Model', itemField: 'model'},
            {header: 'Created', itemField: 'createDate'},
            {header: 'Updated', itemField: 'lastUpdateDate'}
        ];

        $ctrl.config = {
            selectionMatchProp: 'id',
            itemsAvailable: true,
            showCheckboxes: false
        };

        $ctrl.update = function (item) {
            $ctrl.item = ItemSrvc.get({
                id: item.id
            });

            $ctrl.open($ctrl.item);
        };

        $ctrl.delete = function (id) {
            ItemSrvc.delete({id: id},
                function () {
                    NotifySrvc.success('Car deleted successfully');
                    reload();
                }, function (err) {
                    NotifySrvc.error(err.status + ', ' + err.statusText);
                });
        };

        $ctrl.save = function (item) {
            if (item.id) {
                ItemSrvc.update(item,
                    function () {
                        NotifySrvc.success('Car updated successfully');
                        reload();
                    }, function (err) {
                        NotifySrvc.error(err.status + ', ' + err.statusText);
                    });
            } else {
                ItemSrvc.save(item,
                    function () {
                        NotifySrvc.success('Car saved successfully');
                        reload();
                    }, function (err) {
                        NotifySrvc.error(err.status + ', ' + err.statusText);
                    });
            }
        };

        $ctrl.clear = function () {
            $ctrl.items = [];
        };

        $ctrl.confirm = function (item) {
            var itemDelete = $uibModal.open({
                component: 'appItemDelete',
                resolve: {
                    item: function () {
                        return item;
                    }
                }
            });

            itemDelete.result.then(function (entity) {
                $ctrl.delete(entity.id);
            });
        };

        $ctrl.open = function (item) {
            var itemSave = $uibModal.open({
                component: 'appItemEdit',
                resolve: {
                    item: function () {
                        return item;
                    }
                }
            });

            itemSave.result.then(function (entity) {
                $ctrl.save(entity);
            });
        };

        function reload() {
            $ctrl.clear();
            ItemSrvc.query(function (resp) {
                $ctrl.items = resp
            }, function (err) {
                NotifySrvc.error(err.status + ', ' + err.statusText);
            });
        }

        $ctrl.$onInit = reload();
    }
})();
