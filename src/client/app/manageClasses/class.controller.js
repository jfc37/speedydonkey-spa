(function () {
    'use strict';

    angular
        .module('app.manageClasses')
        .controller('Class', Class);

    function Class($routeParams, classService, routehelper, validationService) {
        var vm = this;

        vm.submit = function (form) {
            classService.update(vm.class).then(function () {
                routehelper.redirectToRoute('manageBlocks');
            }, function (errors) {
                validationService.applyServerSideErrors(form, errors);
            });
        };

        activate();

        function activate() {
            getClass();
        }

        function getClass() {
            classService.getClass($routeParams.id).then(function (theClass) {
                vm.class = theClass;
            });
        }
    }
})();
