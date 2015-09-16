(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('validationService', validationService);

    validationService.$inject = [];

    /* @ngInject */
    function validationService() {

        var service = {
            applyServerSideErrors: applyServerSideErrors,
            passesValidationCheck: passesValidationCheck,
            fireAll: fireAll
        };

        function applyServerSideErrors(form, errors) {
            if (!errors) {
                return;
            }

            form.serverErrors = [];
            errors.forEach(function (error) {
                var relatedFormElement = form[error.property_name.toLowerCase()];
                if (relatedFormElement) {
                    form[error.property_name.toLowerCase()].serverError = error.error_message;
                } else {
                    form.serverErrors.push(error.error_message);
                }
            });
        }

        function passesValidationCheck(form) {
            if (form.$valid) {
                return true;
            }

            fireAll(form);
            angular.element('input.ng-invalid:first').focus();
            return false;
        }

        function fireAll(form) {
            _.each(form, function (value, key) {
                if (key.startsWith('$')) {
                    return;
                }

                // We skip non-form and non-inputs
                if (!value || value.$dirty === undefined) {
                    return;
                }
                // Recursively applying same method on all forms included in the form
                if (value.$addControl) {
                    return fireAll(value);
                }

                if (value.$setTouched) {
                    return value.$setTouched();
                }
            });
        }

        return service;

    }
})();
