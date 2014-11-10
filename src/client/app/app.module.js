(function () {
    'use strict';

    angular.module('app', [
        /*
         * Order is not important. Angular makes a
         * pass to register all of the modules listed
         * and then when app.dashboard tries to use app.data,
         * it's components are available.
         */

        /*
         * Everybody has access to these.
         * We could place these under every feature area,
         * but this is easier to maintain.
         */
        'app.core',
        'app.widgets',

        /*
         * Feature areas
         */
        'app.admin',
        'app.dashboard',
        'app.myCourses',
        'app.myCourse',
        'app.courseEnrolment',
        'app.layout',
        'app.logon',
        'app.register',
        'app.manageCourses',
        'app.manageCourse',
        'app.createCourse',
        'app.meetingRoom',
    ]);

})();