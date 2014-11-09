(function () {
    'use strict';

    angular
        .module('app.createCourse')
        .controller('CreateCourse', CreateCourse);

    CreateCourse.$inject = ['$q', '$routeParams', 'dataCreateService', 'logger', 'routehelper'];

    /* @ngInject */
    function CreateCourse($q, $routeParams, dataCreateService, logger, routehelper) {
        /*jshint validthis: true */
        var vm = this;

        vm.course = {};
        vm.title = "Create Course";
        
        logger.info('Activated ' + vm.title + ' View');

        vm.createCourse = function(){
            return dataCreateService.createCourse(vm.course).then(function (data) {
                routehelper.redirectToRoute('manageCourse', {courseName: data.name});
            });
        };
    }
})();