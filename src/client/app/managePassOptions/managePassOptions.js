(function () {
    'use strict';

    angular
        .module('app.managePassOptions')
        .controller('ManagePassOptions', ManagePassOptions);

    ManagePassOptions.$inject = ['$q', 'blockEnrolmentService', 'logger'];

    /* @ngInject */
    function ManagePassOptions($q, blockEnrolmentService, logger) {
        /*jshint validthis: true */
        var vm = this;
        vm.passOptions = [];

        activate();

        function activate() {
            var promises = [getPassOptions()];
            return $q.all(promises)
            .then(function(){
                logger.info('Activated Manage Pass Options');
            });
        }

        function getPassOptions() {
            blockEnrolmentService.getPassOptions(true).then(function (passOptions) {
                vm.passOptions = passOptions;
            });
        }
    }
})();