(function () {
    'use strict';

    angular
        .module('app.managePassOptions')
        .controller('UpdatePassOption', UpdatePassOption);

    /* @ngInject */
    function UpdatePassOption($routeParams, passOptionRepository, routehelper, niceAlert, selectOptionService) {
        var vm = this;

        vm.submit = function () {
            passOptionRepository.update(vm.passOption).then(function () {
                niceAlert.success({
                    message: 'Pass option was successfully updated.'
                });
                routehelper.redirectToRoute('managePassOptions');
            }, function (validation) {
                if (validation) {
                    vm.serverValidation = validation;
                    niceAlert.validationWarning();
                } else {
                    niceAlert.error({
                        message: 'There was a problem updating the pass option.'
                    });
                }
            });
        };

        activate();

        function activate() {
            vm.passTypes = selectOptionService.getPassTypes();
            getPassOption();
        }

        function getPassOption() {
            passOptionRepository.get($routeParams.id).then(function (passOption) {
                vm.passOption = passOption;
            }, function () {
                niceAlert.error({
                    message: 'There was a problem loading the pass option.'
                });
            });
        }
    }
})();
