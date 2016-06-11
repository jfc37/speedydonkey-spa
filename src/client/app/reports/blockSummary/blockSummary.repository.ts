namespace jfc {
    'use strict';

    export interface IBlockSummaryRepository {
        get(filter: IStandardReportFilter): angular.IPromise<any>;
        getCsv(filter: IStandardReportFilter): angular.IPromise<any>;
    }

    class BlockSummaryRepository implements IBlockSummaryRepository {

        /* @ngInject */
        constructor(
            private httpService: IHttpService,
            private validationPromise: IValidationPromise,
            private fileDownloadService: IFileDownloadService) { }

        public get(filter: IStandardReportFilter): angular.IPromise<any> {
            let formatedFilter = this.getFormattedFilter(filter);
            let options = this.getOptions(formatedFilter);

            return this.httpService.get(options).then(function(response) {
                return response.data;
            }).catch((response) => {
                return this.validationPromise.rejectWithFirstMessage(response);
            });
        }

        public getCsv(filter: IStandardReportFilter): angular.IPromise<any> {
            let csvFilter = angular.copy(filter);
            csvFilter.type = 'csv';

            return this.get(csvFilter).then((data) => {
                let fileName = this.getFileName(csvFilter);
                this.fileDownloadService.downloadAsCsv(data, fileName);
            });
        }

        private getFileName(filter: IStandardReportFilter): string {
            let fromDisplay = moment(filter.from).format('DD-MM-YYYY');
            let toDisplay = moment(filter.to).format('DD-MM-YYYY');
            return `block_summary_${fromDisplay}_${toDisplay}`;
        }

        private getFormattedFilter(filter) {
            if (!filter.from || !filter.to) {
                throw new Error('From and To need to be provided');
            }

            let formattedFilter = angular.copy(filter);

            formattedFilter.from = moment(filter.from);
            formattedFilter.to = moment(filter.to).add(1, 'day');

            return formattedFilter;
        }

        private getOptions(filter: IStandardReportFilter): IRequestOptions {
            return {
                resource: 'reports/block-summary',
                parameters: filter,
                block: true
            };
        }
    }

    angular
        .module('app.reports')
        .service('blockSummaryRepository', BlockSummaryRepository);

}
