namespace jfc {
    'use strict';

    export interface IValidationError {
        errorMessage: string;
        propertyName: string;
    }

    export interface IValidationResult {
        validationErrors: Array<IValidationError>;
    }

    export interface IValidationPromise {
        reject(response): angular.IPromise<any>;
        rejectWithFirstMessage(response): angular.IPromise<any>;
    }

    class ValidationPromise implements IValidationPromise {

        /* @ngInject */
        constructor(private $q: angular.IQService) { }

        public reject(response): angular.IPromise<any> {
            if (response.data && response.data.validationResult) {
                return this.$q.reject(response.data.validationResult.validationErrors);
            } else {
                return this.$q.reject();
            }
        }

        public rejectWithFirstMessage(response): angular.IPromise<any> {
            if (response.data && response.data.validationErrors) {
                return this.$q.reject(response.data.validationErrors[0].errorMessage);
            } else {
                return this.$q.reject();
            }
        }
    }

    angular
        .module('app.core')
        .service('validationPromise', ValidationPromise);
}
