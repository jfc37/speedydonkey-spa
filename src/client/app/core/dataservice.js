(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$q'];

    /* @ngInject */
    function dataservice($q) {
        var service = {
            getCourseNotices: getCourseNotices,
            getUpcomingDeadlines: getUpcomingDeadlines,
            getUpcomingLectures: getUpcomingLectures,
            getRecentGrades: getRecentGrades,
            getCourses: getCourses,
            getAllCourses: getAllCourses,
            checkUserCredentials: checkUserCredentials
        };

        return service;

        function getCourseNotices() {
            var courseNotices = [
                { message: 'Mondays class is cancelled', course: { name: 'INFO101' } },
                { message: 'Reminder that the first essay is due next week', course: { name: 'ENGL111' } }
            ];
            return $q.when(courseNotices);
        }

        function getUpcomingDeadlines() {
            var upcomingDeadlines = [
                { name: 'Assignment 1', course: { name: 'INFO101' }, type: 'assignment', end_date: '02/11/14', final_mark_percentage: 20 },
                { name: 'Grammer History Essay', course: { name: 'ENGL111' }, type: 'assignment', end_date: '05/11/14', final_mark_percentage: 5 },
                { name: 'Midterm Test', course: { name: 'COMP103' }, type: 'exam', start_time: '06/11/14', final_mark_percentage: 50 },
                { name: 'Practice Essay', course: { name: 'ENGL111' }, type: 'assignment', end_date: '08/11/14', final_mark_percentage: 0 }
            ];
            return $q.when(upcomingDeadlines);
        }

        function getUpcomingLectures() {
            var upcomingLectures = [
                { course: { name: 'COMP103' }, location: 'KIRK201', start_date: '10:05, Monday 6th of November' },
                { course: { name: 'INFO101' }, location: 'MURP303', start_date: '12:05, Tuesday 7th of November' },
                { course: { name: 'ENGL111' }, location: 'GRIP433', start_date: '16:35, Thursday 9th of November' },
                { course: { name: 'COMP103' }, location: 'KIRK201', start_date: '10:05, Monday 13th of November' },
            ];
            return $q.when(upcomingLectures);
        }

        function getRecentGrades() {
            var recentGrades = [
                { courseName: 'COMP103', courseWorkName: 'Assignment 1', gradePercentage: 'A-' },
                { courseName: 'COMP103', courseWorkName: 'Assignment 2', gradePercentage: 'B' },
                { courseName: 'ENGL111', courseWorkName: 'Mock Exam', gradePercentage: '67%' },
            ];
            return $q.when(recentGrades);
        }

        function getCourses() {
            var courses = [
            { name: 'INFO101', description: 'Introduction to information studies'},
            { name: 'COMP103', description: 'Introduction to computer science'},
            { name: 'ENGL111', description: 'Learn to read'},
            { name: 'MATH102', description: 'Introduction to discrete maths'},
            ];
            return $q.when(courses);
        }

        function getAllCourses() {
            var courses = [
            { name: 'INFO101', description: 'Introduction to information studies'},
            { name: 'INFO201', description: 'Advanced look into information studies'},
            { name: 'INFO342', description: 'Super intense view at information studies'},
            { name: 'COMP103', description: 'Introduction to computer science'},
            { name: 'COMP206', description: 'Data structures'},
            { name: 'COMP306', description: 'Networking'},
            { name: 'ENGL111', description: 'Learn to read'},
            { name: 'ENGL101', description: 'Basic writing'},
            { name: 'MATH102', description: 'Introduction to discrete maths'},
            { name: 'MATH201', description: 'Advanced calculus'},
            ];
            return $q.when(courses);
        }

        function checkUserCredentials(username, password){
            var user = null;
            if (username === 'jchapman' && password === 'password') {
                user = {
                    username: 'jchapman',
                    firstname: 'Joe',
                    surname: 'Chapman',
                    role: 'student'
                }
            }

            return $q.when(user);
        }
    }
})();