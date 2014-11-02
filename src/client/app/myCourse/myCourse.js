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

        vm.course = {};
        vm.title = $routeParams.courseName;

        activate();

        function activate() {
            var promises = [getCourse()];
            return $q.all(promises).then(function(){
                logger.info('Activated ' + vm.courseName + ' View');
            });
        }

        function getCourse() {
            return dataservice.getCourse($routeParams.courseName).then(function (data) {
                vm.course = data;
                return vm.course;
            });
        }
    }
})();