(function () {
    'use strict';

    angular
        .module('app.manageStudents')
        .factory('managePassModal', managePassModal);

    /*@ngInject*/
    function managePassModal($q, $uibModal, studentPassRepository, niceAlert) {
        var modalInstance;
        var viewModel = {
            update: update
        };

        var service = {
            open: openModal
        };

        function openModal(pass) {
            viewModel.pass = pass;
            viewModel.serverValidation = [];
            var deferred = $q.defer();
            modalInstance = $uibModal.open({
                templateUrl: 'app/manageStudents/managePass/managePass.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    viewModel: function () {
                        return viewModel;
                    }
                }
            });

            modalInstance.result.then(function () {
                deferred.resolve();
            }, function () {
                deferred.reject();
            });

            return deferred.promise;
        }

        function update() {
            studentPassRepository.update(viewModel.pass).then(function () {
                niceAlert.success(viewModel.pass.passNumber + ' has been updated.');
                modalInstance.close();
            }, function (validation) {
                if (validation) {
                    viewModel.serverValidation = validation;
                } else {
                    niceAlert.error('Problem updating pass ' + viewModel.pass.passNumber);
                    modalInstance.close();
                }
            });
        }

        return service;
    }
})();
