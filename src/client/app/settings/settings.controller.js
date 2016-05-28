(function () {
    'use strict';

    angular
        .module('app.settings')
        .controller('Settings', Settings);

    /* @ngInject */
    function Settings(settingsRepository, niceAlert, pageReloader) {
        var vm = this;

        vm.title = 'Settings';

        vm.submitSiteSettings = function () {
            updateSettings([{
                logo: vm.logo
            }]).then(function () {
                pageReloader.hardReload();
            });
        };

        vm.submitBlockSettings = function () {
            updateSettings([{
                minutesPerClass: vm.minutesPerClass,
                numberOfClasses: vm.numberOfClasses,
                classCapacity: vm.classCapacity
            }]);
        };

        vm.submitTeacherSettings = function () {
            updateSettings([{
                teacherRateSolo: vm.teacherRateSolo,
                teacherRatePartnered: vm.teacherRatePartnered
            }]);
        };

        vm.submitTerms = function () {
            updateSettings([{
                termsAndConditions: vm.termsAndConditions
            }]);
        };

        function updateSettings(settings) {
            return settingsRepository.update(settings).then(function () {
                pageReloader.reload();
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
                vm.classCapacity = parseInt(settings.classCapacity);

                vm.termsAndConditions = settings.termsAndConditions;

                vm.teacherRateSolo = parseInt(settings.teacherRateSolo);
                vm.teacherRatePartnered = parseInt(settings.teacherRatePartnered);
            });
        }
    }
})();
