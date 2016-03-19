(function () {
    'use strict';

    angular
        .module('app.managePassOptions')
        .controller('CreatePassOption', CreatePassOption);

    /* @ngInject */
    function CreatePassOption($routeParams, passOptionRepository, routehelper, niceAlert, selectOptionService) {
        var vm = this;
        vm.passOption = {};

        vm.submit = function () {
            passOptionRepository.create(vm.passOption).then(function () {
                niceAlert.success({
                    message: 'Pass option was successfully created.'
                });
                routehelper.redirectToRoute('managePassOptions');
            }, function (validation) {
                if (validation) {
                    vm.serverValidation = validation;
                    niceAlert.validationWarning();
                } else {
                    niceAlert.error({
                        message: 'There was a problem creating the pass option.'
                    });
                }
            });
        };

        activate();

        function activate() {
            vm.passTypes = selectOptionService.getPassTypes();
        }
    }
})();
