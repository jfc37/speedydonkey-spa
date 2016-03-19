(function () {
    'use strict';

    angular
        .module('app.classCheckIn')
        .directive('changeTeachers', changeTeachers);

    function changeTeachers() {
        return {
            restrict: 'E',
            scope: {
                'ngModel': '='
            },
            templateUrl: 'app/classCheckIn/changeTeachers/changeTeachers.html',
            controllerAs: 'vm',
            /* @ngInject */
            controller: function (classService, niceAlert) {
                var vm = this;

                vm.updateTeachers = function (theClass) {
                    classService.updateTeachers(theClass).then(function () {

                    }, function () {
                        niceAlert.error('Problem updating teachers.');
                    });
                };
            }
        };
    }
})();
