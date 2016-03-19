(function () {
    'use strict';

    angular
        .module('app.manageClasses')
        .controller('Class', Class);

    function Class($routeParams, classService) {
        var vm = this;

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
