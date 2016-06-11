namespace jfc {
    'use strict';

    declare var moment;

    export interface IRequestSearch {
        field: string;
        condition: string;
        value: string;
    }

    export interface IRequestOptions {
        block?: boolean;
        resource: string;
        id?: number;
        search?: Array<IRequestSearch>;
        parameters?: Object
    }

    export interface IHttpService {
        get(options: IRequestOptions): angular.IPromise<any>;
        post(options: IRequestOptions, data?: Object): angular.IPromise<any>;
        put(options: IRequestOptions, data?: Object): angular.IPromise<any>;
        delete(options: IRequestOptions): angular.IPromise<any>;
    }

    export interface IBlockUi {
        start(): void;
        stop(): void;
    }

    export interface IConfig {
        apiUrl: string;
    }

    class HttpService implements IHttpService {
        private _baseUrl;

        constructor(
            private $http: angular.IHttpService,
            private config: IConfig,
            private blockUI: IBlockUi) {
            this._baseUrl = 'https://' + config.apiUrl + '/api/';
        }

        public get(options: IRequestOptions): angular.IPromise<any> {
            let url = this.generateUrl(options);
            let request = this.$http.get(url);

            this.handleError(request);

            if (options.block) {
                this.handleBlocking(request);
            }

            return request;
        }

        public post(options: IRequestOptions, data?: Object): angular.IPromise<any> {
            let url = this.generateUrl(options);
            let request = this.$http.post(url, data);

            this.handleError(request);
            this.handleBlocking(request);

            return request;
        }

        public put(options: IRequestOptions, data?: Object): angular.IPromise<any> {
            let url = this.generateUrl(options);

            let request = this.$http.put(url, data);

            this.handleError(request);
            this.handleBlocking(request);

            return request;
        }

        public delete(options: IRequestOptions): angular.IPromise<any> {
            let url = this._baseUrl + options.resource;

            if (options.id) {
                url = url + '/' + options.id;
            }

            let request = this.$http.delete(url);

            this.handleError(request);

            if (options.block) {
                this.handleBlocking(request);
            }

            return request;
        }

        private generateUrl(options: IRequestOptions): string {
            let url = this._baseUrl + options.resource;

            if (options.id) {
                url = url + '/' + options.id;
            }

            if (options.search) {
                this.formatDates(options.search);
                let q = 'q=';
                options.search.forEach(function(search, index) {
                    if (index > 0) {
                        q = q + ',';
                    }
                    q = q + search.field + '_' + search.condition + '_' + search.value;
                });
                url = url + '?' + q;
            }

            if (options.parameters) {
                this.formatDates(options.parameters);
                url = url + '?' + this.toQueryString(options.parameters);
            }

            return url;
        }

        private formatDates(obj: Object): void {
            for (let i in obj) {
                if (obj.hasOwnProperty(i)) {
                    let value = obj[i];

                    if (this.isDate(value) || moment.isMoment(value)) {
                        obj[i] = value.toISOString();
                    } else if (this.isObject(value)) {
                        this.formatDates(obj[i]);
                    }
                }
            }
        }

        private isDate(value: any): boolean {
            return value instanceof Date;
        }

        private isObject(value: any): boolean {
            return value instanceof Object;
        }

        private toQueryString(obj: Object): string {
            let parts = [];
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    parts.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]));
                }
            }
            return parts.join('&');
        }

        private handleBlocking(request: angular.IPromise<any>): void {
            this.blockUI.start();

            request.finally(function() {
                this.blockUI.stop();
            });
        }

        private handleError(request: angular.IPromise<any>): void {
            request.catch(function(response) { });
        }
    }

    angular
        .module('app.apiCaller')
        .service('httpService', HttpService);
}
