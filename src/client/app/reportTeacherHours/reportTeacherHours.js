(function () {
    'use strict';

    angular
        .module('app.reportTeacherHours')
        .controller('ReportTeacherHours', ReportTeacherHours);

    /* @ngInject */
    function ReportTeacherHours($q, reportTeacherHoursService, logger, validationService) {
        /*jshint validthis: true */
        var vm = this;
        vm.teacherHours = [];
        vm.starting = moment().subtract(1, 'month').startOf('day').format('YYYY-MM-DD');
        vm.ending = moment().endOf('day').format('YYYY-MM-DD');

        vm.getHours = function () {
            reportTeacherHoursService.getTeacherHours(vm.starting, vm.ending).then(function (teacherHours) {
                vm.teacherHours = teacherHours;
            });
        };

        activate();

        function activate() {
            var promises = [vm.getHours()];
            return $q.all(promises)
                .then(function () {
                    logger.info('Activated Teacher Hours Report');
                });
        }
    }
})();
