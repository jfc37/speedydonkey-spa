(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$q', '$http', 'apiCaller'];

    /* @ngInject */
    function dataservice($q, $http, apiCaller) {
        var service = {
            getCourseNotices: getCourseNotices,
            getUpcomingDeadlines: getUpcomingDeadlines,
            getUpcomingLectures: getUpcomingLectures,
            getRecentGrades: getRecentGrades,
            getCourses: getCourses,
            getCourse: getCourse,
            getAllCourses: getAllCourses,


            searchForUser: searchForUser,

            getStudent: getStudent,
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

        function getCourse(courseName) {
            var course = { 
                name: courseName, 
                description: 'Introduction to information studies',
                start_date: new Date(2014, 10, 1),
                end_date: new Date(2015, 4, 1),
                grade_type: 'Letter Grade',
                professors: [
                    {
                        first_name: 'John',
                        surname: 'Stakehouse'
                    }
                ],
                notices: [
                    {
                        message: 'Mondays class is cancelled',
                        start_date: new Date(2014, 10, 3),
                        end_date: new Date(2014, 10, 20),
                    }
                ],
                lectures: [
                    {
                        name: 'Monday Class',
                        location: 'KIRK201',
                        start_date: new Date(2014, 10, 3, 10, 5)
                    },
                    {
                        name: 'Thursday Class',
                        location: 'KIRK201',
                        start_date: new Date(2014, 10, 6, 14, 35)
                    },
                ],
                assignments: [
                    {
                        name: 'Essay 1',
                        final_mark_percentage: 15,
                        start_date: new Date(2014, 10, 3),
                        end_date: new Date(2014, 10, 20),
                    },
                    {
                        name: 'Essay 2',
                        final_mark_percentage: 10,
                        start_date: new Date(2014, 10, 25),
                        end_date: new Date(2014, 11, 10),
                    },
                    {
                        name: 'Readings',
                        final_mark_percentage: 0,
                        start_date: new Date(2014, 10, 4),
                        end_date: new Date(2014, 11, 22),
                    },
                ],
                exams: [
                    {
                        name: 'Midterm Test',
                        final_mark_percentage: 30,
                        start_time: new Date(2014, 10, 3, 10, 5),
                        location: 'TBC',
                    },
                    {
                        name: 'Final Exam',
                        final_mark_percentage: 60,
                        start_time: new Date(2015, 1, 2, 10, 5),
                        location: 'TBC',
                    },
                ]
            };
            return $q.when(course);
        }

        function getAllCourses(success, error) {
            apiCaller.getCourse().success(success).error(error);
        }

        function searchForUser(searchParameters, success, error) {

            var q = '';
            for (var prop in searchParameters) {
                if (searchParameters.hasOwnProperty(prop)) {
                    q = q + '&' + prop + '_=_' + searchParameters[prop];
                }
            }
            q = q.slice(1);

            apiCaller.searchUser(q)
                .success(function(response, data){
                    if (response.length > 0) {
                        success(response);
                    } else {
                        error();
                    }
                })
                .error(error);
        }

        function getStudent(studentId, success, error) {
            apiCaller.getPerson({role: 'student', personId: studentId})
                .success(success)
                .error(error);
        }
    }
})();