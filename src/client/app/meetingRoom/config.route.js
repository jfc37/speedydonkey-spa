(function () {
    'use strict';

    angular
        .module('app.meetingRoom')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/myCourses/:courseName/meeting-room',
                config: {
                    title: 'meetingRoom',
                    controller: 'MeetingRoom',
                    controllerAs: 'vm',
                    templateUrl: 'app/meetingRoom/meetingRoom.html'
                }
            }
        ];
    }
})();