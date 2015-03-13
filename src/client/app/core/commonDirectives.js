(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('displayDate', displayDate)
        ;

    /* @ngInject */
    function displayDate () {
        var directive = {
            template: '{{display}}',
            scope: {
              ngModel: '='
            },
            link: function(scope, element, attrs, ngModel){
                var format = '';
                if (attrs.format === 'time') {
                    format = 'h:mmA';
                } else if (attrs.format === 'long date') {
                    format = 'dddd MMMM D'
                }
                scope.display = moment(scope.ngModel).format(format);
            }
        };
        return directive;
    }
})();