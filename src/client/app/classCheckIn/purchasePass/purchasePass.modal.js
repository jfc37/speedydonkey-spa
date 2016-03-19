(function () {
    'use strict';

    angular
        .module('app.classCheckIn')
        .factory('purchasePassModal', purchasePassModal);

    /* @ngInject */
    function purchasePassModal($uibModal, $q, passOptionRepository, studentPassRepository, niceAlert) {
        var modalInstance;
        var viewModel = {
            purchaseNewPass: purchaseNewPass
        };

        var service = {
            open: openModal
        };

        return service;

        function openModal(student) {

            var deferred = $q.defer();

            passOptionRepository.getAll(true).then(function (passOptions) {
                viewModel.student = student;
                viewModel.passOptions = passOptions;

                modalInstance = $uibModal.open({
                    templateUrl: 'app/classCheckIn/purchasePass/purchasePass.html',
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
            });

            return deferred.promise;
        }

        function purchaseNewPass() {
            studentPassRepository.purchase(viewModel.student, viewModel.selectedPass).then(function (pass) {
                niceAlert.success('Pass number for ' + viewModel.student.fullName + ': ' + pass.passNumber);
            }, function () {
                niceAlert.error('Problem with purchasing the pass.');
            }).finally(function () {
                modalInstance.close();
            });
        }
    }
})();

(function () {
    'use strict';

    angular.module('app.classCheckIn').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, viewModel) {

        $scope.viewModel = viewModel;

        $scope.ok = function () {
            $uibModalInstance.close($scope.viewModel);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss(false);
        };
    });

})();
