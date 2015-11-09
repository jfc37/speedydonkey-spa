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
            var blockedSection = options.block ? blockUI.instances.get(options.block) : blockUI;

            blockedSection.start();

            options.promise.finally(blockedSection.stop);
        }

        return service;
    }
})();
