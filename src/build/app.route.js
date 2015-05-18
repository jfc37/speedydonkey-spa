(function () {
    'use strict';

    angular
        .module('app.adminDashboard')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/admin/dashboard',
                config: {
                    templateUrl: 'app/adminDashboard/adminDashboard.html',
                    controller: 'AdminDashboard',
                    controllerAs: 'vm',
                    title: 'admin dashboard',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-cogs"></i> Admin Dashboard'
                    },
                    claim: 'Admin'
                }
            }
        ];
    }
})();
(function () {
    'use strict';

    angular
        .module('app.adminReports')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/admin/reports',
                config: {
                    templateUrl: 'app/adminReports/adminReports.html',
                    controller: 'AdminReports',
                    controllerAs: 'vm',
                    title: 'admin reports',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-area-chart"></i> Admin Reports'
                    },
                    claim: 'Admin'
                }
            }
        ];
    }
})();
(function () {
    'use strict';

    angular
        .module('app.blockEnrolment')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/blockEnrolment',
                config: {
                    title: 'blockEnrolment',
                    controller: 'BlockEnrolment',
                    controllerAs: 'vm',
                    templateUrl: 'app/blockEnrolment/blockEnrolment.html',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-toggle-on"></i> Block Enrolment'
                    }
                }
            }
        ];
    }
})();
(function () {
    'use strict';

    angular
        .module('app.classCheckIn')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/class/:id/check-in',
                config: {
                    templateUrl: 'app/classCheckIn/classCheckIn.html',
                    controller: 'ClassCheckIn',
                    controllerAs: 'vm',
                    title: 'classCheckIn',
                    claim: 'CheckStudentIntoClass'
                }
            }
        ];
    }
})();
(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'app/dashboard/dashboard.html',
                    controller: 'Dashboard',
                    controllerAs: 'vm',
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            }
        ];
    }
})();
(function () {
    'use strict';

    angular
        .module('app.forgottenPassword')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/forgottenPassword',
                config: {
                    title: 'forgottenPassword',
                    controller: 'ForgottenPassword',
                    controllerAs: 'vm',
                    templateUrl: 'app/forgottenPassword/forgottenPassword.html',
                    allowAnonymous: true,
                    denyAuthorised: true
                }
            }
        ];
    }
})();
(function () {
    'use strict';

    angular
        .module('app.logon')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/login',
                config: {
                    title: 'login',
                    controller: 'Login',
                    controllerAs: 'vm',
                    templateUrl: 'app/login/login.html',
                    allowAnonymous: true,
                    denyAuthorised: true
                }
            }
        ];
    }
})();
(function () {
    'use strict';

    angular
        .module('app.manageBlocks')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/admin/manage/blocks',
                config: {
                    title: 'manageBlocks',
                    controller: 'ManageBlocks',
                    controllerAs: 'vm',
                    templateUrl: 'app/manageBlocks/manageBlocks.html'
                }
            }
        ];
    }
})();
(function () {
    'use strict';

    angular
        .module('app.manageClasses')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/admin/manage/classes',
                config: {
                    title: 'manageClasses',
                    controller: 'ManageClasses',
                    controllerAs: 'vm',
                    templateUrl: 'app/manageClasses/manageClasses.html'
                }
            }
        ];
    }
})();
(function () {
    'use strict';

    angular
        .module('app.manageLevels')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/admin/manage/levels',
                config: {
                    title: 'manageLevels',
                    controller: 'ManageLevels',
                    controllerAs: 'vm',
                    templateUrl: 'app/manageLevels/manageLevels.html'
                }
            }
        ];
    }
})();
(function () {
    'use strict';

    angular
        .module('app.managePassOptions')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/admin/manage/PassOptions',
                config: {
                    title: 'managePassOptions',
                    controller: 'ManagePassOptions',
                    controllerAs: 'vm',
                    templateUrl: 'app/managePassOptions/managePassOptions.html'
                }
            }
        ];
    }
})();
(function () {
    'use strict';

    angular
        .module('app.manageStudents')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/admin/manage/students',
                config: {
                    title: 'manageStudents',
                    controller: 'ManageStudents',
                    controllerAs: 'vm',
                    templateUrl: 'app/manageStudents/manageStudents.html',
                    claim: 'Admin'
                }
            }
        ];
    }
})();
(function () {
    'use strict';

    angular
        .module('app.manageTeachers')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/admin/manage/teachers',
                config: {
                    title: 'manageTeachers',
                    controller: 'ManageTeachers',
                    controllerAs: 'vm',
                    templateUrl: 'app/manageTeachers/manageTeachers.html',
                    claim: 'Admin'
                }
            }
        ];
    }
})();
(function () {
    'use strict';

    angular
        .module('app.manageUser')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/manageUser',
                config: {
                    title: 'manageUser',
                    controller: 'ManageUser',
                    controllerAs: 'vm',
                    templateUrl: 'app/manageUser/manageUser.html'
                }
            }
        ];
    }
})();
(function () {
    'use strict';

    angular
        .module('app.register')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/register/user',
                config: {
                    title: 'registerUser',
                    controller: 'RegisterUser',
                    controllerAs: 'vm',
                    templateUrl: 'app/register/registerUser.html',
                    allowAnonymous: true,
                    denyAuthorised: true
                }
            }
        ];
    }
})();
(function () {
    'use strict';

    angular
        .module('app.reportProfit')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/admin/reports/profit',
                config: {
                    title: 'reportProfit',
                    controller: 'ReportProfit',
                    controllerAs: 'vm',
                    templateUrl: 'app/reportProfit/reportProfit.html',
                    claim: 'Admin'
                }
            }
        ];
    }
})();
(function () {
    'use strict';

    angular
        .module('app.reportTeacherHours')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/admin/reports/teacher_hours',
                config: {
                    title: 'reportTeacherHours',
                    controller: 'ReportTeacherHours',
                    controllerAs: 'vm',
                    templateUrl: 'app/reportTeacherHours/reportTeacherHours.html'
                }
            }
        ];
    }
})();
(function () {
    'use strict';

    angular
        .module('app.resetPassword')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/account/:id/password/reset',
                config: {
                    title: 'resetPassword',
                    controller: 'ResetPassword',
                    controllerAs: 'vm',
                    templateUrl: 'app/resetPassword/resetPassword.html',
                    allowAnonymous: true,
                    denyAuthorised: true
                }
            }
        ];
    }
})();
(function () {
    'use strict';

    angular
        .module('app.userActivation')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/account/:key/activate',
                config: {
                    title: 'userActivation',
                    controller: 'UserActivation',
                    controllerAs: 'vm',
                    templateUrl: 'app/userActivation/userActivation.html',
                    allowAnonymous: true,
                    denyAuthorised: true
                }
            }
        ];
    }
})();