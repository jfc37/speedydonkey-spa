(function () {
    'use strict';

    angular
        .module('app.standAloneEvents')
        .directive('walkInStudent', walkInStudent);

    /* @ngInject */
    function walkInStudent() {
        return {
            restrict: 'E',
            bindToController: true,
            controllerAs: 'vm',
            templateUrl: 'app/standAloneEvents/checkIn/walkInStudent/walkInStudent.html',
            scope: {
                students: '='
            },
            /*@ngInject*/
            controller: function () {
                var vm = this;

                vm.addWalkIn = function () {
                    vm.students.push({
                        id: vm.selectedStudent.id
                    });

                    vm.selectedStudent = undefined;
                };
            }
        };
    }
})();
