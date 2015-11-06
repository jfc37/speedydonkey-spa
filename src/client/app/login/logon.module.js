(function () {
    'use strict';

    angular.module('app.logon', ['auth0']);

})();

(function () {
    'use strict';

    angular
        .module('app.logon')
        .run(run);

    /* @ngInject */
    function run(auth) {
        auth.hookEvents();
    }
})();
