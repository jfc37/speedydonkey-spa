(function () {
    'use strict';

    angular
        .module('app.classCheckIn')
        .directive('changeTeachers', changeTeachers);

    /* @ngInject */
    function changeTeachers(classService, logger) {
        return {
            restrict: 'E',
            scope: {
                'ngModel': '='
            },
            templateUrl: 'app/classCheckIn/changeTeachers/changeTeachers.html',
            controllerAs: 'vm',
            controller: function () {
                var vm = this;

                vm.updateTeachers = function (theClass) {
                    classService.updateTeachers(theClass).then(function () {

                    }, function (errors) {
                        logger.error('Problem updating teachers');
                    });
                };
            }
        };
    }
})();
