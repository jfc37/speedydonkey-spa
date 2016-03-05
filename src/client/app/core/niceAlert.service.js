(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('niceAlert', niceAlert);

    /* @ngInject */
    function niceAlert(SweetAlert) {

        var service = {
            success: success,
            error: error,
            confirm: confirm,
            validationWarning: validationWarning
        };

        return service;

        function validationWarning(message) {
            var alert = {
                type: 'warning',
                title: 'Validation',
                message: message || 'Looks like there was something wrong with the data you supplied.'
            };

            showAlert(alert);
        }

        function success(alert) {
            if (isString(alert)) {
                var message = alert;
                alert = {
                    message: message
                };
            }

            alert.type = 'success';
            alert.title = 'Done!';

            showAlert(alert);
        }

        function error(alert) {
            if (isString(alert)) {
                var message = alert;
                alert = {
                    message: message
                };
            }

            alert.type = 'error';
            alert.title = 'Oops!';

            showAlert(alert);
        }

        function confirm(alert, confirmedFunction) {

            if (isString(alert)) {
                var message = alert;
                alert = {
                    message: message
                };
            }

            SweetAlert.swal({
                title: 'Are you sure?',
                text: alert.message,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'I\'m sure!',
                closeOnConfirm: false
            }, function (isConfirmed) {
                if (isConfirmed) {
                    confirmedFunction();
                }
            });
        }

        function showAlert(alert, type) {
            SweetAlert.swal(alert.title, alert.message, alert.type);
        }

        function isString(test) {
            return typeof test === 'string';
        }

    }
})();
