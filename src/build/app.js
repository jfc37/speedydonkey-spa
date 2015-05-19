(function () {
    'use strict';

    angular
        .module('app.adminDashboard')
        .controller('AdminDashboard', AdminDashboard);

    AdminDashboard.$inject = [];

    /* @ngInject */
    function AdminDashboard() {
        /*jshint validthis: true */
        var vm = this;
        vm.passOptionsUrl = '#/admin/manage/PassOptions';
        vm.levelsUrl = '#/admin/manage/levels';
        vm.blocksUrl = '#/admin/manage/blocks';
        vm.classesUrl = '#/admin/manage/classes';
        vm.teachersUrl = '#/admin/manage/teachers';
        vm.studentsUrl = '#/admin/manage/students';
    }
})();

(function () {
    'use strict';

    angular
        .module('app.adminReports')
        .controller('AdminReports', AdminReports);

    AdminReports.$inject = [];

    /* @ngInject */
    function AdminReports() {
        /*jshint validthis: true */
        var vm = this;
        vm.teacherClassHoursUrl = '#/admin/reports/teacher_hours';
        vm.profitReportUrl = '#/admin/reports/profit';
    }
})();

(function () {
    'use strict';

    angular
        .module('app.blockEnrolment')
        .filter('matchingBlockGrouping', matchingBlockGroupingFilter)
        .filter('viewableBlocks', viewableBlocksFilter)
        .controller('BlockEnrolment', BlockEnrolment);

        function getGroupDateDisplay(date) {
            return moment(date).format("dddd D/M");
        }

        function getGroupDate(display) {
            return moment(display, "dddd D/M");
        }


    function matchingBlockGroupingFilter(){
        return function (blocks, group){
            return blocks.filter(function (block) {
                return getGroupDateDisplay(block.start_date) === group;
            });
        };
    }

    function viewableBlocksFilter(){
        return function (blockGroups){

            var today = new Date();
            var setOfBlocksInFirstWeek = blockGroups.filter(function (blockGroup) {
                var startOfBlockSet = getGroupDate(blockGroup).startOf('week');
                return startOfBlockSet.startOf('week') <= today && startOfBlockSet.endOf('week') >= today;
            });

            if (setOfBlocksInFirstWeek && setOfBlocksInFirstWeek.any()) {
                return setOfBlocksInFirstWeek;
            }

            return blockGroups.filter(function (blockGroup) {
                return getGroupDate(blockGroup).endOf('week') > new Date();
            });
        };
    }

    BlockEnrolment.$inject = ['blockEnrolmentService', '$q', 'logger', 'routehelper'];

    /* @ngInject */
    function BlockEnrolment(blockEnrolmentService, $q, logger, routehelper) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Block Enrolment';
        vm.blocks = [];
        vm.passOptions = [];
        vm.areBlocksLoading = true;
        vm.arePassesLoading = true;
        vm.blockGrouping = [];
        vm.selectedPass = "";

        vm.getClassType = function(block) {
            var blockName = block.name.toLowerCase();
            if (blockName.indexOf('charleston') > -1) {
                return 'charleston';
            }
            if (blockName.indexOf('lindy') > -1) {
                return 'lindy';
            }
            if (blockName.indexOf('tap') > -1) {
                return 'tap';
            }
            if (blockName.indexOf('blues') > -1) {
                return 'blues';
            }
            if (blockName.indexOf('balboa') > -1) {
                return 'balboa';
            }
            return '';
        };

        vm.isAnythingToSubmit = function() {
            return isAnyBlocksSelected() || isAnyPassesSelected();
        };

        function isAnyBlocksSelected() {
            return getSelectedBlocks().length > 0;
        }
        function getSelectedBlocks() {
            return vm.blocks.filter(function (block) {
                return block.enrolIn;
            });
        }

        function isAnyPassesSelected() {
            return vm.selectedPass;
        }

        vm.submit = function() {
            var promises = [blockEnrolmentService.enrol(getSelectedBlocks()), blockEnrolmentService.purchasePass(vm.selectedPass)];
            $q.all(promises).then(function (){
                routehelper.redirectToRoute('dashboard');
                logger.success("Enroled in selected blocks");
            }, function () {
                logger.error("Problem with enrolment");
            });
        };

        activate();

        function activate() {
            var promises = [getAllBlocks(), getPassOptions()];
            return $q.all(promises)
            .then(function(){
                logger.info('Activated Block Enrolment View');
            });
        }

        function getAllBlocks() {
            return blockEnrolmentService.getBlocks().then(function (blocks) {
                vm.blocks = blocks;
                var flags = [], l = blocks.length, i;
                for( i=0; i<l; i++) {
                    var displayDate = getGroupDateDisplay(blocks[i].start_date);
                    if(flags[displayDate]) {
                        continue;
                    }
                    flags[displayDate] = true;
                    vm.blockGrouping.push(displayDate);
                }

                vm.areBlocksLoading = false;
            }, function (error){
                if (!error.displayMessage) {
                    error.displayMessage = "Issue getting blocks...";
                }
                logger.error(error.displayMessage);
                vm.areBlocksLoading = false;
            });
        }

        function getPassOptions() {
            return blockEnrolmentService.getPassOptions().then(function (passOptions) {
                vm.passOptions = passOptions;
                vm.arePassesLoading = false;
            }, function (error){
                if (!error.displayMessage) {
                    error.arePassesLoading = "Issue getting pass options...";
                }
                logger.error(error.displayMessage);
                vm.arePassesLoading = false;
            });
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('app.blockEnrolment')
        .factory('blockEnrolmentService', blockEnrolmentService);

    blockEnrolmentService.$inject = ['$q', 'logger', 'dataservice', 'dataUpdateService', 'authService'];

    /* @ngInject */
    function blockEnrolmentService($q, logger, dataservice, dataUpdateService, authService){

        var service = {
            getBlocks : getBlocks,
            getPassOptions : getPassOptions,
            enrol: enrol,
            purchasePass: purchasePass
        };

        function getBlocks() {
            return $q(function (resolve, revoke) {
                var allBlocks = [];
                dataservice.getAllBlocks().then(function(blocks) {
                    blocks.forEach(function(block){
                        block.isEnroled = false;
                    });

                    allBlocks = blocks;
                }, function(error) {
                    if (error.status === 404){
                        error.displayMessage = 'No blocks found';
                    }
                    revoke(error);
                }).then(function () {
                    if (allBlocks.length === 0){
                        return;
                    }
                    dataservice.getUserEnroledBlocks().then(function (blocks) {
                        var enroledBlockIds = blocks.map(function(block){
                            return block.id;
                        });
                        allBlocks.forEach(function(block){
                            if (enroledBlockIds.indexOf(block.id) > -1) {
                                block.isEnroled = true;
                            }
                        });
                    }, revoke);
                }).then(function () {
                    resolve(allBlocks.filter(function (block) {
                        return block.isEnroled === false;
                    }));
                });
            });
        }

        function getPassOptions(showAllPasses) {
            return $q(function (resolve, revoke) {
                dataservice.getAllPassOptions().then(function (passOptions){
                    if (!showAllPasses){
                        passOptions = passOptions.filter(function(pass) {
                            return pass.available_for_purchase;
                        });
                    }

                    resolve(passOptions);
                }, function (error) {
                    if (error.status === 404) {
                        error.displayMessage = 'No pass options found';
                    }
                    revoke(error);
                });
            });
        }

        function enrol(blocks) {
            return $q(function (resolve, revoke) {
                if (!blocks.any()) {
                    resolve();
                } else {
                    var enrolment = {
                        user_id: authService.getUserIdentity().userId,
                        block_ids: blocks.map(function (block) {
                            return block.id;
                        })
                    };
                    dataUpdateService.enrolInBlock(enrolment).then(resolve, revoke);
                }
            });
        }

        function purchasePass(passOption) {
            return $q(function (resolve, revoke) {
                if (!passOption) {
                    resolve();
                } else {
                    var pass = {
                        payment_status: 'pending'
                    };
                    dataUpdateService.assignPassToCurrentUser(passOption.id, pass).then(resolve, revoke);
                }
            });
        }

        return service;

    }
})();
(function () {
    'use strict';

    angular
        .module('app.classCheckIn')
        .controller('ClassCheckIn', ClassCheckIn);

    ClassCheckIn.$inject = ['$q', 'classCheckInService', 'registerUserService', 'blockEnrolmentService', 'logger', 'validationService', 'manageClassesService'];

    /* @ngInject */
    function ClassCheckIn($q, classCheckInService, registerUserService, blockEnrolmentService, logger, validationService, manageClassesService) {
        /*jshint validthis: true */
        var vm = this;
        vm.class = null;
        vm.students = [];
        vm.isClassLoading = true;
        vm.areRegisteredStudentsLoading = true;
        vm.creatingNewAccount = false;
        vm.newUser = {};

        vm.updateTeachers = function() {
            var sanitisedClass = {
                id: vm.class.id,
                teachers: vm.class.teachers,
                start_time: vm.class.start_time,
                end_time: vm.class.end_time,
                name: vm.class.name,
            };
            manageClassesService.update(sanitisedClass).then(function (){
                logger.success('Teachers updated');
            }, function(errors) {
                logger.error('Problem updating teachers');
            });
        };

        vm.attendenceStatusChanged = function(student) {
            classCheckInService.attendenceStatusChanged(student).then(function(message) {
                logger.success(message);
            }, function(message) {
                logger.error(message);
            });
        };

        vm.searchUsers = function (name) {
            return classCheckInService.searchUsers(name);
        };

        vm.addWalkIn = function () {
            vm.walkInStudentSelected.attendedClass = true;
            classCheckInService.getPassesForStudent(vm.walkInStudentSelected).then(function (){
                classCheckInService.attendenceStatusChanged(vm.walkInStudentSelected).then(function(message) {
                    logger.success(message);
                }, function(message) {
                    logger.error(message);
                });
                vm.students.push(vm.walkInStudentSelected);
                vm.walkInStudentSelected = '';
            });
        };

        vm.enrolWalkIn = function () {
            classCheckInService.enrolStudent(vm.walkInStudentSelected.id, vm.class.block.id).then(function() {
                logger.success('Enroled ' + vm.walkInStudentSelected.full_name + ' in the block');
            }, function(message) {
                logger.error('Problem enroling ' + vm.walkInStudentSelected.full_name + ' in the block...');
            }).then(vm.addWalkIn);
        };

        vm.isSelectedStudentValid = function () {
            return vm.walkInStudentSelected && vm.walkInStudentSelected.id;
        };

        vm.createAccount = function () {
            vm.newUser = {};
            if (vm.walkInStudentSelected){
                var splitName = vm.walkInStudentSelected.split(' ');
                if (splitName.length > 0) {
                    vm.newUser.first_name = splitName[0];
                }
                if (splitName.length > 1) {
                    vm.newUser.surname = splitName[1];
                }
            }
            
            vm.creatingNewAccount = true;
        };

        vm.registerNewUser = function(form) {
            registerUserService.register(vm.newUser, true).then(function (user) {
                vm.creatingNewAccount = false;
                vm.walkInStudentSelected = user;
            }, function (validation_errors) {
                validationService.applyServerSideErrors(form, validation_errors);
                logger.warning("Register failed");

            });
        };

        vm.cancelNewAccount = function() {
            vm.creatingNewAccount = false;
            vm.newUser = {};
        };

        vm.purchaseNewPass = function(student, passOption){
            classCheckInService.purchaseNewPass(student, passOption).then(function() {
                logger.success(student.full_name + ' purchased a new pass!');
            },function() {
                logger.error('Problem purchasing pass...');
            });
        };

        vm.passPaidFor = function(pass, student){
            classCheckInService.passPaidFor(pass).then(function() {
                logger.success('Pass paid for');
            },function() {
                logger.error('Problem paying for pass...');
            });
        };

        activate();

        function activate() {
            var promises = [getClass(), getStudents(), getPassOptions()];
            return $q.all(promises)
            .then(function(){
                logger.info('Activated Class Check In View');
            });
        }

        function getClass() {
            return classCheckInService.getClass().then(function (theClass) {
                vm.class = theClass;
                vm.isClassLoading = false;
            }, function (error){
                if (!error.displayMessage) {
                    error.displayMessage = "Issue getting class...";
                }
                logger.error(error.displayMessage);
                vm.isClassLoading = false;
            });
        }

        function getStudents() {
            return classCheckInService.getStudents().then(function (students) {
                vm.students = students;
                vm.areRegisteredStudentsLoading = false;
            }, function (error){
                if (!error.displayMessage) {
                    error.displayMessage = "Issue getting registered students...";
                }
                logger.error(error.displayMessage);
                vm.areRegisteredStudentsLoading = false;
            });
        }

        function getPassOptions() {
            return blockEnrolmentService.getPassOptions(true).then(function (passOptions) {
                vm.passOptions = passOptions;
                vm.arePassesLoading = false;
            }, function (error){
                if (!error.displayMessage) {
                    error.arePassesLoading = "Issue getting pass options...";
                }
                logger.error(error.displayMessage);
                vm.arePassesLoading = false;
            });
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.classCheckIn')
        .factory('classCheckInService', classCheckInService);

    classCheckInService.$inject = ['$q', '$routeParams', 'dataservice', 'dataUpdateService', 'dataDeleteService', 'logger', 'commonFunctions'];

    /* @ngInject */
    function classCheckInService($q, $routeParams, dataservice, dataUpdateService, dataDeleteService, logger, commonFunctions) {
        /*jshint validthis: true */
        
        var service = {
            getClass: getClass,
            getStudents: getStudents,
            searchUsers: searchUsers,
            attendenceStatusChanged: attendenceStatusChanged,
            enrolStudent: enrolStudent,
            getPassesForStudent: getPassesForStudent,
            purchaseNewPass: purchaseNewPass,
            passPaidFor: passPaidFor
        };

        function getClass() {
            return $q(function (resolve, reject) {
                dataservice.getClass($routeParams.id).then(function (theClass) {
                    resolve(theClass);
                }, function (response) {
                    if (response.status === 404) {
                        response.displayMessage = 'Class does not exist...';
                    }
                    reject(response);
                });
            });
        }

        function noop() {}

        function getStudents() {
            return $q(function (resolve, reject) {
                var registeredStudents = [];
                var attendingStudents = [];

                var registeredStudentsPromise = dataservice.getClassRegisteredStudents($routeParams.id).then(function (students) {
                    registeredStudents = students;
                });
                var attendingStudentsPromise = dataservice.getClassAttendance($routeParams.id).then(function(students) {
                    attendingStudents = students;
                });

                $q.all([registeredStudentsPromise.catch(noop), attendingStudentsPromise.catch(noop)]).then(function () {
                    attendingStudents.forEach(function (student) {
                        student.attendedClass = true;
                    });

                    registeredStudents.forEach(function (registeredStudent) {
                        if (attendingStudents.filter(function (attendingStudent) {
                            return attendingStudent.id === registeredStudent.id;
                        }).length === 0){
                            attendingStudents.push(registeredStudent);
                        }
                    });

                    resolve(attendingStudents);
                });
            });
        }

        function searchUsers(name) {
            return $q(function (resolve, reject) {

                var search = [
                    {
                        field: 'fullname',
                        condition: 'cont',
                        value: name
                    },
                    {
                        field: 'orderby',
                        condition: 'fullname'
                    }
                ];

                dataservice.searchForUserNew(search).then(function (response) {
                    resolve(response.data);
                }, function (response) {
                    if (response.status === 404) {
                        response.displayMessage = 'No students registered...';
                    }
                    reject(response);
                });
            });
        }

        function attendenceStatusChanged(student) {
            return $q(function(resolve, reject) {
                var promise;
                var message;
                if (student.attendedClass) {
                    if (!student.passes.some(commonFunctions.isValidPass)) {
                        reject(student.full_name + ' needs to buy a pass before attending class');
                        student.attendedClass = false;
                        return;
                    }
                    if (!student.passes.some(commonFunctions.isPaidPass)) {
                        reject(student.full_name + ' needs to pay for a pass before attending class');
                        student.attendedClass = false;
                        return;
                    }
                    message = {
                        success: "Recorded student's attendance",
                        error: "Issue recording student's attendance..."
                    };
                    promise = dataUpdateService.studentAttendedClass($routeParams.id, student.id);
                } else {
                    message = {
                        success: "Removed student's attendance",
                        error: "Issue removing student's attendance..."
                    };
                    promise = dataDeleteService.studentUnattendedClass($routeParams.id, student.id);
                }

                promise.then(function () {
                    getPassesForStudent(student);
                }).then(function(){
                    resolve(message.success);
                }, function() {
                    student.attendedClass = false;
                    reject(message.error);
                });

            });
        }

        function enrolStudent(studentId, blockId) {
            return $q(function (resolve, revoke) {
                var enrolment = {
                    user_id: studentId,
                    block_ids: [blockId]
                };
                dataUpdateService.enrolInBlock(enrolment).then(resolve, revoke);
            });
        }

        function getPassesForStudent(student) {
            return $q(function (resolve, revoke) {
                dataservice.getUserCurrentPasses(student.id).then(function (passes) {
                    student.passes = passes;
                    resolve();
                }, function () {
                    student.passes = [];
                    resolve();
                });
            });
        }

        function purchaseNewPass(student, passOption) {
            return $q(function (resolve, revoke) {
                var pass = {
                    payment_status: 'paid'
                };
                dataUpdateService.assignPassToStudent(student.id, passOption.id, pass).then(function (){
                    getPassesForStudent(student).then(resolve, resolve);
                }, revoke);
            });
        }

        function passPaidFor(pass) {
            return $q(function (resolve, revoke) {
                pass.payment_status = 'paid';
                dataUpdateService.updatePass(pass).then(resolve, function () {
                    pass.payment_status = 'pending';
                    revoke();
                });
            });
        }

        return service;
    }
})();

(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('authService', authService);

    authService.$inject = ['$q', '$http', '$cookieStore', 'base64Service', 'dataservice'];

    /* @ngInject */
    function authService($q, $http, $cookieStore, base64Service, dataservice){

        var userIdentity = {
            isLoggedIn: false
        };

        var service = {
            login: login,
            logout: logout,
            getUserIdentity: getUserIdentity,
            setUserIdentityProperty: setUserIdentityProperty,
            hasClaim: hasClaim
        };
        init();
        return service;

        function init() {
            var userCookie = $cookieStore.get('authuser');
            if (userCookie !== undefined){
                userIdentity = userCookie;
            }
            var authDataCookie = $cookieStore.get('authdata');
            if (authDataCookie !== undefined){
                addBasicAuthorisation(authDataCookie);
            }

        }

        function hasClaim(claim) {
            if (!userIdentity.claims) {
                return false;
            }

            return userIdentity.claims.filter(function (userClaim) {
                return userClaim === claim;
            }).length > 0;
        }

        function getUserIdentity() {
            return userIdentity;
        }

        function setUserIdentityProperty(propertyName, propertyValue) {
            userIdentity[propertyName] = propertyValue;
            $cookieStore.put('authuser', userIdentity);
        }

        function login(email, password) {
            var encoded = base64Service.encode(email + ':' + password);
            addBasicAuthorisation(encoded);

            return $q(function (resolve, revoke) {
                dataservice.getCurrentUser().then(function (user) {

                    dataservice.getCurrentUserClaims().then(function (claims) {
                        userIdentity.isLoggedIn = true;
                        userIdentity.username = email;

                        userIdentity.userId = user.id;
                        userIdentity.name = user.full_name;
                        userIdentity.claims = claims;

                        $cookieStore.put('authdata', encoded);
                        $cookieStore.put('authuser', userIdentity);

                        resolve();
                    }, function () {
                        userIdentity.isLoggedIn = true;
                        userIdentity.username = email;

                        userIdentity.userId = user.id;
                        userIdentity.name = user.full_name;
                        userIdentity.claims = [];
                        resolve();
                    });
                }, function(response){
                    logout();
                    if (response.status === 401){
                        revoke([{property_name: "global", error_message: "Invalid email or password"}]);
                    }
                });
            });
        }

        function addBasicAuthorisation(encoded) {
            $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
        }

        function logout() {
            document.execCommand("ClearAuthenticationCache");
            $cookieStore.remove('authdata');
            $cookieStore.remove('authuser');
            $http.defaults.headers.common.Authorization = 'Basic ';

            userIdentity = {
                isLoggedIn: false
            };
        }

    }
})();
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('base64Service', base64Service);

    base64Service.$inject = [];

    /* @ngInject */
    function base64Service(){

        var keyStr = 'ABCDEFGHIJKLMNOP' +
        'QRSTUVWXYZabcdef' +
        'ghijklmnopqrstuv' +
        'wxyz0123456789+/' +
        '=';
        
        return {
            encode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;
     
                do {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);
     
                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;
     
                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }
     
                    output = output +
                        keyStr.charAt(enc1) +
                        keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) +
                        keyStr.charAt(enc4);
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
                } while (i < input.length);
     
                return output;
            },
     
            decode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;
     
                // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                var base64test = /[^A-Za-z0-9\+\/\=]/g;
                if (base64test.exec(input)) {
                    alert("There were invalid base64 characters in the input text.\n" +
                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                        "Expect errors in decoding.");
                }
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
     
                do {
                    enc1 = keyStr.indexOf(input.charAt(i++));
                    enc2 = keyStr.indexOf(input.charAt(i++));
                    enc3 = keyStr.indexOf(input.charAt(i++));
                    enc4 = keyStr.indexOf(input.charAt(i++));
     
                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;
     
                    output = output + String.fromCharCode(chr1);
     
                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }
     
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
     
                } while (i < input.length);
     
                return output;
            }
        };

    }
})();
/*global moment*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('displayDate', displayDate)
        .directive('passStatus', passStatus)
        .directive('passSummary', passSummary)
        .directive('validationError', validationError)
        .directive('serverError', serverError)
        .directive('commonInput', commonInput)
        .directive('commonDateTimeInput', commonDateTimeInput)
        .directive('userSearch', userSearch)
        .directive('teacherDropdown', teacherDropdown)
        ;

    /* @ngInject */
    function displayDate () {
        var directive = {
            template: '{{display}}',
            scope: {
              ngModel: '='
            },
            link: function(scope, element, attrs, ngModel){
                if (attrs.format === 'from now') {
                    scope.display = moment(scope.ngModel).utc().fromNow();
                    return;
                }

                var format = '';
                if (attrs.format === 'time') {
                    format = 'h:mmA';
                } else if (attrs.format === 'long date') {
                    format = 'dddd MMMM D';
                } else if (attrs.format === 'short date') {
                    format = 'DD/MM';
                }
                scope.display = moment(scope.ngModel).utc().format(format);
            }
        };
        return directive;
    }

    function passStatus (commonFunctions) {
        var directive = {
            template: '<span class="label label-{{labelClass}} cursor">{{message}}</span>',
            require: 'ngModel',
            scope: {
              ngModel: '='
            },
            link: function(scope, element, attrs){
                scope.$watch('ngModel', function (change){
                    var student = scope.ngModel;
                    if (student.attendedClass) {
                            scope.message = 'all good';
                        scope.labelClass = 'success';
                    } else {
                        if (!student.passes.some(commonFunctions.isValidPass)){
                            scope.message = 'no valid passes';
                            scope.labelClass = 'danger';
                        } else{
                            var anyPaymentPendingPasses = student.passes.filter(function (pass) {
                                return pass.payment_status.toLowerCase() === 'pending';
                            }).length > 0;
                            if (anyPaymentPendingPasses) {
                                scope.message = 'pass needs payment';
                            scope.labelClass = 'warning';
                            } else {
                                scope.message = 'all good';
                            scope.labelClass = 'success';
                            }
                        }
                    }

                }, true);
            }
        };
        return directive;
    }

    function passSummary() {
        var directive = {
            template: '{{passTypeText}} - {{passNumber}} - {{validnessText}}',
            require: 'ngModel',
            scope: {
              ngModel: '='
            },
            link: function(scope, element, attrs){
                scope.passType = scope.ngModel.pass_type;
                scope.paymentStatus = scope.ngModel.payment_status;
                scope.validness = scope.ngModel.valid;
                scope.passNumber = scope.ngModel.pass_number;

                scope.passTypeText = getPassTypeText(scope.ngModel.pass_type);
                scope.validnessText = getValidnessText(scope.ngModel);

            }
        };
        return directive;
    }

    function validationError() {
        var directive = {
            template: '<span class="help-block has-error"><div ng-show="ngModel.$error[error] && ngModel.$touched">{{message}}</div></span>',
            require: 'ngModel',
            scope: {
              ngModel: '='
            },
            link: function(scope, element, attrs){
                scope.message = attrs.message;
                scope.error = attrs.error;

            }
        };
        return directive;
    }

    function serverError() {
        var directive = {
            template: '<span class="help-block has-error"  ng-show="ngModel.serverError && ngModel.$touched"><div>{{ngModel.serverError}}</div></span>',
            require: 'ngModel',
            scope: {
              ngModel: '='
            },
            link: function(scope, element, attrs){

            }
        };
        return directive;
    }

    function commonInput() {
        var directive = {
            template: '<div class="form-group col-xs-12" ng-class="{&apos;has-error&apos;:(getFormElement().$invalid && getFormElement().$touched) || getFormElement().serverError}">'+
                            '<label ng-show="displayName">{{displayName}}</label>'+
                            '<input class="form-control"'+
                            'id="{{name}}"'+
                            'name="{{name}}"'+
                            'type="{{type}}"'+
                            'placeholder="{{displayName}}"'+
                            'ng-model="ngModel"'+
                            'required="{{required}}"/>'+
                            '<span class="help-block has-error">'+
                            '    <span ng-show="hasError(&apos;required&apos;) && getFormElement().$touched">{{displayName}} is required.</span>'+
                            '</span>'+
                        '</div>',
            require: ['^form','ngModel'],
            scope: {
              ngModel: '='
            },
            link: function(scope, element, attrs, ctrls){
                scope.name = attrs.name;
                scope.label = attrs.label;
                scope.displayName = attrs.displayName;
                scope.type = attrs.type;
                scope.required = attrs.required;
                scope.form = ctrls[0];
                scope.formElement = ctrls[0][attrs.name];

                scope.getFormElement = function() {
                    return ctrls[0][attrs.name];
                };

                scope.hasError = function(error) {
                    return scope.getFormElement().$error[error];
                };
            }
        };
        return directive;
    }

    function commonDateTimeInput() {
        var directive = {
            template: '<div class="form-group col-xs-12" ng-class="{&apos;has-error&apos;:(getFormElement().$invalid && getFormElement().$touched) || getFormElement().serverError}">'+
                        '<label ng-show="displayName">{{displayName}}</label>'+
                        '<datetimepicker show-weeks="false" hour-step="1" minute-step="15" ng-model="ngModel" show-meridian="false" date-format="dd-MMM-yyyy" readonly-time="false"></datetimepicker>'+
                        '<span class="help-block has-error">'+
                        '    <span ng-show="hasError(&apos;required&apos;) && getFormElement().$touched">{{displayName}} is required.</span>'+
                        '</span>'+
                        '</div>',
            require: ['^form','ngModel'],
            scope: {
              ngModel: '='
            },
            link: function(scope, element, attrs, ctrls){
                scope.name = attrs.name;
                scope.displayName = attrs.displayName;
                scope.type = attrs.type;
                scope.required = attrs.required;
                scope.form = ctrls[0];
                scope.formElement = ctrls[0][attrs.name];

                scope.getFormElement = function() {
                    return ctrls[0][attrs.name];
                };

                scope.hasError = function(error) {
                    return scope.getFormElement().$error[error];
                };
            }
        };
        return directive;
    }

    function userSearch(dataservice, $q) {
        var directive = {
            template: '<input type="text" placeholder="{{placeholder}}" ng-model="ngModel" typeahead="student as student.full_name for student in searchUsers($viewValue)">',
            require: ['ngModel'],
            scope: {
              ngModel: '='
            },
            link: function(scope, element, attrs){
                scope.placeholder = attrs.placeholder;

                scope.searchUsers = function(name) {
                    return $q(function (resolve, reject) {
                        var search = [
                            {
                                field: 'fullname',
                                condition: 'cont',
                                value: name
                            },
                            {
                                field: 'orderby',
                                condition: 'fullname'
                            }
                        ];

                        dataservice.searchForUserNew(search).then(function (response) {
                            resolve(response.data);
                        }, function (response) {
                            if (response.status === 404) {
                                response.displayMessage = 'No users found...';
                            }
                            reject(response);
                        });
                    });
                };
            }
        };
        return directive;
    }

    function teacherDropdown(dataservice) {
        var directive = {
            template: '<div class="form-group col-xs-12">'+
                        '<select ng-options="teacher as teacher.full_name for teacher in teachers track by teacher.id" ng-model="ngModel[0]">'+
                        '    <option value="">Please select the primary teacher</option>'+
                        '</select>'+
                        '</div>'+
                        '<div class="form-group col-xs-12">'+
                        '<select ng-options="teacher as teacher.full_name for teacher in teachers track by teacher.id" ng-model="ngModel[1]">'+
                        '    <option value="">Please select the secondary teacher (optional)</option>'+
                        '</select>'+
                        '</div>',
            require: ['ngModel'],
            scope: {
              ngModel: '='
            },
            link: function(scope, element, attrs){
                scope.teachers = [];
                dataservice.getAllTeachers().then(function (teachers) {
                    scope.teachers = teachers;
                });
                if (!scope.ngModel || !(scope.ngModel instanceof Array)){
                    scope.ngModel = [];
                }
            }
        };
        return directive;
    }

    function getPassTypeText(passType) {
        var passTypeLowerCase = passType.toLowerCase();
        if (passTypeLowerCase === 'clip') {
            return 'Clip pass';
        }
        if (passTypeLowerCase === 'single') {
            return 'Single pass';
        }
        if (passTypeLowerCase === 'unlimited') {
            return 'Unlimited pass';
        }
    }

    function getValidnessText(pass) {
        var text = '';
        if (pass.pass_type.toLowerCase() !== 'unlimited') {
            text = pass.clips_remaining + ' clip';
            if (pass.clips_remaining > 1) {
                text = text + 's';
            }
            text = text + ' remaining, and ';
        }

        text = text + 'expires on the ' + moment(pass.end_date).format('dddd MMMM D');
        return text;
    }

})();
(function () {
    'use strict';

        if (!Array.prototype.any) {
            Array.prototype.any = function() {
               return this.length > 0;
            };
        }

        if (!Array.prototype.remove) {
            Array.prototype.remove = function(item) {
               var index = this.indexOf(item);
               if (index > -1) {
                this.splice(index, 1);
               }
            };
        }

        if (!Array.prototype.getFirstOrDefault) {
            Array.prototype.getFirstOrDefault = function(prop, value) {
                var matchingItem = this.filter(function(item) {
                    return item[prop] === value;
                })[0];
                return matchingItem;
            };
        }

    angular
        .module('app.core')
        .factory('commonFunctions', commonFunctions);

    commonFunctions.$inject = [];

    /* @ngInject */
    function commonFunctions() {
        
        var service = {
            isValidPass: isValidPass,
            isPaidPass: isPaidPass
        };

        return service;

        function isValidPass(pass) {
            return pass.valid;
        }

        function isPaidPass(pass) {
            return pass.payment_status && pass.payment_status.toLowerCase() === 'paid';
        }
    }
})();
(function () {
    'use strict';

    var core = angular.module('app.core');
    core.config(toastrConfig);

    /* @ngInject */
    function toastrConfig(toastr){
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appErrorPrefix: '[Speedy Donkey LOCAL Error] ', //Configure the exceptionHandler decorator
        appTitle: 'Speedy Donkey LOCAL',
        apiUrl: 'api-speedydonkey.azurewebsites.net',
        version: '3.0.0'
    };

    core.value('config', config);

    core.config(configure);

    /* @ngInject */
    function configure ($logProvider, $routeProvider, routehelperConfigProvider, exceptionConfigProvider) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        // Configure the common route provider
        routehelperConfigProvider.config.$routeProvider = $routeProvider;
        routehelperConfigProvider.config.docTitle = 'Speedy Donkey LOCAL: ';

        // Configure the common exception handler
        exceptionConfigProvider.config.appErrorPrefix = config.appErrorPrefix;
    }

})();
/* global toastr:false, moment:false */
(function () {
    'use strict';

    angular
        .module('app.core')
        .constant('toastr', toastr)
        .constant('moment', moment);
})();
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataCreateService', dataCreateService);

    dataCreateService.$inject = ['$q', 'apiCaller', 'authService', 'dateService'];

    /* @ngInject */
    function dataCreateService($q, apiCaller, authService, dateService) {
        var service = {
            createUser: createUser,
            createPassOption: createPassOption,
            createLevel: createLevel,
            createBlock: createBlock,
            createTeacher: createTeacher
        };

        return service;

        function createUser(user) {
            return $q(function (resolve, reject) {
                apiCaller.postUser(user).success(function(response) {
                    resolve(response.action_result);
                }).error(function(response) {
                    reject(response);
                });
            });
        }

        function createPassOption(passOption) {
            return $q(function (resolve, reject) {
                apiCaller.postPassOption(passOption).success(function(response) {
                    resolve(response.action_result);
                }).error(function(response) {
                    reject(response);
                });
            });
        }

        function createLevel(level) {
            return $q(function (resolve, reject) {
                apiCaller.postLevel(level).success(function(response) {
                    resolve(response.action_result);
                }).error(function(response) {
                    reject(response);
                });
            });
        }

        function createBlock(levelId) {
            return $q(function (resolve, reject) {
                apiCaller.postBlock(levelId).success(function(response) {
                    resolve(response.action_result);
                }).error(function(response) {
                    reject(response);
                });
            });
        }

        function createTeacher(userId) {
            return $q(function (resolve, reject) {
                apiCaller.postTeacher(userId).success(function(response) {
                    resolve(response.action_result);
                }).error(function(response) {
                    reject(response);
                });
            });
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataDeleteService', dataDeleteService);

    dataDeleteService.$inject = ['$q', 'apiCaller'];

    /* @ngInject */
    function dataDeleteService($q, apiCaller) {
        var service = {
            studentUnattendedClass: studentUnattendedClass,
            deletePassOption: deletePassOption,
            deleteLevel: deleteLevel,
            deleteBlock: deleteBlock,
            deleteClass: deleteClass,
            deleteTeacher: deleteTeacher,
            deleteUser: deleteUser
        };

        function studentUnattendedClass(classId, studentId){

            return $q(function (resolve, revoke) {
                apiCaller.deleteClassAttendance(classId, studentId).then(resolve, revoke);
            });
        }

        function deletePassOption(id){
            return $q(function (resolve, revoke) {
                apiCaller.deletePassOption(id).then(resolve, revoke);
            });
        }

        function deleteLevel(id){
            return $q(function (resolve, revoke) {
                apiCaller.deleteLevel(id).then(resolve, revoke);
            });
        }

        function deleteBlock(id){
            return $q(function (resolve, revoke) {
                apiCaller.deleteBlock(id).then(resolve, revoke);
            });
        }

        function deleteClass(id){
            return $q(function (resolve, revoke) {
                apiCaller.deleteClass(id).then(resolve, revoke);
            });
        }

        function deleteTeacher(id){
            return $q(function (resolve, revoke) {
                apiCaller.deleteTeacher(id).then(resolve, revoke);
            });
        }

        function deleteUser(id){
            return $q(function (resolve, revoke) {
                apiCaller.deleteUser(id).then(resolve, revoke);
            });
        }

        return service;
    }
})();
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataUpdateService', dataUpdateService);

    dataUpdateService.$inject = ['$q', 'apiCaller'];

    /* @ngInject */
    function dataUpdateService($q, apiCaller) {
        var service = {
            activateUser: activateUser,
            forgottenPassword: forgottenPassword,
            resetPassword: resetPassword,

            updateUser: updateUser,

            enrolInBlock: enrolInBlock,
            studentAttendedClass: studentAttendedClass,
            assignPassToStudent: assignPassToStudent,
            assignPassToCurrentUser: assignPassToCurrentUser,

            updatePass: updatePass,

            updatePassOption: updatePassOption,

            updateLevel: updateLevel,

            updateBlock: updateBlock,

            updateClass: updateClass
        };

        return service;

        function activateUser(key) {
            return $q(function (resolve, revoke) {
                apiCaller.postUserActivation(key).then(function(response) {
                    resolve();
                }, function () {
                    revoke();
                });
            });
        }

        function forgottenPassword(email) {
            return $q(function (resolve, revoke) {
                apiCaller.postUserPasswordReset(email).then(function(response) {
                    resolve();
                }, function () {
                    revoke();
                });
            });
        }

        function resetPassword(key, password) {
            return $q(function (resolve, revoke) {
                apiCaller.putUserPasswordReset(key, password).then(function(response) {
                    resolve();
                }, function (response) {
                    revoke(response.data.validation_errors);
                });
            });
        }

        function updateUser(user) {
            return $q(function (resolve, revoke) {
                apiCaller.putCurrentUser(user).then(function(response) {
                    resolve();
                }, function (response) {
                    revoke(response.data.validation_errors);
                });
            });
        }



        function enrolInBlock(enrolment) {
            return $q(function (resolve, revoke) {
                apiCaller.postBlockEnrolment(enrolment).then(function(response) {
                    resolve();
                }, function () {
                    revoke();
                });
            });
        }

        function studentAttendedClass(classId, studentId) {
            return $q(function (resolve, revoke) {
                apiCaller.postClassAttendance(classId, studentId).then(resolve, revoke);
            });
        }

        function assignPassToStudent(studentId, passOptionId, pass) {
            return $q(function (resolve, revoke) {
                apiCaller.postPassAssignment(studentId, passOptionId, pass).then(resolve, revoke);
            });
        }

        function assignPassToCurrentUser(passOptionId, pass) {
            return $q(function (resolve, revoke) {
                apiCaller.postCurrentUserPassAssignment(passOptionId, pass).then(resolve, revoke);
            });
        }

        function updatePass(pass) {
            return $q(function (resolve, revoke) {
                apiCaller.putPass(pass).then(resolve, revoke);
            });
        }

        function updatePassOption(passOption) {
            return $q(function (resolve, revoke) {
                apiCaller.putPassOption(passOption).then(resolve, revoke);
            });
        }

        function updateLevel(level) {
            return $q(function (resolve, revoke) {
                apiCaller.putLevel(level).then(resolve, revoke);
            });
        }

        function updateBlock(block) {
            return $q(function (resolve, revoke) {
                apiCaller.putBlock(block).then(resolve, revoke);
            });
        }

        function updateClass(theClass) {
            return $q(function (resolve, revoke) {
                apiCaller.putClass(theClass).then(resolve, revoke);
            });
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$q', 'apiCaller', 'dateService'];

    /* @ngInject */
    function dataservice($q, apiCaller, dateService) {
        var service = {

            getUser: getUser,
            searchForUser: searchForUser,
            searchForUserNew: searchForUserNew,
            getCurrentUser: getCurrentUser,
            getAllUsers: getAllUsers,

            getCurrentUserSchedule: getCurrentUserSchedule,
            getCurrentUserCurrentPasses: getCurrentUserCurrentPasses,
            getUserCurrentPasses: getUserCurrentPasses,
            getUserEnroledBlocks: getUserEnroledBlocks,
            getCurrentUserClaims: getCurrentUserClaims,

            getAllBlocks: getAllBlocks,
            getAllActiveBlocks: getAllActiveBlocks,

            getClass: getClass,
            searchForClasses: searchForClasses,
            getClassRegisteredStudents: getClassRegisteredStudents,
            getClassAttendance: getClassAttendance,

            getAllPassOptions: getAllPassOptions,

            getAllLevels: getAllLevels,

            getAllActiveClasses: getAllActiveClasses,

            getAllTeachers: getAllTeachers,

            getProfitReport: getProfitReport
        };

        return service;

        function getUser(userId) {
            return $q(function (resolve, revoke) {
                apiCaller.getUser(userId).then(function (response) {
                    resolve(response.data);
                }, revoke);
            });
        }

        function searchForUser(searchParameters) {

            var q = '';
            for (var prop in searchParameters) {
                if (searchParameters.hasOwnProperty(prop)) {
                    q = q + '&' + prop + '_=_' + searchParameters[prop];
                }
            }
            q = q.slice(1);

            return apiCaller.searchUser(q);
        }

        function searchForUserNew(searchParameters) {

            var q = '';
            searchParameters.forEach(function (search, index) {
                if (index > 0){
                    q = q + ',';
                }
                q = q + search.field + '_' + search.condition;
                if (search.value) {
                    q = q +  '_' + search.value;
                }
            });

            return apiCaller.searchUser(q);
        }

        function getCurrentUser() {
            return $q(function (resolve, revoke) {
                apiCaller.getCurrentUser().then(function (response) {
                    resolve(response.data);
                }, revoke);
            });
        }

        function getAllUsers() {
            return $q(function (resolve, revoke) {
                apiCaller.getUsers().then(function (response) {
                    resolve(response.data);
                }, revoke);
            });
        }

        function getCurrentUserSchedule() {
            return $q(function (resolve, reject) {
                apiCaller.getCurrentUserSchedule().then(function (response) {
                    resolve(response.data);
                }, function (response) {
                    reject(response);
                });
            });
        }

        function getCurrentUserCurrentPasses() {
            return getUserCurrentPasses('current');
        }

        function getUserCurrentPasses(userId) {
            return $q(function (resolve, reject) {
                apiCaller.getUserCurrentPasses(userId).then(function (response) {
                    resolve(response.data);
                }, function (response) {
                    reject(response);
                });
            });
        }

        function getUserEnroledBlocks() {
            return $q(function (resolve, reject) {
                apiCaller.getUserEnroledBlocks().then(function (response) {
                    resolve(response.data);
                }, function (response) {
                    reject(response);
                });
            });
        }

        function getCurrentUserClaims() {
            return $q(function (resolve, reject) {
                apiCaller.getCurrentUserClaims().then(function (response) {
                    resolve(response.data);
                }, function (response) {
                    reject(response);
                });
            });
        }

        function getAllBlocks() {
            return $q(function (resolve, reject) {
                apiCaller.getBlock().then(function (response) {
                    resolve(response.data);
                }, function (response) {
                    reject(response);
                });
            });
        }

        function getAllActiveBlocks() {
            return $q(function (resolve, reject) {
                var today = moment().format('YYYY-MM-DD');
                apiCaller.searchBlock('endDate_gt_' + today).then(function (response) {
                    resolve(response.data);
                }, function (response) {
                    reject(response);
                });
            });
        }

        function getClass(id) {
            return $q(function (resolve, revoke) {
                apiCaller.getClass(id).then(function (response) {
                    resolve(response.data);
                }, revoke);
            });
        }

        function searchForClasses(searchParameters) {

            var q = '';
            searchParameters.forEach(function (search, index) {
                if (index > 0){
                    q = q + ',';
                }
                q = q + search.field + '_' + search.condition + '_' + search.value;
            });

            return apiCaller.searchClass(q);
        }

        function getClassRegisteredStudents(id) {
            return $q(function (resolve, reject) {
                apiCaller.getClassRegisteredStudents(id).then(function (response) {
                    resolve(response.data);
                }, function (response) {
                    reject(response);
                });
            });
        }

        function getClassAttendance(id) {
            return $q(function (resolve, reject) {
                apiCaller.getClassAttendance(id).then(function (response) {
                    resolve(response.data);
                }, function (response) {
                    reject(response);
                });
            });
        }

        function getAllPassOptions() {
            return $q(function (resolve, reject) {
                apiCaller.getPassOption().then(function (response) {
                    resolve(response.data);
                }, function (response) {
                    reject(response);
                });
            });
        }

        function getAllLevels() {
            return $q(function (resolve, reject) {
                apiCaller.getLevel().then(function (response) {
                    resolve(response.data);
                }, function (response) {
                    reject(response);
                });
            });
        }

        function getAllActiveClasses() {
            return $q(function (resolve, reject) {
                var yesterday = moment().add('day', -1).format('YYYY-MM-DD');
                apiCaller.searchClass('endTime_gt_' + yesterday + ',take_10').then(function (response) {
                    resolve(response.data);
                }, function (response) {
                    reject(response);
                });
            });
        }

        function getAllTeachers() {
            return $q(function (resolve, reject) {
                apiCaller.getTeacher().then(function (response) {
                    resolve(response.data);
                }, function (response) {
                    reject(response);
                });
            });
        }

        function getProfitReport(starting, ending) {
            return $q(function (resolve, reject) {
                apiCaller.getProfitReport(starting, ending).then(function (response) {
                    resolve(response.data);
                }, function (response) {
                    reject(response);
                });
            });
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dateService', dateService);

    dateService.$inject = [];

    /* @ngInject */
    function dateService() {
        var service = {

            convertStringsToDates: convertStringsToDates
        };

        return service;

        function convertStringsToDates(object) {
            if (isArray(object)){
                object.forEach(function (item) {
                    convertStringsToDates(item);
                });
            } else {
                for (var prop in object) {
                    if (object.hasOwnProperty(prop)) {
                        if (isDateProperty(prop)){
                            var stringValue = object[prop];
                            var dateValue = new Date(stringValue);
                            object[prop] = dateValue;
                        } else if (typeof object[prop] === 'object') {
                            convertStringsToDates(object[prop]);
                        }
                    }
                }
            }
        }
    }

    function isDateProperty(propertyName) {
        return propertyName.toLowerCase().indexOf('date') > -1 || propertyName.toLowerCase().indexOf('time') > -1;
    }

    function isArray(object) {
        if (Array.isArray) {
            return Array.isArray(object);
        }
        return object instanceof Array;
    }
})();
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('selectOptionService', selectOptionService);

    selectOptionService.$inject = [];

    /* @ngInject */
    function selectOptionService() {
        var service = {
            getPassTypes: getPassTypes
        };

        function getPassTypes() {
            return [
                {
                    display: 'Clip',
                    value: 'clip'
                },
                {
                    display: 'Unlimited',
                    value: 'unlimited'
                },
            ];
        }

        return service;
    }
})();
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('validationService', validationService);

    validationService.$inject = [];

    /* @ngInject */
    function validationService(){

        var service = {
            applyServerSideErrors: applyServerSideErrors
        };

        function applyServerSideErrors(form, errors) {
            if (!errors) {
                return;
            }

            form.serverErrors = [];
            errors.forEach(function (error) {
                var relatedFormElement = form[error.property_name.toLowerCase()];
                if (relatedFormElement){
                    form[error.property_name.toLowerCase()].serverError = error.error_message;
                } else {
                    form.serverErrors.push(error.error_message);
                }
            });
        }

        return service;

    }
})();
(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);

    Dashboard.$inject = ['$q', 'dashboardService', 'logger', 'authService', 'config'];

    /* @ngInject */
    function Dashboard($q, dashboardService, logger, authService, config) {
        /*jshint validthis: true */
        var vm = this;
        vm.upcomingSchedule = [];
        vm.currentPasses = [];
        vm.todaysClasses = [];
        vm.isScheduleLoading = true;
        vm.arePassesLoading = true;
        vm.areClassesLoading = true;
        vm.canPerformClassCheckIn = authService.hasClaim('CheckStudentIntoClass');
        vm.companyName = config.appTitle;

        activate();

        function activate() {
            var promises = [getSchedule(), getCurrentPasses(), getClassesForCheckIn()];
            return $q.all(promises)
            .then(function(){
                logger.info('Activated Dashboard View');
            });
        }

        function getSchedule() {
            return dashboardService.getSchedule().then(function (schedule) {
                vm.upcomingSchedule = schedule;
                vm.isScheduleLoading = false;
            }, function (error){
                if (!error.displayMessage) {
                    error.displayMessage = "Issue getting schedule...";
                }
                logger.error(error.displayMessage);
                vm.isScheduleLoading = false;
            });
        }

        function getCurrentPasses() {
            return dashboardService.getCurrentPasses().then(function (passes) {
                vm.currentPasses = passes;
                vm.arePassesLoading = false;
            }, function (error){
                if (!error.displayMessage) {
                    error.displayMessage = "Issue getting passes...";
                }
                logger.error(error.displayMessage);
                vm.arePassesLoading = false;
            });
        }

        function getClassesForCheckIn() {
            if (!vm.canPerformClassCheckIn) {
                return $q.when();
            }

            return dashboardService.getClassesForCheckIn().then(function (classes) {
                vm.todaysClasses = classes;
                vm.areClassesLoading = false;
            }, function (error){
                if (!error.displayMessage) {
                    error.displayMessage = "Issue getting classes for check in...";
                }
                logger.error(error.displayMessage);
                vm.areClassesLoading = false;
            });
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .factory('dashboardService', dashboardService);

    dashboardService.$inject = ['$q', 'dataservice', 'logger', 'authService'];

    /* @ngInject */
    function dashboardService($q, dataservice, logger, authService) {
        /*jshint validthis: true */
        
        var service = {
            getSchedule: getSchedule,
            getCurrentPasses: getCurrentPasses,
            getClassesForCheckIn: getClassesForCheckIn
        };

        function getSchedule() {
            return $q(function (resolve, reject) {
                dataservice.getCurrentUserSchedule().then(function(schedule) {
                    resolve(schedule);
                }, function (response) {
                    if (response.status === 404) {
                        response.displayMessage = 'Nothing scheduled yet...';
                    }
                    reject(response);
                });
            });
        }

        function getCurrentPasses() {
            return $q(function (resolve, reject) {
                dataservice.getCurrentUserCurrentPasses().then(function(passes) {
                    resolve(passes);
                }, function (response) {
                    if (response.status === 404) {
                        response.displayMessage = 'No current passes...';
                    }
                    reject(response);
                });
            });
        }

        function getClassesForCheckIn() {
            return $q(function (resolve, reject) {
                var search = [
                    {
                        field: 'starttime',
                        condition: 'gt',
                        value: moment().format('YYYY-MM-DD')
                    },
                    {
                        field: 'starttime',
                        condition: 'lt',
                        value: moment().add(1, 'day').format('YYYY-MM-DD')
                    }
                ];
                dataservice.searchForClasses(search).then(function(response) {
                    resolve(response.data);
                }, function (response) {
                    if (response.status === 404) {
                        response.displayMessage = 'No classes for today...';
                    }
                    reject(response);
                });
            });
        }

        return service;
    }
})();

