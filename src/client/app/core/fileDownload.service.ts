namespace jfc {
    'use strict';

    export interface IFileDownloadService {
        downloadAsCsv(data: Object, fileName: string): void;
    }

    class FileDownloadService implements IFileDownloadService {

        public downloadAsCsv(data: Object, fileName: string): void {
            let file = new Blob([data], {
                type: 'application/csv'
            });

            // trick to download store a file having its URL
            let fileURL = URL.createObjectURL(file);
            let a = document.createElement('a');
            a.href = fileURL;
            a.target = '_blank';
            a.download = fileName + '.csv';
            document.body.appendChild(a);
            a.click();
        }
    }

    angular
        .module('app.core')
        .service('fileDownloadService', FileDownloadService);
}
