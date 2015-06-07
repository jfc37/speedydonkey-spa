(function () {
    'use strict';

    angular
        .module('app.manageStudents')
        .controller('ManageStudents', ManageStudents);

    ManageStudents.$inject = ['$q', 'logger', 'manageStudentsService'];

    /* @ngInject */
    function ManageStudents($q, logger, manageStudentsService) {
        /*jshint validthis: true */
        var vm = this;
        vm.students = [];
        vm.filter = {};

        vm.deletePass = function (student, pass) {
            manageStudentsService.deletePass(pass.id).then(function () {
                student.studentInfo.passes.remove(pass);
                logger.success('Pass deleted');
            }, function () {
                logger.error('Problem deleting pass');
            });
        };

        activate();

        function activate() {
            var promises = [getStudents()];
            return $q.all(promises)
                .then(function () {
                    logger.info('Activated Manage Students');
                });
        }

        function getStudents() {
            $q(function (resolve) {
                manageStudentsService.getStudents().then(function (students) {
                    vm.students = students;
                    resolve();
                }, function () {
                    logger.error('Failed getting students');
                });
            });
        }
    }
})();
