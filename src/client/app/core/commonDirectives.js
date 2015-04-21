/*global moment*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('displayDate', displayDate)
        .directive('passStatus', passStatus)
        .directive('passSummary', passSummary)
        .directive('validationError', validationError)
        .directive('serverError', serverError)
        .directive('commonInput', commonInput)
        .directive('commonDateTimeInput', commonDateTimeInput)
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
            template: '<span class="label label-{{labelClass}} cursor">{{message}}</span>',
            require: 'ngModel',
            scope: {
              ngModel: '='
            },
            link: function(scope, element, attrs){
                scope.$watch('ngModel', function (change){
                    var student = scope.ngModel;
                    if (student.attendedClass) {
                            scope.message = 'all good';
                        scope.labelClass = 'success';
                    } else {
                        if (!student.passes.some(commonFunctions.isValidPass)){
                            scope.message = 'no valid passes';
                            scope.labelClass = 'danger';
                        } else{
                            var anyPaymentPendingPasses = student.passes.filter(function (pass) {
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
                    }

                }, true);
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

    function validationError() {
        var directive = {
            template: '<span class="help-block has-error"><div ng-show="ngModel.$error[error] && ngModel.$touched">{{message}}</div></span>',
            require: 'ngModel',
            scope: {
              ngModel: '='
            },
            link: function(scope, element, attrs){
                scope.message = attrs.message;
                scope.error = attrs.error;

            }
        };
        return directive;
    }

    function serverError() {
        var directive = {
            template: '<span class="help-block has-error"  ng-show="ngModel.serverError && ngModel.$touched"><div>{{ngModel.serverError}}</div></span>',
            require: 'ngModel',
            scope: {
              ngModel: '='
            },
            link: function(scope, element, attrs){

            }
        };
        return directive;
    }

    function commonInput() {
        var directive = {
            template: '<div class="form-group col-xs-12" ng-class="{&apos;has-error&apos;:(getFormElement().$invalid && getFormElement().$touched) || getFormElement().serverError}">\
                            <input class="form-control"\
                            id="{{name}}"\
                            name="{{name}}"\
                            type="{{type}}"\
                            placeholder="{{displayName}}"\
                            ng-model="ngModel"\
                            required="{{required}}"/>\
                            <span class="help-block has-error">\
                                <span ng-show="hasError(&apos;required&apos;) && getFormElement().$touched">{{displayName}} is required.</span>\
                            </span>\
                        </div>',
            require: ['^form','ngModel'],
            scope: {
              ngModel: '='
            },
            link: function(scope, element, attrs, ctrls){
                scope.name = attrs.name;
                scope.displayName = attrs.displayName;
                scope.type = attrs.type;
                scope.required = attrs.required;
                scope.form = ctrls[0];
                scope.formElement = ctrls[0][attrs.name];

                scope.getFormElement = function() {
                    return ctrls[0][attrs.name];
                };

                scope.hasError = function(error) {
                    return scope.getFormElement().$error[error];
                };
            }
        };
        return directive;
    }

    function commonDateTimeInput() {
        var directive = {
            template: '<div class="form-group col-xs-12" ng-class="{&apos;has-error&apos;:(getFormElement().$invalid && getFormElement().$touched) || getFormElement().serverError}">\
                        <div class="dropdown">\
                          <a class="dropdown-toggle" id="{{name}}" role="button" data-toggle="dropdown" data-target="#" href="javascript:void(0);">\
                            <div class="input-group">\
                                <input type="text"\
                                    class="form-control"\
                                    data-ng-model="ngModel"\
                                    required="{{required}}"\
                                    placeholder="{{displayName}}">\
                                <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>\
                            </div>\
                          </a>\
                          <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">\
                            <datetimepicker data-ng-model="ngModel" data-datetimepicker-config="{ dropdownSelector: &apos;#{{name}}&apos; }"/>\
                          </ul>\
                        </div>\
                        <span class="help-block has-error">\
                            <span ng-show="hasError(&apos;required&apos;) && getFormElement().$touched">{{displayName}} is required.</span>\
                        </span>\
                        </div>',
            require: ['^form','ngModel'],
            scope: {
              ngModel: '='
            },
            link: function(scope, element, attrs, ctrls){
                scope.name = attrs.name;
                scope.displayName = attrs.displayName;
                scope.type = attrs.type;
                scope.required = attrs.required;
                scope.form = ctrls[0];
                scope.formElement = ctrls[0][attrs.name];

                scope.getFormElement = function() {
                    return ctrls[0][attrs.name];
                };

                scope.hasError = function(error) {
                    return scope.getFormElement().$error[error];
                };
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