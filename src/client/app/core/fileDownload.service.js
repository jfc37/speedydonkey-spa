(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('fileDownloadService', fileDownloadService);

    /* @ngInject */
    function fileDownloadService() {

        var service = {
            downloadAsCsv: downloadAsCsv
        };

        return service;

        function downloadAsCsv(data, fileName) {
            var file = new Blob([data], {
                type : 'application/csv'
            });

            //trick to download store a file having its URL
            var fileURL = URL.createObjectURL(file);
            var a         = document.createElement('a');
            a.href        = fileURL;
            a.target      = '_blank';
            a.download    = fileName + '.csv';
            document.body.appendChild(a);
            a.click();
        }

    }
})();
