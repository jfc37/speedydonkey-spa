namespace jfc {
    'use strict';

    export interface IBlockDetailsReportFilter extends IFileType {
        blockId: number;
    }

    export interface IBlockDetailsRepository {
        get(filter: IBlockDetailsReportFilter): angular.IPromise<any>;
        getCsv(filter: IBlockDetailsReportFilter): angular.IPromise<any>;
    }

    /* @ngInject */
    class BlockDetailsRepository implements IBlockDetailsRepository {

        constructor(
            private httpService: IHttpService,
            private validationPromise: IValidationPromise,
            private fileDownloadService: IFileDownloadService) { }

        public get(filter: IBlockDetailsReportFilter): angular.IPromise<any> {

            let options = this.getOptions(filter);

            return this.httpService.get(options).then(function(response) {
                return response.data;
            }).catch((response) => {
                return this.validationPromise.rejectWithFirstMessage(response);
            });
        }

        public getCsv(filter: IBlockDetailsReportFilter): angular.IPromise<any> {
            let csvFilter = angular.copy(filter);
            csvFilter.type = 'csv';

            return this.get(csvFilter).then((data) => {
                let fileName = this.getFileName(csvFilter);
                this.fileDownloadService.downloadAsCsv(data, fileName);
            });
        }

        private getFileName(filter: IBlockDetailsReportFilter): string {
            return 'block_details_' + filter.blockId;
        }

        private getOptions(filter: IBlockDetailsReportFilter): IRequestOptions {
            return {
                resource: 'reports/block-details',
                parameters: filter,
                block: true
            };
        }
    }
    angular
        .module('app.reports')
        .service('blockDetailsRepository', BlockDetailsRepository);

}
