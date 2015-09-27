(function () {
    'use strict';

    angular
        .module('app.manageUser')
        .controller('ManageUser', ManageUser);

    /* @ngInject */
    function ManageUser($q, manageUserService, logger, validationService) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Update Details';
        vm.user = {};
        vm.registrationSuccessful = false;

        vm.updateUser = function (form) {
            manageUserService.updateUser(vm.user).then(function () {
                logger.success('Your details have been updated');
            }, function (validationErrors) {
                validationService.applyServerSideErrors(form, validationErrors);
                logger.warning('Your details have not been updated');

            });
        };

        activate();

        function activate() {
            var promises = [getUser()];
            return $q.all(promises)
                .then(function () {
                    logger.info('Activated Manage User');
                });
        }

        function getUser() {
            manageUserService.getUser().then(function (user) {
                vm.user = user;
            });
        }
    }
})();
