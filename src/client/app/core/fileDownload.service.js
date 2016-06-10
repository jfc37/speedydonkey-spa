var jfc;
(function (jfc) {
    'use strict';
    var FileDownloadService = (function () {
        function FileDownloadService() {
        }
        FileDownloadService.prototype.downloadAsCsv = function (data, fileName) {
            var file = new Blob([data], {
                type: 'application/csv'
            });
            // trick to download store a file having its URL
            var fileURL = URL.createObjectURL(file);
            var a = document.createElement('a');
            a.href = fileURL;
            a.target = '_blank';
            a.download = fileName + '.csv';
            document.body.appendChild(a);
            a.click();
        };
        return FileDownloadService;
    }());
    angular
        .module('app.core')
        .service('fileDownloadService', FileDownloadService);
})(jfc || (jfc = {}));
