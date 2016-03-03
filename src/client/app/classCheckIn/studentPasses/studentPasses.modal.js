(function () {
    'use strict';

    angular
        .module('app.classCheckIn')
        .factory('studentPassesModal', studentPassesModal);

    /* @ngInject */
    function studentPassesModal($uibModal, $q, userRepository, purchasePassModal, niceAlert) {
        var modalInstance;

        var service = {
            open: open
        };

        return service;

        function open(studentId) {

            var deferred = $q.defer();

            userRepository.get(studentId).then(function (student) {

                var today = moment().startOf('day');

                var validPasses = student.passes.filter(function (pass) {
                    if (today.isBefore(pass.endDate)) {
                        if (pass.clipsRemaining < 1) {
                            return false;
                        }
                        return true;
                    }
                    return false;
                });

                modalInstance = $uibModal.open({
                    templateUrl: 'app/classCheckIn/studentPasses/studentPasses.html',
                    controller: 'ModalInstanceCtrl',
                    size: 'lg',
                    resolve: {
                        viewModel: function () {
                            return {
                                student: student,
                                passes: validPasses,
                                openPassPurchase: openPassPurchase
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

        function openPassPurchase(student) {
            modalInstance.close();
            purchasePassModal.open(student).finally(function () {
                open(student.id);
            });
        }
    }
})();
