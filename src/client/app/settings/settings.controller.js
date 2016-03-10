(function () {
    'use strict';

    angular
        .module('app.settings')
        .controller('Settings', Settings);

    /* @ngInject */
    function Settings(settingsRepository, niceAlert, pageReloader) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Settings';

        vm.submitSiteSettings = function () {
            updateSettings([{
                logo: vm.logo
            }]).then(function () {
                pageReloader.reload();
            });
        };

        vm.submitBlockSettings = function () {
            updateSettings([{
                minutesPerClass: vm.minutesPerClass,
                numberOfClasses: vm.numberOfClasses
            }]);
        };

        function updateSettings(settings) {
            return settingsRepository.update(settings).then(function () {
                niceAlert.success({
                    message: 'Settings have been updated.'
                });
            }, function () {
                niceAlert.error({
                    message: 'Something went wrong when trying to update the settings.'
                });
            });
        }

        activate();

        function activate() {
            settingsRepository.getAll().then(function (settings) {
                vm.logo = settings.logo;
                vm.minutesPerClass = parseInt(settings.minutesPerClass);
                vm.numberOfClasses = parseInt(settings.numberOfClasses);
            });
        }
    }
})();
