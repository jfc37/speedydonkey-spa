(function () {
    'use strict';

    angular
        .module('app.manageTeachers')
        .factory('editRateModal', editRateModal);

    /* @ngInject */
    function editRateModal($uibModal, $q, niceAlert, teacherRateRepository) {
        var modalInstance;

        var service = {
            open: openModal
        };

        return service;

        function openModal(teacher) {

            modalInstance = $uibModal.open({
                templateUrl: 'app/manageTeachers/editRate/editRate.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    viewModel: function () {
                        return {
                            teacher: teacher,
                            update: update
                        };
                    }
                }
            });

            return modalInstance.result;

        }

        function update(teacher) {
            teacherRateRepository.update(teacher).then(function () {
                niceAlert.success('Rates have been updated for ' + teacher.name + '.');
            }, function () {
                niceAlert.error('Problem with updating rates for ' + teacher.name + '.');
            }).finally(function () {
                modalInstance.close();
            });
        }
    }
})();