(function () {
    'use strict';

    angular
        .module('app.forgottenPassword')
        .controller('ForgottenPassword', ForgottenPassword);

    ForgottenPassword.$inject = ['logger', 'dataUpdateService', 'validationService'];

    /* @ngInject */
    function ForgottenPassword(logger, dataUpdateService, validationService) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Forgotten Password';
        vm.isSubmitted = false;

        vm.submit = function(form){
            dataUpdateService.forgottenPassword(vm.email).then(function() {
                vm.isSubmitted = true;
            });
        };

        activate();

        function activate() {
            logger.info('Activated Forgotten Password View');
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('Shell', Shell);

    Shell.$inject = ['$timeout', 'config', 'logger', 'authService', 'routehelper'];

    function Shell($timeout, config, logger, authService, routehelper) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = config.appTitle;
        vm.busyMessage = 'Please wait ...';
        vm.isBusy = true;
        vm.showSplash = true;
        vm.getUserIdentity = authService.getUserIdentity;
        vm.loginUrl = '#/login';
        vm.registerUrl = '#/register/user';
        vm.manageUserUrl = '#/manageUser';
        vm.logout = function() {
            authService.logout();
            routehelper.redirectToRoute('login');
        };

        activate();

        function activate() {
            logger.success(config.appTitle + ' loaded!', null);
            hideSplash();
        }

        function hideSplash() {
            //TODO: Force a 1 second delay so we can see the splash.
            $timeout(function () {
                vm.showSplash = false;
            }, 1000);
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('Sidebar', Sidebar)
        .filter('authorisedLink', function(authService) {
            
        });

    Sidebar.$inject = ['$route', 'routehelper'];

    function Sidebar($route, routehelper) {
        /*jshint validthis: true */
        var vm = this;
        var routes = routehelper.getRoutes();

        vm.isCurrent = isCurrent;

        activate();

        function activate() { getNavRoutes(); }

        function getNavRoutes() {
            vm.navRoutes = routes.filter(function (r) {
                return r.settings && r.settings.nav;
            }).sort(function (r1, r2) {
                return r1.settings.nav - r2.settings.nav;
            });
        }

        function isCurrent(route) {
            if (!route.title || !$route.current || !$route.current.title) {
                return '';
            }
            var menuName = route.title;
            return $route.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('app.logon')
        .controller('Login', Login);

    Login.$inject = ['logger', 'authService', 'routehelper', 'validationService', 'config'];

    /* @ngInject */
    function Login(logger, authService, routehelper, validationService, config) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Login';
        vm.forgottenPasswordUrl = '#/forgottenPassword';
        vm.registerUrl = '#/register/user';
        vm.company = config.appTitle;
        vm.submit = function(form){
            authService.login(vm.email, vm.password).then(function() {
                routehelper.redirectToRoute('dashboard');
            }, function(validation_errors) {
                validationService.applyServerSideErrors(form, validation_errors);
            });
        };

        activate();

        function activate() {
            logger.info('Activated Login View');
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('app.manageBlocks')
        .controller('ManageBlocks', ManageBlocks)
        .controller('ManageBlock', ManageBlock);

    ManageBlocks.$inject = ['$q', 'logger', 'manageBlocksService'];

    /* @ngInject */
    function ManageBlocks($q, logger, manageBlocksService) {
        /*jshint validthis: true */
        var vm = this;
        vm.blocks = [];

        activate();

        function activate() {
            var promises = [getBlocks()];
            return $q.all(promises)
            .then(function(){
                logger.info('Activated Manage Blocks');
            });
        }

        function getBlocks() {
            manageBlocksService.getBlocks().then(function(blocks) {
                vm.blocks = blocks;
            }, function(){
                logger.error('Failed to get blocks');
            });
        }
    }

    ManageBlock.$inject = ['$scope', 'manageBlocksService', 'validationService', 'logger'];

    function ManageBlock($scope, manageBlocksService, validationService, logger) {
        var vm = {};
        $scope.vm.submitText = 'Update';
        $scope.vm.cancelText = 'Close';
        var copy = {};

        $scope.vm.startUpdating = function() {
            copy = angular.copy($scope.vm.block);
            $scope.vm.updating = true;
        };

        $scope.vm.submit = function(form) {
            manageBlocksService.update($scope.vm.block).then(function (){
                logger.success('Block updated');
                $scope.vm.updating = false;
            }, function(errors) {
                validationService.applyServerSideErrors(form, errors);
            });
        };

        $scope.vm.delete = function() {
            manageBlocksService.deleteBlock($scope.vm.block.id).then(function (){
                logger.success('Block deleted');
                $scope.$parent.vm.blocks.remove($scope.vm.block);
            }, function(errors) {
                logger.error("Failed to delete block");
            });
        };

        $scope.vm.cancel = function() {
            $scope.vm.block = copy;
            $scope.vm.updating = false;
            $scope.form.$setUntouched();
        };
    }
})();
(function () {
    'use strict';

    angular
        .module('app.manageBlocks')
        .factory('manageBlocksService', manageBlocksService);

    manageBlocksService.$inject = ['$q', 'logger', 'dataservice', 'dataUpdateService', 'dataCreateService', 'dataDeleteService'];

    /* @ngInject */
    function manageBlocksService($q, logger, dataservice, dataUpdateService, dataCreateService, dataDeleteService){

        var service = {
            update: update,
            getBlocks: getBlocks,
            deleteBlock: deleteBlock
        };

        function update(block) {
            return $q(function (resolve, revoke) {
                dataUpdateService.updateBlock(block).then(function (updatedBlock) {
                    resolve(updatedBlock);
                }, function(response) {
                    if (response.validation_result !== undefined){
                        revoke(response.validation_result.validation_errors);
                    } else {
                        revoke();
                    }
                });
            });
        }

        function getBlocks() {
            return $q(function (resolve, revoke) {
                dataservice.getAllActiveBlocks().then(function (blocks) {
                    resolve(blocks);
                }, revoke);
            });
        }

        function deleteBlock(id) {
            return $q(function (resolve, revoke) {
                dataDeleteService.deleteBlock(id).then(resolve, revoke);
            });
        }

        return service;

    }
})();
(function () {
    'use strict';

    angular
        .module('app.manageClasses')
        .controller('ManageClasses', ManageClasses)
        .controller('ManageClass', ManageClass);

    ManageClasses.$inject = ['$q', 'logger', 'manageClassesService'];

    /* @ngInject */
    function ManageClasses($q, logger, manageClassesService) {
        /*jshint validthis: true */
        var vm = this;
        vm.classes = [];

        activate();

        function activate() {
            var promises = [getClasses()];
            return $q.all(promises)
            .then(function(){
                logger.info('Activated Manage Classes');
            });
        }

        function getClasses() {
            manageClassesService.getClasses().then(function(classes) {
                vm.classes = classes;
            }, function(){
                logger.error('Failed to get classes');
            });
        }
    }

    ManageClass.$inject = ['$scope', 'manageClassesService', 'validationService', 'logger'];

    function ManageClass($scope, manageClassesService, validationService, logger) {
        var vm = {};
        $scope.vm.submitText = 'Update';
        $scope.vm.cancelText = 'Close';
        var copy = {};

        $scope.vm.startUpdating = function() {
            copy = angular.copy($scope.vm.class);
            $scope.vm.updating = true;
        };

        $scope.vm.submit = function(form) {
            manageClassesService.update($scope.vm.class).then(function (){
                logger.success('Class updated');
                $scope.vm.updating = false;
            }, function(errors) {
                validationService.applyServerSideErrors(form, errors);
            });
        };

        $scope.vm.delete = function() {
            manageClassesService.deleteClass($scope.vm.class.id).then(function (){
                logger.success('Class deleted');
                $scope.$parent.vm.classes.remove($scope.vm.class);
            }, function(errors) {
                logger.error("Failed to delete class");
            });
        };

        $scope.vm.cancel = function() {
            $scope.vm.class = copy;
            $scope.vm.updating = false;
            $scope.form.$setUntouched();
        };
    }
})();
(function () {
    'use strict';

    angular
        .module('app.manageClasses')
        .factory('manageClassesService', manageClassesService);

    manageClassesService.$inject = ['$q', 'logger', 'dataservice', 'dataUpdateService', 'dataCreateService', 'dataDeleteService'];

    /* @ngInject */
    function manageClassesService($q, logger, dataservice, dataUpdateService, dataCreateService, dataDeleteService){

        var service = {
            update: update,
            getClasses: getClasses,
            deleteClass: deleteClass
        };

        function update(theClass) {
            return $q(function (resolve, revoke) {
                dataUpdateService.updateClass(theClass).then(function (updatedClass) {
                    resolve(updatedClass);
                }, function(response) {
                    if (response.validation_result !== undefined){
                        revoke(response.validation_result.validation_errors);
                    } else {
                        revoke();
                    }
                });
            });
        }

        function getClasses() {
            return $q(function (resolve, revoke) {
                dataservice.getAllActiveClasses().then(function (classes) {
                    resolve(classes);
                }, revoke);
            });
        }

        function deleteClass(id) {
            return $q(function (resolve, revoke) {
                dataDeleteService.deleteClass(id).then(resolve, revoke);
            });
        }

        return service;

    }
})();
(function () {
    'use strict';

    angular
        .module('app.manageLevels')
        .controller('ManageLevels', ManageLevels)
        .controller('NewLevel', NewLevel)
        .controller('ManageLevel', ManageLevel);

    ManageLevels.$inject = ['$q', 'logger', 'manageLevelsService'];

    /* @ngInject */
    function ManageLevels($q, logger, manageLevelsService) {
        /*jshint validthis: true */
        var vm = this;
        vm.levels = [];

        vm.generateForAllLevels = function() {
            manageLevelsService.generateAllBlocks().then(function () {
                logger.success('All blocks generated');
            }, function() {
                logger.error('Problem generating blocks');
            });
        };

        activate();

        function activate() {
            var promises = [getLevels()];
            return $q.all(promises)
            .then(function(){
                logger.info('Activated Manage Levels');
            });
        }

        function getLevels() {
            manageLevelsService.getLevels().then(function(levels) {
                vm.levels = levels;
            }, function(){
                logger.error('Failed to get levels');
            });
        }
    }

    NewLevel.$inject = ['$scope', 'manageLevelsService', 'validationService', 'logger'];

    function NewLevel($scope, manageLevelsService, validationService, logger) {
        $scope.vm = {};
        $scope.vm.submitText = 'Add';
        $scope.vm.cancelText = 'Cancel';
        $scope.vm.level = {
            teachers: []
        };

        $scope.vm.submit = function(form) {
            manageLevelsService.create($scope.vm.level).then(function (createdLevel){
                logger.success('New level created');
                $scope.$parent.vm.levels.push(createdLevel);
                $scope.vm.addingNew = false;
                $scope.vm.level = {
                    teachers: []
                };
                $scope.form.$setUntouched();
            }, function(errors) {
                validationService.applyServerSideErrors(form, errors);
            });
        };

        $scope.vm.cancel = function() {
            $scope.vm.addingNew = false;
            $scope.vm.level = {};
            $scope.form.$setUntouched();
        };
    }

    ManageLevel.$inject = ['$scope', 'manageLevelsService', 'validationService', 'logger'];

    function ManageLevel($scope, manageLevelsService, validationService, logger) {
        //$scope.vm.levels = $scope.$parent.vm.levels;
        var vm = {};
        $scope.vm.submitText = 'Update';
        $scope.vm.cancelText = 'Close';
        var copy = {};

        $scope.vm.startUpdating = function() {
            copy = angular.copy($scope.vm.level);
            $scope.vm.updating = true;
        };

        $scope.vm.submit = function(form) {
            manageLevelsService.update($scope.vm.level).then(function (){
                logger.success('Level updated');
                $scope.vm.updating = false;
            }, function(errors) {
                validationService.applyServerSideErrors(form, errors);
            });
        };

        $scope.vm.generateBlock = function() {
            manageLevelsService.generateBlock($scope.vm.level.id).then(function () {
                logger.success('Block generated');
            }, function() {
                logger.error('Problem generating block');
            });
        };

        $scope.vm.delete = function() {
            manageLevelsService.deleteLevel($scope.vm.level.id).then(function (){
                logger.success('Level deleted');
                $scope.$parent.vm.levels.remove($scope.vm.level);
            }, function(errors) {
                logger.error("Failed to delete level");
            });
        };

        $scope.vm.cancel = function() {
            $scope.vm.level = copy;
            $scope.vm.updating = false;
            $scope.form.$setUntouched();
        };
    }
})();
(function () {
    'use strict';

    angular
        .module('app.manageLevels')
        .factory('manageLevelsService', manageLevelsService);

    manageLevelsService.$inject = ['$q', 'logger', 'dataservice', 'dataUpdateService', 'dataCreateService', 'dataDeleteService'];

    /* @ngInject */
    function manageLevelsService($q, logger, dataservice, dataUpdateService, dataCreateService, dataDeleteService){

        var service = {
            create: create,
            update: update,
            getLevels: getLevels,
            generateBlock: generateBlock,
            generateAllBlocks: generateAllBlocks,
            deleteLevel: deleteLevel
        };

        function create(level) {
            return $q(function (resolve, revoke) {
                dataCreateService.createLevel(level).then(function (createdLevel) {
                    resolve(createdLevel);
                }, function(response) {
                    if (response.validation_result !== undefined){
                        revoke(response.validation_result.validation_errors);
                    } else {
                        revoke();
                    }
                });
            });
        }

        function update(level) {
            return $q(function (resolve, revoke) {
                dataUpdateService.updateLevel(level).then(function (updatedLevel) {
                    resolve(updatedLevel);
                }, function(response) {
                    if (response.validation_result !== undefined){
                        revoke(response.validation_result.validation_errors);
                    } else {
                        revoke();
                    }
                });
            });
        }

        function getLevels() {
            return $q(function (resolve, revoke) {
                dataservice.getAllLevels().then(function (passOptions) {
                    resolve(passOptions);
                }, revoke);
            });
        }

        function generateBlock(id) {
            return $q(function (resolve, revoke) {
                dataCreateService.createBlock(id).then(resolve, revoke);
            });
        }

        function generateAllBlocks() {
            return generateBlock('all');
        }

        function deleteLevel(id) {
            return $q(function (resolve, revoke) {
                dataDeleteService.deleteLevel(id).then(resolve, revoke);
            });
        }

        return service;

    }
})();
(function () {
    'use strict';

    angular
        .module('app.managePassOptions')
        .controller('ManagePassOptions', ManagePassOptions)
        .controller('NewPassOptions', NewPassOptions)
        .controller('UpdatePassOptions', UpdatePassOptions);

    ManagePassOptions.$inject = ['$q', 'logger', 'selectOptionService', 'managePassOptionsService'];

    /* @ngInject */
    function ManagePassOptions($q, logger, selectOptionService, managePassOptionsService) {
        /*jshint validthis: true */
        var vm = this;
        vm.passTypes = [];
        vm.passOptions = [];

        activate();

        function activate() {
            var promises = [getPassTypes(), getPassOptions()];
            return $q.all(promises)
            .then(function(){
                logger.info('Activated Manage Pass Options');
            });
        }

        function getPassTypes() {
            $q(function (resolve) {
                vm.passTypes = selectOptionService.getPassTypes();
                resolve();
            });
        }

        function getPassOptions() {
            managePassOptionsService.getPassOptions().then(function(passOptions) {
                vm.passOptions = passOptions;
            }, function(){
                logger.error('Failed to get pass options');
            });
        }
    }

    NewPassOptions.$inject = ['$scope', 'managePassOptionsService', 'validationService', 'logger'];

    function NewPassOptions($scope, managePassOptionsService, validationService, logger) {
        $scope.vm = {};
        $scope.vm.passTypes = $scope.$parent.vm.passTypes;
        $scope.vm.submitText = 'Add';
        $scope.vm.cancelText = 'Cancel';

        $scope.vm.submit = function(form) {
            managePassOptionsService.create($scope.vm.passOption).then(function (createPassOption){
                logger.success('New pass option created');
                $scope.$parent.vm.passOptions.push(createPassOption);
                $scope.vm.addingNew = false;
                $scope.vm.passOption = {};
                $scope.form.$setUntouched();
            }, function(errors) {
                validationService.applyServerSideErrors(form, errors);
            });
        };

        $scope.vm.cancel = function() {
            $scope.vm.addingNew = false;
            $scope.vm.passOption = {};
            $scope.form.$setUntouched();
        };
    }

    UpdatePassOptions.$inject = ['$scope', 'managePassOptionsService', 'validationService', 'logger'];

    function UpdatePassOptions($scope, managePassOptionsService, validationService, logger) {
        $scope.vm.passTypes = $scope.$parent.vm.passTypes;
        $scope.vm.submitText = 'Update';
        $scope.vm.cancelText = 'Cancel';
        var copy = {};

        $scope.vm.startUpdating = function() {
            copy = angular.copy($scope.vm.passOption);
            $scope.vm.updating = true;
        };

        $scope.vm.submit = function(form) {
            managePassOptionsService.update($scope.vm.passOption).then(function (createPassOption){
                logger.success('Pass option updated');
                $scope.vm.updating = false;
            }, function(errors) {
                validationService.applyServerSideErrors(form, errors);
            });
        };

        $scope.vm.delete = function() {
            managePassOptionsService.deletePassOption($scope.vm.passOption.id).then(function (){
                logger.success('Pass option deleted');
                $scope.$parent.vm.passOptions.remove($scope.vm.passOption);
            }, function(errors) {
                logger.error("Failed to delete pass option");
            });
        };

        $scope.vm.cancel = function() {
            $scope.vm.passOption = copy;
            $scope.vm.updating = false;
            $scope.form.$setUntouched();
        };
    }
})();
(function () {
    'use strict';

    angular
        .module('app.managePassOptions')
        .factory('managePassOptionsService', managePassOptionsService);

    managePassOptionsService.$inject = ['$q', 'logger', 'dataservice', 'dataUpdateService', 'dataCreateService', 'dataDeleteService'];

    /* @ngInject */
    function managePassOptionsService($q, logger, dataservice, dataUpdateService, dataCreateService, dataDeleteService){

        var service = {
            create: create,
            update: update,
            deletePassOption: deletePassOption,
            getPassOptions: getPassOptions
        };

        function create(passOption) {
            return $q(function (resolve, revoke) {
                dataCreateService.createPassOption(passOption).then(function (createdPassOption) {
                    resolve(createdPassOption);
                }, function(response) {
                    if (response.validation_result !== undefined){
                        revoke(response.validation_result.validation_errors);
                    } else {
                        revoke();
                    }
                });
            });
        }

        function update(passOption) {
            return $q(function (resolve, revoke) {
                dataUpdateService.updatePassOption(passOption).then(function (updatedPassOption) {
                    resolve(updatedPassOption);
                }, function(response) {
                    if (response.validation_result !== undefined){
                        revoke(response.validation_result.validation_errors);
                    } else {
                        revoke();
                    }
                });
            });
        }

        function deletePassOption(id) {
            return $q(function (resolve, revoke) {
                dataDeleteService.deletePassOption(id).then(resolve, revoke);
            });
        }

        function getPassOptions() {
            return $q(function (resolve, revoke) {
                dataservice.getAllPassOptions().then(function (passOptions) {
                    resolve(passOptions);
                }, revoke);
            });
        }

        return service;

    }
})();
(function () {
    'use strict';

    angular
        .module('app.manageStudents')
        .controller('ManageStudents', ManageStudents);

    ManageStudents.$inject = ['$q', 'logger', 'manageStudentsService'];

    /* @ngInject */
    function ManageStudents($q, logger, manageStudentsService) {
        /*jshint validthis: true */
        var vm = this;
        vm.students = [];

        vm.remove = function(id) {
            manageStudentsService.deleteStudent(id).then(function (){
                var studentRemoved = vm.students.filter(function (student) {
                    return student.id === id;
                })[0];
                logger.success(studentRemoved.full_name + ' has been removed as a student');
                vm.students.remove(studentRemoved);
            }, function() {
                logger.error('Failed removing the student');
            });
        };

        activate();

        function activate() {
            var promises = [getStudents()];
            return $q.all(promises)
            .then(function(){
                logger.info('Activated Manage Students');
            });
        }

        function getStudents() {
            $q(function (resolve) {
                manageStudentsService.getStudents().then(function(students) {
                    vm.students = students;
                    resolve();
                }, function() {
                    logger.error('Failed getting students');
                });
            });
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('app.manageStudents')
        .factory('manageStudentsService', manageStudentsService);

    manageStudentsService.$inject = ['$q', 'logger', 'dataservice', 'dataCreateService', 'dataDeleteService'];

    /* @ngInject */
    function manageStudentsService($q, logger, dataservice, dataCreateService, dataDeleteService){

        var service = {
            deleteStudent: deleteStudent,
            getStudents: getStudents
        };

        function deleteStudent(id) {
            return $q(function (resolve, revoke) {
                dataDeleteService.deleteUser(id).then(resolve, revoke);
            });
        }

        function getStudents() {
            return $q(function (resolve, revoke) {
                dataservice.getAllUsers().then(function (students) {
                    resolve(students);
                }, revoke);
            });
        }

        return service;

    }
})();
(function () {
    'use strict';

    angular
        .module('app.manageTeachers')
        .controller('ManageTeachers', ManageTeachers);

    ManageTeachers.$inject = ['$q', 'logger', 'manageTeachersService'];

    /* @ngInject */
    function ManageTeachers($q, logger, manageTeachersService) {
        /*jshint validthis: true */
        var vm = this;
        vm.teachers = [];

        vm.addTeacher = function() {
            manageTeachersService.addTeacher(vm.selectedUser.id).then(function (newTeacher){
                logger.success(newTeacher.full_name + ' is now a teacher!');
                vm.teachers.push(newTeacher);
                vm.selectedUser = '';
            }, function() {
                logger.error('Failed adding the new teacher');
            });
        };

        vm.remove = function(id) {
            manageTeachersService.deleteTeacher(id).then(function (){
                var teacherRemoved = vm.teachers.filter(function (teacher) {
                    return teacher.id === id;
                })[0];
                logger.success(teacherRemoved.full_name + ' has been removed as a teacher');
                vm.teachers.remove(teacherRemoved);
            }, function() {
                logger.error('Failed removing the teacher');
            });
        };

        activate();

        function activate() {
            var promises = [getTeachers()];
            return $q.all(promises)
            .then(function(){
                logger.info('Activated Manage Teachers');
            });
        }

        function getTeachers() {
            $q(function (resolve) {
                manageTeachersService.getTeachers().then(function(teachers) {
                    vm.teachers = teachers;
                    resolve();
                }, function() {
                    logger.error('Failed getting teachers');
                });
            });
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('app.manageTeachers')
        .factory('manageTeachersService', manageTeachersService);

    manageTeachersService.$inject = ['$q', 'logger', 'dataservice', 'dataCreateService', 'dataDeleteService'];

    /* @ngInject */
    function manageTeachersService($q, logger, dataservice, dataCreateService, dataDeleteService){

        var service = {
            addTeacher: addTeacher,
            deleteTeacher: deleteTeacher,
            getTeachers: getTeachers
        };

        function addTeacher(id) {
            return $q(function (resolve, revoke) {
                dataCreateService.createTeacher(id).then(function (createdTeacher) {
                    resolve(createdTeacher);
                }, function(response) {
                    if (response.validation_result !== undefined){
                        revoke(response.validation_result.validation_errors);
                    } else {
                        revoke();
                    }
                });
            });
        }

        function deleteTeacher(id) {
            return $q(function (resolve, revoke) {
                dataDeleteService.deleteTeacher(id).then(resolve, revoke);
            });
        }

        function getTeachers() {
            return $q(function (resolve, revoke) {
                dataservice.getAllTeachers().then(function (teachers) {
                    resolve(teachers);
                }, revoke);
            });
        }

        return service;

    }
})();
(function () {
    'use strict';

    angular
        .module('app.manageUser')
        .controller('ManageUser', ManageUser);

    ManageUser.$inject = ['$q', 'manageUserService', 'logger', 'validationService'];

    /* @ngInject */
    function ManageUser($q, manageUserService, logger, validationService) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Update Details';
        vm.user = {};
        vm.registrationSuccessful = false;

        vm.updateUser = function(form) {
            manageUserService.updateUser(vm.user).then(function () {
                logger.success('Your details have been updated');
            }, function (validation_errors) {
                validationService.applyServerSideErrors(form, validation_errors);
                logger.warning("Your details have not been updated");

            });
        };

        activate();

        function activate() {
            var promises = [getUser()];
            return $q.all(promises)
            .then(function(){
                logger.info('Activated Manage User');
            });
        }

        function getUser() {
            manageUserService.getUser().then(function (user) {
                vm.user = user;
            });
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('app.manageUser')
        .factory('manageUserService', manageUserService);

    manageUserService.$inject = ['$q', 'logger', 'dataservice', 'dataUpdateService', 'authService'];

    /* @ngInject */
    function manageUserService($q, logger, dataservice, dataUpdateService, authService){

        var service = {
            getUser: getUser,
            updateUser: updateUser
        };

        function getUser() {
            return $q(function (resolve, revoke) {
                dataservice.getCurrentUser().then(function (user) {
                    resolve(user);
                }, function (response) {
                    if (response.validation_result !== undefined){
                        revoke(response.validation_result.validation_errors);
                    } else {
                        revoke();
                    }
                });
            });
        }

        function updateUser(user) {
            return $q(function (resolve, revoke) {
                dataUpdateService.updateUser(user).then(function () {
                    authService.login(user.email, user.password).then(function() {
                        resolve(user);
                    });
                }, function (response) {
                    if (response.validation_result !== undefined){
                        revoke(response.validation_result.validation_errors);
                    } else {
                        revoke();
                    }
                });
            });
        }

        return service;

    }
})();
(function () {
    'use strict';

    angular
        .module('app.register')
        .controller('RegisterUser', RegisterUser);

    RegisterUser.$inject = ['registerUserService', 'logger', 'validationService'];

    /* @ngInject */
    function RegisterUser(registerUserService, logger, validationService) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Register Account';
        vm.newUser = {};
        vm.registrationSuccessful = false;

        vm.registerNewUser = function(form) {
            registerUserService.register(vm.newUser).then(function () {
                vm.registrationSuccessful = true;
            }, function (validation_errors) {
                validationService.applyServerSideErrors(form, validation_errors);
                logger.warning("Register failed");

            });
        };

        activate();

        function activate() {
            logger.info('Activated Register User View');
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('registerUserService', registerUserService);

    registerUserService.$inject = ['$q', 'logger', 'dataCreateService', 'authService'];

    /* @ngInject */
    function registerUserService($q, logger, dataCreateService, authService){

        var service = {
            register: register
        };

        function register(user, ignoreLogin) {
            return $q(function (resolve, revoke) {
                dataCreateService.createUser(user).then(function (createdUser) {
                    resolve(createdUser);
                }, function (response) {
                    if (response.validation_result !== undefined){
                        revoke(response.validation_result.validation_errors);
                    } else {
                        revoke();
                    }
                });
            });
        }

        return service;

    }
})();
(function () {
    'use strict';

    angular
        .module('app.reportProfit')
        .controller('ReportProfit', ReportProfit);

    ReportProfit.$inject = ['$q', 'reportProfitService', 'logger', 'validationService'];

    /* @ngInject */
    function ReportProfit($q, reportProfitService, logger, validationService) {
        /*jshint validthis: true */
        var vm = this;
        vm.starting = moment().subtract(1, 'month').startOf('day').format('YYYY-MM-DD');
        vm.ending = moment().endOf('day').add(2, 'month').format('YYYY-MM-DD');

        vm.updateDateRanage = function() {
            reportProfitService.getProfitReport(vm.starting, vm.ending).then(function (profitReport) {
                vm.profitReport = profitReport;
            }, function () {
                logger.error('Issue getting profit report');
            });
        };

        activate();

        function activate() {
            var promises = [vm.updateDateRanage()];
            return $q.all(promises)
            .then(function(){
                logger.info('Activated Profit Report');
            });
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('app.reportProfit')
        .factory('reportProfitService', reportProfitService);

    reportProfitService.$inject = ['$q', 'dataservice'];

    /* @ngInject */
    function reportProfitService($q, dataservice){

        var service = {
            getProfitReport: getProfitReport
        };

        function getProfitReport(starting, ending) {
            return $q(function (resolve, revoke) {
                dataservice.getProfitReport(starting, ending).then(function (profitReport) {
                    resolve(profitReport);
                }, revoke);
            });
        }

        return service;

    }
})();
(function () {
    'use strict';

    angular
        .module('app.reportTeacherHours')
        .controller('ReportTeacherHours', ReportTeacherHours);

    ReportTeacherHours.$inject = ['$q', 'reportTeacherHoursService', 'logger', 'validationService'];

    /* @ngInject */
    function ReportTeacherHours($q, reportTeacherHoursService, logger, validationService) {
        /*jshint validthis: true */
        var vm = this;
        vm.teacherHours = [];
        vm.starting = moment().subtract(1, 'month').startOf('day').format('YYYY-MM-DD');
        vm.ending = moment().endOf('day').format('YYYY-MM-DD');

        vm.getHours = function() {
            reportTeacherHoursService.getTeacherHours(vm.starting, vm.ending).then(function (teacherHours) {
                vm.teacherHours = teacherHours;
            });
        };

        activate();

        function activate() {
            var promises = [vm.getHours()];
            return $q.all(promises)
            .then(function(){
                logger.info('Activated Teacher Hours Report');
            });
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('app.reportTeacherHours')
        .factory('reportTeacherHoursService', reportTeacherHoursService);

    reportTeacherHoursService.$inject = ['$q', 'logger', 'dataservice', 'dataUpdateService', 'authService'];

    /* @ngInject */
    function reportTeacherHoursService($q, logger, dataservice, dataUpdateService, authService){

        var service = {
            getTeacherHours: getTeacherHours
        };

        function getTeacherHours(starting, ending) {
            return $q(function (resolve, revoke) {
                var search = [
                    {
                        field: 'startTime',
                        condition: 'gt',
                        value: starting
                    },
                    {
                        field: 'endTime',
                        condition: 'lt',
                        value: ending
                    },
                ];
                dataservice.searchForClasses(search).then(function (response) {
                    var teacherHours = [];

                    response.data.forEach(function(theClass) {
                        theClass.teachers.forEach(function(teacher) {
                            var matchingTeacher = teacherHours.getFirstOrDefault('id', teacher.id);
                            if (!matchingTeacher) {
                                matchingTeacher = {
                                    id: teacher.id,
                                    full_name: teacher.full_name,
                                    soloClasses: [],
                                    partnerClasses: []
                                };
                                teacherHours.push(matchingTeacher);
                            }

                            if (theClass.teachers.length === 1) {
                                matchingTeacher.soloClasses.push(theClass);
                            } else {
                                matchingTeacher.partnerClasses.push(theClass);
                            }
                        });
                    });

                    resolve(teacherHours);
                }, revoke);
            });
        }

        return service;

    }
})();
(function () {
    'use strict';

    angular
        .module('app.resetPassword')
        .controller('ResetPassword', ResetPassword);

    ResetPassword.$inject = ['$routeParams', 'logger', 'dataUpdateService', 'validationService'];

    /* @ngInject */
    function ResetPassword($routeParams, logger, dataUpdateService, validationService) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Reset Password';
        vm.isSubmitted = false;
        vm.loginUrl = '#/login';

        vm.submit = function(form){
            dataUpdateService.resetPassword($routeParams.id, vm.password).then(function() {
                vm.isSubmitted = true;
            }, function (validation_errors) {
                validationService.applyServerSideErrors(form, validation_errors);
                logger.warning("Password Reset failed");
            });
        };

        activate();

        function activate() {
            logger.info('Activated Reset Password View');
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('app.userActivation')
        .controller('UserActivation', UserActivation);

    UserActivation.$inject = ['userActivationService', 'logger', 'routehelper', 'validationService'];

    /* @ngInject */
    function UserActivation(userActivationService, logger, routehelper, validationService) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'User Activation';
        vm.loginUrl = '#/login';
        vm.loaded = false;

        activate();

        function activate() {
            logger.info('Activated User Activation View');
            userActivationService.activate().then(function () {
                vm.activationSuccessful = true;
                vm.loaded = true;
            }, function (validation_errors) {
                logger.warning("Activation Failed");
                vm.activationSuccessful = false;
                vm.loaded = true;
            });
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('app.userActivation')
        .factory('userActivationService', userActivationService);

    userActivationService.$inject = ['$q', '$routeParams', 'dataUpdateService', 'authService'];

    /* @ngInject */
    function userActivationService($q, $routeParams, dataUpdateService){

        var service = {
            activate: activate
        };

        function activate() {
            return $q(function (resolve, revoke) {
                dataUpdateService.activateUser($routeParams.key).then(resolve, revoke);
            });
        }

        return service;

    }
})();
(function () {
    'use strict';

    angular
        .module('app.widgets')
        .directive('ccSidebar', ccSidebar);

    /* @ngInject */
    function ccSidebar () {
        // Opens and closes the sidebar menu.
        // Usage:
        //  <div data-cc-sidebar>
        // Creates:
        //  <div data-cc-sidebar class="sidebar">
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            var $sidebarInner = element.find('.sidebar-inner');
            var $dropdownElement = element.find('.sidebar-dropdown a');
            element.addClass('sidebar');
            $dropdownElement.click(dropdown);

            function dropdown(e) {
                var dropClass = 'dropy';
                e.preventDefault();
                if (!$dropdownElement.hasClass(dropClass)) {
                    hideAllSidebars();
                    $sidebarInner.slideDown(350);
                    $dropdownElement.addClass(dropClass);
                } else if ($dropdownElement.hasClass(dropClass)) {
                    $dropdownElement.removeClass(dropClass);
                    $sidebarInner.slideUp(350);
                }

                function hideAllSidebars() {
                    $sidebarInner.slideUp(350);
                    $('.sidebar-dropdown a').removeClass(dropClass);
                }
            }
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('app.apiCaller')
        .factory('apiCaller', apiCaller);

    apiCaller.$inject = ['$http', 'config'];

    /* @ngInject */
    function apiCaller($http, config) {
        var service = {

            postUserActivation: postUserActivation,
            postUserPasswordReset: postUserPasswordReset,
            putUserPasswordReset: putUserPasswordReset,

            postUser : postUser,
            putCurrentUser: putCurrentUser,
            getUser: getUser,
            getUsers: getUsers,
            searchUser: searchUser,
            getCurrentUser: getCurrentUser,
            deleteUser: deleteUser,

            getCurrentUserSchedule: getCurrentUserSchedule,
            getUserCurrentPasses: getUserCurrentPasses,
            getUserEnroledBlocks: getUserEnroledBlocks,
            getCurrentUserClaims: getCurrentUserClaims,

            postPassAssignment: postPassAssignment,
            postCurrentUserPassAssignment: postCurrentUserPassAssignment,

            getBlock : getBlock,
            searchBlock: searchBlock,
            postBlockEnrolment: postBlockEnrolment,

            searchReferenceData: searchReferenceData,

            getClassRegisteredStudents: getClassRegisteredStudents,
            getClassAttendance: getClassAttendance,
            postClassAttendance: postClassAttendance,
            deleteClassAttendance: deleteClassAttendance,

            putPass: putPass,

            postPassOption: postPassOption,
            getPassOption: getPassOption,
            deletePassOption: deletePassOption,
            putPassOption: putPassOption,

            postLevel: postLevel,
            putLevel: putLevel,
            getLevel: getLevel,
            deleteLevel: deleteLevel,

            postBlock: postBlock,
            putBlock: putBlock,
            deleteBlock: deleteBlock,

            getClass: getClass,
            searchClass: searchClass,
            putClass: putClass,
            deleteClass: deleteClass,

            postTeacher: postTeacher,
            getTeacher: getTeacher,
            deleteTeacher: deleteTeacher,

            getProfitReport: getProfitReport
        };
        var baseUrl = 'https://' + config.apiUrl + '/api/';

        return service;

        function postUserActivation(key) {
            var url = baseUrl + 'users/activation/' + key;
            return $http.post(url);
        }

        function postUserPasswordReset(email) {
            var url = baseUrl + 'users/password/reset';
            return $http.post(url, {email: email});
        }

        function putUserPasswordReset(key, password) {
            var url = baseUrl + 'users/password/reset/' + key;
            return $http.put(url, {password: password});
        }

        function postUser(user) {
            var url = baseUrl + 'users';
            return $http.post(url, user);
        }

        function putCurrentUser(user) {
            var url = baseUrl + 'users/current';
            return $http.put(url, user);
        }

        function getUser(userId) {
            var url = baseUrl + 'users/' + userId;
            return $http.get(url);
        }

        function getUsers() {
            var url = baseUrl + 'users';
            return $http.get(url);
        }

        function searchUser(search) {
            var url = baseUrl + 'users?q=' + search;

            return $http.get(url);
        }

        function getCurrentUser() {
            var url = baseUrl + 'users/current';
            return $http.get(url);
        }

        function deleteUser(userId) {
            var url = baseUrl + 'users/' + userId;
            return $http.delete(url);
        }

        function getCurrentUserSchedule() {
            var url = baseUrl + 'users/current/schedules';
            return $http.get(url);
        }

        function getUserCurrentPasses(userId) {
            var url = baseUrl + 'users/' + userId + '/passes';
            return $http.get(url);
        }

        function getUserEnroledBlocks(userId) {
            var url = baseUrl + 'users/current/blocks';
            return $http.get(url);
        }

        function getCurrentUserClaims() {
            var url = baseUrl + 'users/current/claims';
            return $http.get(url);
        }

        function postPassAssignment(userId, passOptionId, pass) {
            var url = baseUrl + 'users/' + userId + '/passtemplates/' + passOptionId;
            return $http.post(url, pass);
        }

        function postCurrentUserPassAssignment(passOptionId, pass) {
            var url = baseUrl + 'users/current/passtemplates/' + passOptionId;
            return $http.post(url, pass);
        }

        function getBlock(blockId) {
            var url = baseUrl + 'blocks';
            if (blockId !== undefined && blockId !== null) {
                url = url + '/' + blockId;
            }

            return $http.get(url);
        }

        function searchBlock(search) {
            var url = baseUrl + 'blocks?q=' + search;

            return $http.get(url);
        }
        
        function postBlockEnrolment(enrolment) {
            var url = baseUrl + 'users/' + enrolment.user_id + '/enrolment';
            return $http.post(url, enrolment);
        }

        function searchReferenceData(search) {
            var url = baseUrl + 'reference?q=' + search;

            return $http.get(url);
        }

        function getClass(id) {
            var url = baseUrl + 'classes/' + id;
            return $http.get(url);
        }

        function searchClass(search) {
            var url = baseUrl + 'classes?q=' + search;

            return $http.get(url);
        }

        function getClassRegisteredStudents(id) {
            var url = baseUrl + 'classes/' + id + '/roll';
            return $http.get(url);
        }

        function getClassAttendance(id) {
            var url = baseUrl + 'classes/' + id + '/attendance';
            return $http.get(url);
        }
        
        function postClassAttendance(classId, studentId) {
            var url = baseUrl + 'classes/' + classId + '/attendance/' + studentId;
            return $http.post(url);
        }
        
        function deleteClassAttendance(classId, studentId) {
            var url = baseUrl + 'classes/' + classId + '/attendance/' + studentId;
            return $http.delete(url);
        }
        
        function putPass(pass) {
            var url = baseUrl + 'passes/' + pass.id;
            return $http.put(url, pass);
        }

        function postPassOption(passOption) {
            var url = baseUrl + 'passtemplate';
            return $http.post(url, passOption);
        }

        function getPassOption() {
            var url = baseUrl + 'passtemplate';
            return $http.get(url);
        }

        function deletePassOption(id) {
            var url = baseUrl + 'passtemplate/' + id;
            return $http.delete(url);
        }

        function putPassOption(passOption) {
            var url = baseUrl + 'passtemplate/' + passOption.id;
            return $http.put(url, passOption);
        }

        function postLevel(level) {
            var url = baseUrl + 'levels';
            return $http.post(url, level);
        }

        function putLevel(level) {
            var url = baseUrl + 'levels/' + level.id;
            return $http.put(url, level);
        }

        function getLevel() {
            var url = baseUrl + 'levels';
            return $http.get(url);
        }

        function deleteLevel(id) {
            var url = baseUrl + 'levels/' + id;
            return $http.delete(url);
        }

        function postBlock(levelId) {
            var url = baseUrl + 'levels/' + levelId + '/blocks';
            return $http.post(url);
        }

        function putBlock(block) {
            var url = baseUrl + 'blocks/' + block.id;
            return $http.put(url, block);
        }

        function deleteBlock(id) {
            var url = baseUrl + 'blocks/' + id;
            return $http.delete(url);
        }

        function putClass(theClass) {
            var url = baseUrl + 'classes/' + theClass.id;
            return $http.put(url, theClass);
        }

        function deleteClass(id) {
            var url = baseUrl + 'classes/' + id;
            return $http.delete(url);
        }

        function postTeacher(userId) {
            var url = baseUrl + 'teachers/' + userId;
            return $http.post(url);
        }

        function getTeacher() {
            var url = baseUrl + 'teachers';
            return $http.get(url);
        }

        function deleteTeacher(userId) {
            var url = baseUrl + 'teachers/' + userId;
            return $http.delete(url);
        }

        function getProfitReport(starting, ending) {
            var url = baseUrl + 'report/profit?from=' + starting + '&to=' + ending;
            return $http.get(url);
        }
    }
})();

// Include in index.html so that app level exceptions are handled.
// Exclude from testRunner.html which should run exactly what it wants to run
(function () {
    'use strict';

    angular
        .module('blocks.exception')
        .provider('exceptionConfig', exceptionConfigProvider)
        .config(exceptionConfig);

    // Must configure the service and set its
    // events via the exceptionConfigProvider
    function exceptionConfigProvider() {
        /* jshint validthis:true */
        this.config = {
            // These are the properties we need to set
            //appErrorPrefix: ''
        };

        this.$get = function () {
            return {
                config: this.config
            };
        };
    }

    exceptionConfig.$inject = ['$provide'];

    // Configure by setting an optional string value for appErrorPrefix.
    // Accessible via config.appErrorPrefix (via config value).
    function exceptionConfig($provide) {
        $provide.decorator('$exceptionHandler', extendExceptionHandler);
    }

    extendExceptionHandler.$inject = ['$delegate', 'exceptionConfig', 'logger'];

    // Extend the $exceptionHandler service to also display a toast.
    function extendExceptionHandler($delegate, exceptionConfig, logger) {
        var appErrorPrefix = exceptionConfig.config.appErrorPrefix || '';
        return function (exception, cause) {
            $delegate(exception, cause);
            var errorData = { exception: exception, cause: cause };
            var msg = appErrorPrefix + exception.message;
            /**
             * Could add the error to a service's collection,
             * add errors to $rootScope, log errors to remote web server,
             * or log locally. Or throw hard. It is entirely up to you.
             * throw exception;
             *
             * @example
             *     throw { message: 'error message we added' };
             *
             */
            logger.error(msg, errorData);
        };
    }

})();
(function () {
    'use strict';

    angular
        .module('blocks.exception')
        .factory('exception', exception);

    /* @ngInject */
    function exception(logger) {
        var service = {
            catcher: catcher
        };
        return service;

        function catcher(message) {
            return function (reason) {
                logger.error(message, reason);
            };
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('blocks.logger')
        .factory('logger', logger);

    logger.$inject = ['$log', 'toastr'];

    function logger($log, toastr) {
        var service = {
            showToasts: true,

            error   : error,
            info    : info,
            success : success,
            warning : warning,

            // straight to console; bypass toastr
            log     : $log.log
        };

        return service;
        /////////////////////

        function error(message, data, title) {
            toastr.error(message, title);
            $log.error('Error: ' + message, data);
        }

        function info(message, data, title) {
            toastr.info(message, title);
            $log.info('Info: ' + message, data);
        }

        function success(message, data, title) {
            toastr.success(message, title);
            $log.info('Success: ' + message, data);
        }

        function warning(message, data, title) {
            toastr.warning(message, title);
            $log.warn('Warning: ' + message, data);
        }
    }
}());
(function () {
    'use strict';

    angular
        .module('blocks.router')
        .provider('routehelperConfig', routehelperConfig)
        .factory('routehelper', routehelper);

    routehelper.$inject = ['$location', '$rootScope', '$route', 'logger', 'routehelperConfig', 'authService'];

    // Must configure via the routehelperConfigProvider
    function routehelperConfig () {
        /* jshint validthis:true */
        this.config = {
            // These are the properties we need to set
            // $routeProvider: undefined
            // docTitle: ''
            // resolveAlways: {ready: function(){ } }
        };

        this.$get = function () {
            return {
                config: this.config
            };
        };
    }

    function routehelper($location, $rootScope, $route, logger, routehelperConfig, authService) {
        var handlingRouteChangeError = false;
        var routeCounts = {
            errors: 0,
            changes: 0
        };
        var routes = [];
        var $routeProvider = routehelperConfig.config.$routeProvider;
        var getUserIdentity = authService.getUserIdentity;

        var service = {
            configureRoutes: configureRoutes,
            getRoutes: getRoutes,
            routeCounts: routeCounts,
            redirectToRoute: redirectToRoute,
            getRouteFromName: getRouteFromName
        };

        init(authService.getUserIdentity);

        return service;
        ///////////////

        function configureRoutes(routes){
            routes.forEach(function (route) {
                route.config.resolve =
                    angular.extend(route.config.resolve || {}, routehelperConfig.config.resolveAlways);
                $routeProvider.when(route.url, route.config);
            });
            $routeProvider.otherwise({ redirectTo: '/login' });
        }

        function handleRoutingErrors() {
            // Route cancellation:
            // On routing error, go to the dashboard.
            // Provide an exit clause if it tries to do it twice.
            $rootScope.$on('$routeChangeError',
                function (event, current, previous, rejection) {
                    if (handlingRouteChangeError) {
                        return;
                    }
                    routeCounts.errors++;
                    handlingRouteChangeError = true;
                    var destination = (current && (current.title || current.name || current.loadedTemplateUrl)) ||
                        'unknown target';
                    var msg = 'Error routing to ' + destination + '. ' + (rejection.msg || '');
                    logger.warning(msg, [current]);
                    $location.path('/');
                }
            );
        }

        function handleRoutingAuthorisation(getUserIdentity) {
            $rootScope.$on('$routeChangeStart',
                function (event, current, previous, rejection) {
                    if (current.$$route === undefined) {
                        logger.warning('Page not found');
                        redirectToRoute(getDefaultRoute());
                    }

                    if (!isAuthorisedForRoute(current.$$route)) {
                        event.preventDefault();
                        logger.warning('Unauthorised to visit page');
                        redirectToRoute(getDefaultRoute());
                    }
                }
            );
        }

        function init(getUserIdentity) {
            handleRoutingErrors();
            handleRoutingAuthorisation(getUserIdentity);
            updateDocTitle();
        }

        function getRoutes() {
            if (routes.length < 1) {
                for (var prop in $route.routes) {
                    if ($route.routes.hasOwnProperty(prop)) {
                        var route = $route.routes[prop];
                        var isRoute = !!route.title;
                        if (isRoute) {
                            routes.push(route);
                        }
                    }
                }
            }
            return routes.filter(isAuthorisedForRoute);
        }

        function updateDocTitle() {
            $rootScope.$on('$routeChangeSuccess',
                function (event, current, previous) {
                    routeCounts.changes++;
                    handlingRouteChangeError = false;
                    var title = routehelperConfig.config.docTitle + ' ' + (current.title || '');
                    $rootScope.title = title; // data bind to <title>
                }
            );
        }

        function redirectToRoute(routeName, routeParameters){
            var routePath = getRouteFromName(routeName, routeParameters);
            if (window.location.pathname.indexOf('#') < 0) {
                window.location = '/#' + routePath;
            } else {
                $location.path(routePath);
            }
        }

        function getRouteFromName(routeName, routeParameters){
            var routes = getRoutes().filter(function(route){
                return route.title === routeName;
            });

            if (routes.length < 1){
                logger.error("Failed to find matching route", routeName, "No matching route");
                return "";
            } else {
                var route = routes[0];
                var routePath = route.originalPath;
                if (routeParameters !== undefined && routeParameters !== null) {
                    for (var prop in routeParameters) {
                        if (routeParameters.hasOwnProperty(prop)) {
                            routePath = routePath.replace(":" + prop, routeParameters[prop]);
                        }
                    }
                }

                return routePath;
            }
        }

        /*private*/
        function isAuthorisedForRoute(route) {
            if (route) {
                if (!route.allowAnonymous && !getUserIdentity().isLoggedIn){
                    return false;
                }
                if (route.denyAuthorised && getUserIdentity().isLoggedIn) {
                    return false;
                }
                if (route.claim && !authService.hasClaim(route.claim)){
                    return false;
                }
            }
            return true;
        }

        function getDefaultRoute() {
            var userIdentity = getUserIdentity();

            var defaultRoute = 'dashboard';
            if (!userIdentity.isLoggedIn) {
                defaultRoute = 'login';
            }

            return defaultRoute;
        }

        /*/private*/
    }
})();