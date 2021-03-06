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
        .directive('teacherDropdown', teacherDropdown);

    /* @ngInject */
    function displayDate() {
        var directive = {
            template: '&nbsp;{{display}}',
            scope: {
                ngModel: '='
            },
            link: function (scope, element, attrs, ngModel) {
                if (attrs.format === 'from now') {
                    var localDate = moment.utc(scope.ngModel).toDate();
                    scope.display = moment(localDate).fromNow();
                    return;
                }

                var format = '';
                if (attrs.format === 'time') {
                    format = 'h:mmA';
                } else if (attrs.format === 'long date') {
                    format = 'dddd MMMM D';
                } else if (attrs.format === 'short date') {
                    format = 'DD/MM';
                } else if (attrs.format === 'time and day') {
                    format = 'dddd h:mmA';
                } else if (attrs.format === 'date and time') {
                    format = 'dddd MMMM DD, h:mm a';
                }
                var local = moment.utc(scope.ngModel).toDate();
                scope.display = moment(local).format(format);
            }
        };
        return directive;
    }

    function passStatus(commonFunctions) {
        var directive = {
            template: '<span class="label label-{{labelClass}} cursor">{{message}}</span>',
            require: 'ngModel',
            scope: {
                ngModel: '='
            },
            link: function (scope, element, attrs) {
                scope.$watch('ngModel', function (change) {
                    var student = scope.ngModel;
                    if (student.attendedClass) {
                        scope.message = 'all good';
                        scope.labelClass = 'success';
                    } else {
                        if (!student.passes.some(commonFunctions.isValidPass)) {
                            scope.message = 'no valid passes';
                            scope.labelClass = 'danger';
                        } else {
                            var anyPaymentPendingPasses = student.passes.filter(function (pass) {
                                return pass.paymentStatus.toLowerCase() === 'pending';
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
            template: '<strong>{{passNumber}}</strong> - {{passTypeText}} - {{validnessText}}',
            require: 'ngModel',
            scope: {
                ngModel: '='
            },
            link: function (scope, element, attrs) {
                scope.passType = scope.ngModel.passType;
                scope.paymentStatus = scope.ngModel.paymentStatus;
                scope.validness = scope.ngModel.valid;
                scope.passNumber = scope.ngModel.passNumber;

                scope.passTypeText = getPassTypeText(scope.ngModel.passType);
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
            link: function (scope, element, attrs) {
                scope.message = attrs.message;
                scope.error = attrs.error;

            }
        };
        return directive;
    }

    function serverError() {
        var directive = {
            template: '<span class="help-block has-error"  ng-if="ngModel.serverError && ngModel.$touched"><div>{{ngModel.serverError}}</div></span>',
            require: 'ngModel',
            scope: {
                ngModel: '='
            },
            link: function (scope, element, attrs) {

            }
        };
        return directive;
    }

    function commonInput() {
        var directive = {
            template: '<div class="form-group col-xs-12" ng-class="{&apos;has-error&apos;:(getFormElement().$invalid && getFormElement().$touched) || getFormElement().serverError}">' +
                '<label ng-if="displayName">{{displayName}}</label>' +
                '<input class="form-control"' +
                'id="{{name}}"' +
                'name="{{name}}"' +
                'type="{{type}}"' +
                'placeholder="{{displayName}}"' +
                'ng-model="ngModel"' +
                'ng-required="required"/>' +
                '<span class="help-block has-error">' +
                '    <span ng-show="hasError(&apos;required&apos;) && getFormElement().$touched">{{displayName}} is required.</span>' +
                '</span>' +
                '</div>',
            require: ['^form', 'ngModel'],
            scope: {
                ngModel: '='
            },
            link: function (scope, element, attrs, ctrls) {
                scope.name = attrs.name;
                scope.label = attrs.label;
                scope.displayName = attrs.displayName;
                scope.type = attrs.type;
                scope.required = attrs.required;
                scope.form = ctrls[0];
                scope.formElement = ctrls[0][attrs.name];

                scope.getFormElement = function () {
                    return ctrls[0][attrs.name];
                };

                scope.hasError = function (error) {
                    return scope.getFormElement().$error[error];
                };

                if (scope.type === 'date') {
                    scope.ngModel = moment(scope.ngModel).startOf('day').format('YYYY-MM-DD');
                }
            }
        };
        return directive;
    }

    function commonDateTimeInput() {
        var directive = {
            template: '<div class="form-group col-xs-12" ng-class="{&apos;has-error&apos;:(getFormElement().$invalid && getFormElement().$touched) || getFormElement().serverError}">' +
                '<label ng-show="displayName">{{displayName}}</label>' +
                '<datetimepicker show-weeks="false" hour-step="1" minute-step="15" ng-model="ngModel" show-meridian="false" date-format="dd-MMM-yyyy" readonly-time="false"></datetimepicker>' +
                '<span class="help-block has-error">' +
                '    <span ng-show="hasError(&apos;required&apos;) && getFormElement().$touched">{{displayName}} is required.</span>' +
                '</span>' +
                '</div>',
            require: ['^form', 'ngModel'],
            scope: {
                ngModel: '='
            },
            link: function (scope, element, attrs, ctrls) {
                scope.name = attrs.name;
                scope.displayName = attrs.displayName;
                scope.type = attrs.type;
                scope.required = attrs.required;
                scope.form = ctrls[0];
                scope.formElement = ctrls[0][attrs.name];

                scope.getFormElement = function () {
                    return ctrls[0][attrs.name];
                };

                scope.hasError = function (error) {
                    return scope.getFormElement().$error[error];
                };
            }
        };
        return directive;
    }

    function teacherDropdown(dataservice) {
        var directive = {
            template: '<div class="form-group col-xs-12">' +
                '<select ng-options="teacher as teacher.fullName for teacher in teachers track by teacher.id" ng-model="ngModel[0]">' +
                '    <option value="">Please select the primary teacher</option>' +
                '</select>' +
                '</div>' +
                '<div class="form-group col-xs-12">' +
                '<select ng-options="teacher as teacher.fullName for teacher in teachers track by teacher.id" ng-model="ngModel[1]">' +
                '    <option value="">Please select the secondary teacher (optional)</option>' +
                '</select>' +
                '</div>',
            require: ['ngModel'],
            scope: {
                ngModel: '='
            },
            link: function (scope, element, attrs) {
                scope.teachers = [];
                dataservice.getAllTeachers().then(function (teachers) {
                    scope.teachers = teachers;
                });
                if (!scope.ngModel || !(scope.ngModel instanceof Array)) {
                    scope.ngModel = [];
                }
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
        if (pass.passType.toLowerCase() !== 'unlimited') {
            text = pass.clipsRemaining + ' clip';
            if (pass.clipsRemaining > 1) {
                text = text + 's';
            }
            text = text + ' remaining, and ';
        }

        text = text + 'expires on the ' + moment(pass.endDate).format('dddd MMMM D');
        return text;
    }

})();
