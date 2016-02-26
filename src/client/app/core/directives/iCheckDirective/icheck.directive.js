(function () {
    "use strict";

    angular
        .module('app.core')
        .directive('icheck', /*@ngInject*/ function ($timeout, $parse) {
            return {
                require: 'ngModel',
                link: function ($scope, element, $attrs, ngModel) {
                    return $timeout(function () {
                        var value;
                        value = $attrs['value'];

                        $scope.$watch($attrs['ngModel'], function (newValue) {
                            $(element).iCheck('update');
                        });

                        $scope.$watch($attrs['ngDisabled'], function (newValue) {
                            $(element).iCheck(newValue ? 'disable' : 'enable');
                            $(element).iCheck('update');
                        })

                        return $(element).iCheck({
                            checkboxClass: 'icheckbox_square-blue',
                            radioClass: 'iradio_square-blue'

                        }).on('ifChanged', function (event) {
                            if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                                $scope.$apply(function () {
                                    return ngModel.$setViewValue(event.target.checked);
                                })
                            }
                        }).on('ifClicked', function (event) {
                            if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                                return $scope.$apply(function () {
                                    //set up for radio buttons to be de-selectable
                                    if (ngModel.$viewValue != value)
                                        return ngModel.$setViewValue(value);
                                    else
                                        ngModel.$setViewValue(null);
                                    ngModel.$render();
                                    return
                                });
                            }
                        });
                    });
                }
            };
        });

})();

//(function () {
//    "use strict";
//
//    angular
//        .module('app.core')
//        .directive('icheck', iCheck);
//
//    //---
//
//    /* @ngInject */
//    function iCheck($timeout) {
//
//        var directive = {
//            restrict: 'A',
//            require: 'ngModel',
//
//            scope: {
//                model: '=ngModel'
//            },
//
//            link: linkFn
//        };
//
//        return directive;
//
//        //---
//
//        function linkFn(scope, element, attrs, ngModel) {
//
//            $timeout(function () {
//                $(element).iCheck({
//                        checkboxClass: attrs.icheck,
//                        radioClass: attrs.icheck
//                    })
//                    .on('ifChanged', onChanged);
//
//                update(ngModel.$modelValue);
//            });
//
//            var watchModel = scope.$watch(function () {
//                return ngModel.$modelValue;
//            }, update);
//
//            scope.$on('$destroy', function () {
//                watchModel();
//            });
//
//            //---
//
//            function update(value) {
//                if (attrs.type == 'checkbox') {
//                    $(element).iCheck('update');
//                }
//            }
//
//            //---
//
//            function onChanged(event) {
//                if (attrs.type == 'checkbox') {
//                    ngModel.$setViewValue(event.target.checked);
//                }
//
//                if (attrs.type == 'radio') {
//                    ngModel.$setViewValue(event.target.value);
//                }
//            }
//
//        }
//
//    }
//
//})();
