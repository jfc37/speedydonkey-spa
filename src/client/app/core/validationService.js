(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('validationService', validationService);

    validationService.$inject = [];

    /* @ngInject */
    function validationService(){

        var service = {
            applyServerSideErrors: applyServerSideErrors
        };

        function applyServerSideErrors(form, errors) {
            if (!errors) {
                return;
            }

            form.serverErrors = [];
            errors.forEach(function (error) {
                var relatedFormElement = form[error.property_name.toLowerCase()];
                if (relatedFormElement){
                    form[error.property_name.toLowerCase()].serverError = error.error_message;
                } else {
                    form.serverErrors.push(error.error_message);
                }
            });
        }

        return service;

    }
})();