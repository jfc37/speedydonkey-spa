(function () {
    'use strict';

    angular
        .module('app.settings')
        .controller('Settings', Settings);

    /* @ngInject */
    function Settings(settingsRepository) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Settings';

        vm.submitLogo = function () {
            settingsRepository.update([{
                logo: vm.settings.logo
            }]);
        };

        activate();

        function activate() {
            settingsRepository.getAll().then(function (settings) {
                vm.settings = settings;
            });
        }
    }
})();