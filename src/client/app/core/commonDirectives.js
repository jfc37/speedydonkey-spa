/*global moment*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('displayDate', displayDate)
        .directive('passStatus', passStatus)
        .directive('passSummary', passSummary)
        ;

    /* @ngInject */
    function displayDate () {
        var directive = {
            template: '{{display}}',
            scope: {
              ngModel: '='
            },
            link: function(scope, element, attrs, ngModel){
                if (attrs.format === 'from now') {
                    scope.display = moment(scope.ngModel).fromNow();
                    return;
                }

                var format = '';
                if (attrs.format === 'time') {
                    format = 'h:mmA';
                } else if (attrs.format === 'long date') {
                    format = 'dddd MMMM D';
                } else if (attrs.format === 'short date') {
                    format = 'DD/MM';
                }
                scope.display = moment(scope.ngModel).format(format);
            }
        };
        return directive;
    }

    function passStatus (commonFunctions) {
        var directive = {
            template: '<span class="label label-{{labelClass}}">{{message}}</span>',
            require: 'ngModel',
            scope: {
              ngModel: '='
            },
            link: function(scope, element, attrs){
                scope.$watch('ngModel', function (change){
                    var anyValidPasses = scope.ngModel.filter(function (pass) {
                        return pass.valid;
                    }).length > 0;

                    if (!scope.ngModel.some(commonFunctions.isValidPass)){
                        scope.message = 'no valid passes';
                        scope.labelClass = 'danger';
                    } else{
                        var anyPaymentPendingPasses = scope.ngModel.filter(function (pass) {
                            return pass.payment_status.toLowerCase() === 'pending';
                        }).length > 0;
                        if (anyPaymentPendingPasses) {
                            scope.message = 'pass needs payment';
                        scope.labelClass = 'warning';
                        } else {
                            scope.message = 'all good';
                        scope.labelClass = 'success';
                        }
                    }
                });
            }
        };
        return directive;
    }

    function passSummary() {
        var directive = {
            template: '{{passTypeText}} - {{validnessText}}',
            require: 'ngModel',
            scope: {
              ngModel: '='
            },
            link: function(scope, element, attrs){
                scope.passType = scope.ngModel.pass_type;
                scope.paymentStatus = scope.ngModel.payment_status;
                scope.validness = scope.ngModel.valid;

                scope.passTypeText = getPassTypeText(scope.ngModel.pass_type);
                scope.validnessText = getValidnessText(scope.ngModel);

            }
        };
        return directive;
    }

    function getPassTypeText(passType) {
        var passTypeLowerCase = passType.toLowerCase();
        if (passTypeLowerCase === 'clip') {
            return 'Clip pass';
        }
        if (passTypeLowerCase === 'single') {
            return 'Single pass';
        }
        if (passTypeLowerCase === 'unlimited') {
            return 'Unlimited pass';
        }
    }

    function getValidnessText(pass) {
        var text = '';
        if (pass.pass_type.toLowerCase() !== 'unlimited') {
            text = pass.clips_remaining + ' clip';
            if (pass.clips_remaining > 1) {
                text = text + 's';
            }
            text = text + ' remaining, and ';
        }

        text = text + 'expires on the ' + moment(pass.end_date).format('dddd MMMM D');
        return text;
    }

})();