(function () {
    'use strict';

    angular
        .module('app.classCheckIn')
        .factory('createNewUserModal', createNewUserModal);

    /* @ngInject */
    function createNewUserModal($uibModal, $q, userRepository, niceAlert) {
        var modalInstance;
        var viewModel = {
            register: register
        };

        var service = {
            open: openModal
        };

        return service;

        function openModal(student) {

            viewModel.newUser = {};

            if (student) {
                var splitName = student.split(' ');
                if (splitName.length > 0) {
                    viewModel.newUser.firstName = splitName[0];
                }
                if (splitName.length > 1) {
                    viewModel.newUser.surname = splitName[1];
                }
            }

            var deferred = $q.defer();

            modalInstance = $uibModal.open({
                templateUrl: 'app/classCheckIn/createNewUser/createNewUser.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    viewModel: function () {
                        return viewModel;
                    }
                }
            });

            modalInstance.result.then(function (newUser) {
                deferred.resolve(newUser);
            }, function () {
                deferred.reject();
            });

            return deferred.promise;
        }

        function register() {
            userRepository.create(viewModel.newUser).then(function (user) {
                modalInstance.close(user);
            }, function (validation) {
                if (validation) {
                    viewModel.serverValidation = validation;
                    niceAlert.validationWarning();
                } else {
                    niceAlert.error('Problem creating the user.');
                }
            });
        }
    }
})();
