(function () {
    'use strict';

    angular
        .module('app.standAloneEvents')
        .directive('studentCheckIn', studentCheckIn);

    /* @ngInject */
    function studentCheckIn() {
        return {
            restrict: 'E',
            bindToController: true,
            controllerAs: 'vm',
            templateUrl: 'app/standAloneEvents/checkIn/studentCheckIn/studentCheckIn.html',
            scope: {
                students: '='
            },
            /*@ngInject*/
            controller: function (logger, eventCheckInService) {
                var vm = this;

                vm.attendenceStatusChanged = function (student) {
                    eventCheckInService.attendenceStatusChanged(student).then(function (message) {
                        logger.success(message);
                    }, function (message) {
                        logger.error(message);
                    });
                };
            }
        };
    }
})();
