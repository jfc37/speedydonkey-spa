(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('sectionBlockService', sectionBlockService);

    /* @ngInject */
    function sectionBlockService(blockUI) {

        var service = {
            block: block
        };

        /*
            block: the blockUI element
            promise: the promise that, when is resolved, will unblock
        */
        function block(options) {
            var blockedSection = blockUI.instances.get(options.block);

            blockedSection.start();

            options.promise.finally(blockedSection.stop);
        }

        return service;
    }
})();
