(function () {
    'use strict';

    angular
        .module('app.manageTeachers')
        .factory('editRateModal', editRateModal);

    /* @ngInject */
    function editRateModal($uibModal, $q, niceAlert, teacherRateRepository, workingModelService) {
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
                            workingModel: workingModelService.create(teacher),
                            update: update
                        };
                    }
                }
            });

            return modalInstance.result;

        }

        function update(workingModel) {
            teacherRateRepository.update(workingModel.copy).then(function () {
                workingModel.commitChanges();

                niceAlert.success('Rates have been updated for ' + workingModel.original.name + '.');
            }, function () {
                niceAlert.error('Problem with updating rates for ' + workingModel.original.name + '.');
            }).finally(function () {
                modalInstance.close();
            });
        }
    }
})();
