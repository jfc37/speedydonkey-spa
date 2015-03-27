/*global moment*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('displayDate', displayDate)
        .directive('passStatus', passStatus)
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

    function passStatus () {
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

                    if (!anyValidPasses){
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
})();