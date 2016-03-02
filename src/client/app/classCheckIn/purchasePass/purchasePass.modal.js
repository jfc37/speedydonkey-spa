(function () {
    'use strict';

    angular
        .module('app.classCheckIn')
        .factory('purchasePassModal', purchasePassModal);

    /* @ngInject */
    function purchasePassModal($uibModal, $q, passOptionRepository, studentPassRepository, niceAlert) {
        var modalInstance;

        var service = {
            open: open
        };

        return service;

        function open(student) {

            var deferred = $q.defer();

            passOptionRepository.getAll(true).then(function (passOptions) {

                modalInstance = $uibModal.open({
                    templateUrl: 'app/classCheckIn/purchasePass/purchasePass.html',
                    controller: 'ModalInstanceCtrl',
                    size: 'lg',
                    resolve: {
                        viewModel: function () {
                            return {
                                student: student,
                                passOptions: passOptions,
                                purchaseNewPass: purchaseNewPass
                            };
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

        function purchaseNewPass(student, passOption) {
            studentPassRepository.purchase(student, passOption).then(function () {
                niceAlert.success('New pass has been purchased for ' + student.fullName + '.');
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
