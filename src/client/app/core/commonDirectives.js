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
                if (attrs.format === 'from now') {
                    scope.display = moment(scope.ngModel).fromNow();
                    return;
                } 

                var format = '';
                if (attrs.format === 'time') {
                    format = 'h:mmA';
                } else if (attrs.format === 'long date') {
                    format = 'dddd MMMM D'
                } else if (attrs.format === 'short date') {
                    format = 'DD/MM'
                }
                scope.display = moment(scope.ngModel).format(format);
            }
        };
        return directive;
    }
})();