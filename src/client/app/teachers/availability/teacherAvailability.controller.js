var jfc;
(function (jfc) {
    'use strict';
    /* @ngInject */
    var TeacherAvailability = (function () {
        function TeacherAvailability() {
        }
        return TeacherAvailability;
    }());
    angular
        .module('app.teachers')
        .controller('TeacherAvailability', TeacherAvailability);
})(jfc || (jfc = {}));
