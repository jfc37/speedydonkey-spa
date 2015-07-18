(function () {
    'use strict';

    angular
        .module('app.windyLindy.registration')
        .controller('Registration', Registration);

    Registration.$inject = ['selectOptionService'];

    /* @ngInject */
    function Registration(selectOptionService) {
        /*jshint validthis: true */
        var vm = this;

        vm.danceRoles = selectOptionService.getDanceRoles();
        vm.danceLevels = selectOptionService.getDanceLevels();
    }
})();
