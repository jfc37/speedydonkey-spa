(function () {
    'use strict';

    angular
        .module('app.users')
        .factory('missingUserDetailsModal', missingUserDetailsModal)
        .controller('MissingUserDetailsModalController', MissingUserDetailsModalController);

    /* @ngInject */
    function missingUserDetailsModal($q, $modal, simpleApiCaller) {
        var service = {
            open: openModal
        };

        function openModal(user) {
            var modalInstance = $modal.open({
                templateUrl: 'app/users/missingDetails/missingUserDetails.module.html',
                controller: 'MissingUserDetailsModalController',
                resolve: {
                    user: function () {
                        return user;
                    }
                }
            });

            return modalInstance.result;
        }

        function getOptions() {
            return {
                resource: 'users/current/names'
            };
        }

        return service;
    }

    function MissingUserDetailsModalController($scope, $modalInstance, simpleApiCaller, user) {
        $scope.vm = {};

        $scope.vm.user = user;

        $scope.vm.save = function () {
            simpleApiCaller.put($scope.vm.user, getOptions()).then($modalInstance.close);
        };

        function getOptions() {
            return {
                resource: 'users/current/names'
            };
        }
    }
})();
