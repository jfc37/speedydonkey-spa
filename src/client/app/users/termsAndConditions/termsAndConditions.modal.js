(function () {
    'use strict';

    angular
        .module('app.users')
        .factory('termsAndConditionsModal', termsAndConditionsModal);

    /* @ngInject */
    function termsAndConditionsModal($sce, $uibModal, $q, termsAndConditionsRepository, niceAlert) {
        var modalInstance;
        var viewModel = {
            agree: agree
        };

        var service = {
            open: openModal
        };

        return service;

        function openModal() {
            var deferred = $q.defer();

            termsAndConditionsRepository.get().then(function (terms) {
                viewModel.termsAndConditions = $sce.trustAsHtml(terms);

                modalInstance = $uibModal.open({
                    templateUrl: 'app/users/termsAndConditions/termsAndConditions.html',
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

        function agree() {
            termsAndConditionsRepository.agree().then(function() {
                modalInstance.close();
                niceAlert.success('Thank you for agreeing to the terms and conditions.');
            }, function (validation) {
                if (validation) {
                    viewModel.serverValidation = validation;
                    niceAlert.validationWarning();
                } else {
                    niceAlert.error('Problem recording your answer.');
                }
            });
        }
    }
})();
