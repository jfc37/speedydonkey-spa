(function () {
    'use strict';

    angular
        .module('app.register')
        .controller('RegisterUser', RegisterUser);

    /* @ngInject */
    function RegisterUser(registerUserService, validationService) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Register Account';
        vm.newUser = {};
        vm.registrationSuccessful = false;

        vm.registerNewUser = function (form) {
            registerUserService.register(vm.newUser).then(function () {
                vm.registrationSuccessful = true;
            }, function (validationErrors) {
                validationService.applyServerSideErrors(form, validationErrors);
            });
        };
    }
})();
