(function () {
    'use strict';

    angular
        .module('app.managePassOptions')
        .controller('ManagePassOptions', ManagePassOptions);

    /* @ngInject */
    function ManagePassOptions($q, passOptionRepository, niceAlert) {
        var vm = this;
        vm.passTypes = [];
        vm.passOptions = [];

        vm.confirmDelete = function () {
            niceAlert.confirm({
                message: 'All selected pass options will be deleted.'
            }, deleteSelected);
        };

        function deleteSelected() {
            var toDelete = getSelected();
            passOptionRepository.delete(toDelete).then(function () {
                niceAlert.success({
                    message: 'Selected pass options have been deleted.'
                });
                toDelete.forEach(function (passOption) {
                    vm.passOptions.remove(passOption);
                });
            }, function () {
                niceAlert.error({
                    message: 'Problem deleting pass options.'
                });
            });
        }

        function getSelected() {
            return vm.passOptions.filter(function (passOption) {
                return passOption.selected;
            });
        }

        activate();

        function activate() {
            return getPassOptions();
        }

        function getPassOptions() {
            passOptionRepository.getAll().then(function (passOptions) {
                vm.passOptions = passOptions;
            }, function (response) {
                niceAlert.error({
                    message: 'Problem getting pass options'
                });
            });
        }
    }
}());
