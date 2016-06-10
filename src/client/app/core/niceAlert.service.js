var jfc;
(function (jfc) {
    'use strict';
    var NiceAlert = (function () {
        /*@ngInject*/
        function NiceAlert(SweetAlert) {
            this.SweetAlert = SweetAlert;
        }
        NiceAlert.prototype.validationWarning = function (message) {
            var alert = {
                type: 'warning',
                title: 'Validation',
                message: message || 'Looks like there was something wrong with the data you supplied.'
            };
            this.showAlert(alert);
        };
        NiceAlert.prototype.successMessage = function (message) {
            this.success(message);
        };
        NiceAlert.prototype.errorMessage = function (message) {
            this.error(message);
        };
        NiceAlert.prototype.confirmMessage = function (message, confirmedFunction) {
            this.confirm(message, confirmedFunction);
        };
        NiceAlert.prototype.success = function (alert) {
            if (this.isString(alert)) {
                var message = alert;
                alert = {
                    message: message
                };
            }
            alert.type = 'success';
            alert.title = 'Done!';
            this.showAlert(alert);
        };
        NiceAlert.prototype.error = function (alert) {
            if (this.isString(alert)) {
                var message = alert;
                alert = {
                    message: message
                };
            }
            alert.type = 'error';
            alert.title = 'Oops!';
            this.showAlert(alert);
        };
        NiceAlert.prototype.confirm = function (alert, confirmedFunction) {
            if (this.isString(alert)) {
                var message = alert;
                alert = {
                    message: message
                };
            }
            this.SweetAlert.swal({
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
        };
        NiceAlert.prototype.showAlert = function (alert) {
            this.SweetAlert.swal(alert.title, alert.message, alert.type);
        };
        NiceAlert.prototype.isString = function (test) {
            return typeof test === 'string';
        };
        return NiceAlert;
    }());
    angular
        .module('app.core')
        .service('niceAlert', NiceAlert);
})(jfc || (jfc = {}));
