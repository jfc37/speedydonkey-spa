(function () {
    'use strict';

    angular
        .module('app.myCourse')
        .controller('MyCourse', MyCourse);

    MyCourse.$inject = ['$q', '$routeParams', 'dataservice', 'logger'];

    /* @ngInject */
    function MyCourse($q, $routeParams, dataservice, logger) {
        /*jshint validthis: true */
        var vm = this;

        vm.courseName = $routeParams.courseName;
        vm.title = vm.courseName;

        activate();

        function activate() {
            logger.info('Activated ' + vm.courseName + ' View');
        }
    }
})();