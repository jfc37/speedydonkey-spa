(function () {
    'use strict';

    angular
        .module('app.myCourse')
        .controller('MyCourse', MyCourse);

    MyCourse.$inject = ['$q', '$routeParams', 'dataservice', 'logger', 'routehelper'];

    /* @ngInject */
    function MyCourse($q, $routeParams, dataservice, logger, routehelper) {
        /*jshint validthis: true */
        var vm = this;

        vm.course = {};
        vm.title = $routeParams.courseName;

        vm.goToMeetingRoom = function() {
            routehelper.redirectToRoute('meetingRoom', {courseName: $routeParams.courseName})
        }

        activate();

        function activate() {
            var promises = [getCourse()];
            return $q.all(promises).then(function(){
                logger.info('Activated ' + vm.courseName + ' View');
            });
        }

        function getCourse() {
            return dataservice.searchForCourse({name: $routeParams.courseName}, function (courses) {
                if (courses.length === 1){
                    dataservice.getCourse(courses[0].id, function (course) {
                        vm.course = course;
                        return vm.course;
                    });
                }
            });
        }
    }
})();