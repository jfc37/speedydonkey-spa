namespace jfc {
    'use strict';

    declare var moment;

    export interface IFileType {
        type: string;
    }

    export interface IStandardReportFilter extends IFileType {
        from: Date;
        to: Date;
    }

    export interface ITeacherInvoiceRepository {
        get(filter: IStandardReportFilter): angular.IPromise<Object>;
        getCsv(filter: IStandardReportFilter): angular.IPromise<void>;
    }

    class TeacherInvoiceRepository implements ITeacherInvoiceRepository {

        /* @ngInject */
        constructor(
            private httpService: IHttpService,
            private validationPromise: IValidationPromise,
            private fileDownloadService: IFileDownloadService) { }

        public get(filter: IStandardReportFilter): angular.IPromise<Object> {
            let formatedFilter = this.getFormattedFilter(filter);

            let options = this.getOptions(formatedFilter);

            return this.httpService.get(options).then(function(response) {
                return response.data;
            }).catch((response) => {
                return this.validationPromise.rejectWithFirstMessage(response);
            });
        }

        public getCsv(filter: IStandardReportFilter): angular.IPromise<void> {
            let csvFilter = angular.copy(filter);
            csvFilter.type = 'csv';

            return this.get(csvFilter).then((data) => {
                let fileName = this.getFileName(csvFilter);
                this.fileDownloadService.downloadAsCsv(data, fileName);
            });
        }

        private getFileName(filter: IStandardReportFilter): string {
            var fromDisplay = moment(filter.from).format('DD-MM-YYYY');
            var toDisplay = moment(filter.to).format('DD-MM-YYYY');
            return `teacher_invoices_${fromDisplay}_${toDisplay}`;
        }

        private getFormattedFilter(filter: IStandardReportFilter): IStandardReportFilter {
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
                resource: 'reports/teacher-invoices',
                parameters: filter,
                block: true
            };
        }
    }

    angular
        .module('app.reports')
        .service('teacherInvoiceRepository', TeacherInvoiceRepository);
}
