(function () {
    'use strict';

    angular
        .module('app.classCheckIn')
        .factory('createNewUserModal', createNewUserModal);

    /* @ngInject */
    function createNewUserModal($uibModal, $q, userRepository, niceAlert) {
        var modalInstance;

        var service = {
            open: open
        };

        return service;

        function open(student) {

            var newUser = {};

            if (student) {
                var splitName = student.split(' ');
                if (splitName.length > 0) {
                    newUser.firstName = splitName[0];
                }
                if (splitName.length > 1) {
                    newUser.surname = splitName[1];
                }
            }

            var deferred = $q.defer();

            modalInstance = $uibModal.open({
                templateUrl: 'app/classCheckIn/createNewUser/createNewUser.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    viewModel: function () {
                        return {
                            newUser: newUser,
                            register: register
                        };
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

        function register(newUser, viewModel) {
            userRepository.create(newUser).then(function (user) {
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
