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
            confirm: confirm
        };

        return service;

        function success(alert) {
            alert.type = 'success';
            alert.title = 'Done!';

            showAlert(alert);
        }

        function error(alert) {
            alert.type = 'error';
            alert.title = 'Oops!';

            showAlert(alert);
        }

        function confirm(alert, confirmedFunction) {
            SweetAlert.swal({
                title: "Are you sure?",
                text: alert.message,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: 'I\'m sure!',
                closeOnConfirm: false
            }, function (isConfirmed) {
                if (isConfirmed) {
                    confirmedFunction()
                }
            });
        }

        function showAlert(alert, type) {
            SweetAlert.swal(alert.title, alert.message, alert.type);
        }

    }
})();
