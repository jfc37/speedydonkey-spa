(function () {
    'use strict';

    angular
        .module('app.forgottenPassword')
        .controller('ForgottenPassword', ForgottenPassword);

    /* @ngInject */
    function ForgottenPassword(simpleApiCaller) {
        var vm = this;

        vm.title = 'Forgotten Password';
        vm.isSubmitted = false;

        vm.submit = function () {
            var options = {
                resource: 'users/password/reset',
                block: true
            }

            simpleApiCaller.post({
                email: vm.email
            }, options).then(function () {
                vm.isSubmitted = true;
            });
        };
    }
})();
