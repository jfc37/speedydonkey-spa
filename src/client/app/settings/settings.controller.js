(function () {
    'use strict';

    angular
        .module('app.settings')
        .controller('Settings', Settings);

    /* @ngInject */
    function Settings($q, settingsService, logger, validationService, simpleApiCaller) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Settings';

        vm.dzAddedFile = function (file) {
            logger.success(file);
        };

        vm.dzError = function (file, errorMessage) {
            logger.error(errorMessage);
        };

        vm.dropzoneConfig = {
            parallelUploads: 3,
            maxFileSize: 3,
            maxFiles: 1,
            url: simpleApiCaller.baseUrl + 'settings/logos',
            paramName: 'logo',
            acceptedFiles: 'image/*'
        };
    }
})();
