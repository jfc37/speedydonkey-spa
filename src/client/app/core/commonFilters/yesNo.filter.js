(function () {
    'use strict';

    angular
        .module('app.core')
        .filter('yesNo', yesNoFunction);

    function yesNoFunction() {
        return function (input) {
            return input ? 'Yes' : 'No';
        };
    }

})();
