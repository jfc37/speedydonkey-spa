(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('niceAlert', niceAlert);

    /* @ngInject */
    function niceAlert(SweetAlert) {


        var service = {
            success: success,
            error: error
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

        function showAlert(alert, type) {
            SweetAlert.swal(alert.title, alert.message, alert.type);
        }

    }
})();
