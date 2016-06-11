namespace jfc {
    'use strict';

    interface IAlertMessage {
        type: string;
        title: string;
        message: string;
    }

    export interface INiceAlert {
        successMessage(message: string): void;
        errorMessage(message: string): void;
        confirmMessage(message: string, confirmedFunction: Function): void;
        validationWarning(message?: string): void;
    }

    class NiceAlert implements INiceAlert {

        /*@ngInject*/
        constructor(private SweetAlert) { }

        public validationWarning(message?: string): void {
            let alert: IAlertMessage = {
                type: 'warning',
                title: 'Validation',
                message: message || 'Looks like there was something wrong with the data you supplied.'
            };

            this.showAlert(alert);
        }

        public successMessage(message: string): void {
            this.success(message);
        }

        public errorMessage(message: string): void {
            this.error(message);
        }

        public confirmMessage(message: string, confirmedFunction: Function): void {
            this.confirm(message, confirmedFunction);
        }

        public success(alert: any): void {
            if (this.isString(alert)) {
                let message = alert;
                alert = {
                    message: message
                };
            }

            alert.type = 'success';
            alert.title = 'Done!';

            this.showAlert(alert);
        }

        public error(alert: any): void {
            if (this.isString(alert)) {
                let message = alert;
                alert = {
                    message: message
                };
            }

            alert.type = 'error';
            alert.title = 'Oops!';

            this.showAlert(alert);
        }

        public confirm(alert: any, confirmedFunction: Function): void {

            if (this.isString(alert)) {
                let message = alert;
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
            }, function(isConfirmed) {
                if (isConfirmed) {
                    confirmedFunction();
                }
            });
        }

        private showAlert(alert: IAlertMessage): void {
            this.SweetAlert.swal(alert.title, alert.message, alert.type);
        }

        private isString(test: any): boolean {
            return typeof test === 'string';
        }
    }

    angular
        .module('app.core')
        .service('niceAlert', NiceAlert);
}
