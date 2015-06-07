angular.module("app.core").run(["$templateCache", function($templateCache) {$templateCache.put("app/adminDashboard/adminDashboard.html","<section id=dashboard-view class=mainbar><section class=matter><div class=container><div class=row><h1>Admin Dashboard</h1></div><div class=row ng-show=vm.isAdmin><a ng-href={{vm.passOptionsUrl}} class=\"btn btn-link\">Manage Pass Options</a></div><div class=row ng-show=vm.isAdmin><a ng-href={{vm.levelsUrl}} class=\"btn btn-link\">Manage Levels</a></div><div class=row ng-show=vm.isAdmin><a ng-href={{vm.blocksUrl}} class=\"btn btn-link\">Manage Blocks</a></div><div class=row><a ng-href={{vm.classesUrl}} class=\"btn btn-link\">Manage Classes</a></div><div class=row ng-show=vm.isAdmin><a ng-href={{vm.teachersUrl}} class=\"btn btn-link\">Manage Teachers</a></div><div class=row><a ng-href={{vm.studentsUrl}} class=\"btn btn-link\">Manage Students</a></div></div></section></section>");
$templateCache.put("app/adminReports/adminReports.html","<section id=reports-view class=mainbar><section class=matter><div class=container><div class=row><h1>Admin Reports</h1></div><div class=row><a ng-href={{vm.teacherClassHoursUrl}} class=\"btn btn-link\">Teacher Class Hours</a></div><div class=row><a ng-href={{vm.profitReportUrl}} class=\"btn btn-link\">Profit/Loss</a></div></div></section></section>");
$templateCache.put("app/blockEnrolment/blockEnrolment.html","<section class=mainbar><section class=matter><div class=container><div class=row><h1>Block Selection</h1><p ng-show=vm.areBlocksLoading>Loading blocks...</p><div ng-hide=vm.areBlocksLoading><p class=lead ng-show=\"vm.blocks.length > 0\">Select the blocks you want to enrol in</p><div class=row><div class=\"block-grouping clearfix row col-lg-3\" ng-repeat=\"group in vm.blockGrouping | viewableBlocks\"><div ng-include src=\"\'app/blockEnrolment/setOfBlocks.html\'\"></div></div></div><p ng-show=\"vm.blocks.length === 0\">There are no blocks available to be enrolled in</p></div></div><hr><div class=row><h1>Pass Selection</h1><p ng-show=vm.arePassesLoading>Loading passes...</p><div ng-hide=vm.arePassesLoading><div ng-show=\"vm.passOptions.length > 0\"><p class=lead>Select the pass that works for you</p><div class=radio><label><input type=radio name=passOptions data-ng-model=vm.selectedPass value> Sort out in class / Use existing pass</label></div><div class=radio data-ng-repeat=\"pass in vm.passOptions\"><label><input type=radio name=passOptions data-ng-model=$parent.vm.selectedPass ng-value=pass> {{pass.description}} - ${{pass.cost}}</label></div></div><p ng-show=\"vm.passOptions.length === 0\">There are no pass options available</p></div></div><div class=row><button class=\"btn btn-primary\" ng-disabled=!vm.isAnythingToSubmit() ng-click=vm.submit()>Enrol</button></div></div></section></section>");
$templateCache.put("app/blockEnrolment/setOfBlocks.html","<h4 class=text-center>{{group}}</h4><div class=\"col-sm-4 col-lg-12\" ng-repeat=\"block in vm.blocks | matchingBlockGrouping:group | orderBy:\'start_date\'\"><div class=block-item ng-class=vm.getClassType(block)><strong>{{block.name}}</strong><p><display-date format=time ng-model=block.start_date></display-date>-<display-date format=time ng-model=block.end_date></display-date></p><div class=form-group ng-hide=block.isEnroled><b>Enrol</b> <input ng-hide=block.isEnroled type=checkbox data-ng-model=block.enrolIn></div><div class=form-group ng-show=block.isEnroled><b>Already enrolled</b></div></div></div>");
$templateCache.put("app/classCheckIn/classCheckIn.html","<section class=mainbar><section class=matter><div class=container><div class=row><h1>{{vm.class.name}} Class Check In</h1><div class=\"panel panel-default\"><div class=panel-heading><h3 class=panel-title>Teachers</h3></div><div class=panel-body><teacher-dropdown ng-model=vm.class.teachers></teacher-dropdown><button class=\"btn btn-primary\" ng-click=vm.updateTeachers()>Update teachers</button></div></div><div class=\"panel panel-default\"><div class=panel-heading><h3 class=panel-title>Students</h3></div><div class=panel-body ng-show=vm.areRegisteredStudentsLoading><p>Loading students...</p></div><div class=panel-body ng-hide=vm.areRegisteredStudentsLoading><div ng-show=\"vm.registeredStudents.length === 0\">No students registered for this class.</div><div ng-repeat=\"student in vm.students track by $index\"><div class=form-group><input type=checkbox data-ng-model=student.attendedClass data-ng-change=vm.attendenceStatusChanged(student)> {{student.full_name}}<pass-status ng-model=student ng-click=\"student.openPassSelection = !student.openPassSelection\"></pass-status></div><div class=\"panel panel-default\" ng-show=student.openPassSelection><div class=panel-heading><h3 class=panel-title>Passes for {{student.full_name}}</h3></div><div class=panel-body><div ng-repeat=\"pass in student.passes | filter:{payment_status: \'Pending\'}\"><pass-summary ng-model=pass></pass-summary><button class=\"btn btn-primary\" ng-click=\"vm.passPaidFor(pass, student)\">Paid</button></div><div ng-repeat=\"pass in student.passes | filter:{payment_status: \'Paid\'}\"><pass-summary ng-model=pass></pass-summary></div><hr ng-show=\"student.passes.length > 0\"><h3>Pass Selection</h3><div class=radio data-ng-repeat=\"pass in vm.passOptions\"><label><input type=radio name=passOptions data-ng-model=$parent.selectedPass ng-value=pass> {{pass.description}} - ${{pass.cost}}</label></div><button ng-disabled=vm.disablePassPurchase class=\"btn btn-primary\" ng-click=\"vm.purchaseNewPass(student, selectedPass)\">Purchase</button></div></div></div></div></div><div class=\"panel panel-default\"><div class=panel-heading><h3 class=panel-title>Walk In Students</h3></div><div class=panel-body><div><input type=text placeholder=\"Student\'s Name\" ng-model=vm.walkInStudentSelected typeahead=\"student as student.full_name for student in vm.searchUsers($viewValue)\"> <button class=\"btn btn-primary\" ng-disabled=!vm.isSelectedStudentValid() ng-click=vm.addWalkIn()>Add Walk In</button> <button class=\"btn btn-primary\" ng-disabled=!vm.isSelectedStudentValid() ng-click=vm.enrolWalkIn()>Enrol In Block</button> <button class=\"btn btn-primary\" ng-disabled=vm.isSelectedStudentValid() ng-click=vm.createAccount()>Create New Account</button></div></div></div><div class=\"panel panel-default\" ng-show=vm.creatingNewAccount><div class=panel-heading><h3 class=panel-title>New Account</h3></div><div class=panel-body><div ng-include src=\"\'app/register/newUser.html\'\"></div></div></div></div></div></section></section>");
$templateCache.put("app/dashboard/dashboard.html","<section id=dashboard-view class=mainbar><section class=matter><div class=container><div class=row><h1>Welcome to {{vm.companyName}}!</h1></div><div class=row><div class=col-md-6><div class=\"panel panel-default\"><div class=panel-heading><h3 class=panel-title>Upcoming Schedule</h3></div><div class=panel-body ng-show=vm.isScheduleLoading><p>Loading schedule...</p></div><div class=panel-body ng-hide=vm.isScheduleLoading><div ng-show=\"vm.upcomingSchedule.length === 0\">Nothing scheduled for this week.</div><div ng-show=\"vm.upcomingSchedule.length > 0\" ng-repeat=\"event in vm.upcomingSchedule\">{{event.name}} |<display-date format=\"time and day\" ng-model=event.start_time></display-date></div></div></div></div><div class=col-md-6><div class=\"panel panel-default\"><div class=panel-heading><h3 class=panel-title>Current Passes</h3></div><div class=panel-body ng-show=vm.arePassesLoading><p>Loading passes...</p></div><div class=panel-body ng-hide=vm.arePassesLoading><div ng-show=\"vm.currentPasses.length === 0\">You currently have no valid passes</div><div ng-show=\"vm.currentPasses.length > 0\" ng-repeat=\"pass in vm.currentPasses\"><span ng-if=\"pass.pass_type === \'Clip\'\">You have a clip pass with {{pass.clips_remaining}} clips remaining, which must be used by<display-date format=\"short date\" ng-model=pass.end_date></display-date></span> <span ng-if=\"pass.pass_type === \'Unlimited\'\">You have unlimited pass which expires<display-date format=\"short date\" ng-model=pass.end_date></display-date></span></div></div></div></div></div><div class=row><div class=col-md-6><div class=\"panel panel-default\" ng-show=vm.canPerformClassCheckIn><div class=panel-heading><h3 class=panel-title>Class Check In</h3></div><div class=panel-body ng-show=vm.areClassesLoading><p>Loading today\'s classes...</p></div><div class=panel-body ng-hide=vm.areClassesLoading><div ng-show=\"vm.todaysClasses.length === 0\">No classes today.</div><div ng-show=\"vm.todaysClasses.length > 0\" ng-repeat=\"class in vm.todaysClasses\"><a data-ng-href=#/class/{{class.id}}/check-in>{{class.name}} -<display-date format=time ng-model=class.start_time></display-date></a></div></div></div></div></div></div></section></section>");
$templateCache.put("app/forgottenPassword/forgottenPassword.html","<section class=push-down-64><section class=matter><div class=container><div class=row><div class=\"col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4 well\"><h3 class=text-center>Forgotten Password<form name=forgottenPasswordForm novalidate ng-hide=vm.isSubmitted><div class=row><div class=\"form-group col-xs-12\" ng-class=\"{\'has-error\':forgottenPasswordForm.email.$invalid && forgottenPasswordForm.email.$touched}\"><input class=form-control id=email name=email type=text placeholder=Email ng-model=vm.email required></div><div class=\"form-group col-xs-12\"><button class=\"btn btn-primary pull-right\" ng-click=vm.submit(forgottenPasswordForm) ng-disabled=forgottenPasswordForm.$invalid>Email Me</button></div></div></form><div ng-show=vm.isSubmitted>Great, you can expect an email from us shortly</div></h3></div></div></div></section></section>");
$templateCache.put("app/layout/shell.html","<div data-ng-controller=\"Shell as vm\"><div id=splash-page data-ng-show=vm.showSplash class=dissolve-animation><div class=page-splash><div class=page-splash-message>{{vm.title}}</div></div></div><div><header class=clearfix><div data-ng-include=\"\'app/layout/topnav.html\'\"></div></header><section id=content class=content><div data-ng-if=vm.getUserIdentity().isLoggedIn data-ng-include=\"\'app/layout/sidebar.html\'\"></div><div data-ng-view autoscroll=true class=shuffle-animation></div></section></div></div>");
$templateCache.put("app/layout/sidebar.html","<div data-cc-sidebar data-ng-controller=\"Sidebar as vm\"><div class=sidebar-filler></div><div class=sidebar-dropdown><a href=#>Menu</a></div><div class=sidebar-inner><div class=sidebar-widget></div><ul class=navi><li class=\"nlightblue fade-selection-animation\" data-ng-class=vm.isCurrent(r) data-ng-repeat=\"r in vm.navRoutes\"><a href=#{{r.originalPath}} data-ng-bind-html=r.settings.content></a></li></ul></div></div>");
$templateCache.put("app/layout/topnav.html","<nav class=\"navbar navbar-fixed-top navbar-inverse\"><div class=navbar-header><a href=\"/#/\" class=navbar-brand><span class=brand-title>{{vm.title}}</span></a> <a class=\"btn navbar-btn navbar-toggle\" data-toggle=collapse data-target=.navbar-collapse><span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></a></div><div class=\"navbar-collapse collapse\"><div class=\"pull-right navbar-logo\"><ul class=\"nav navbar-nav pull-right\" ng-hide=vm.getUserIdentity().isLoggedIn><li><a data-ng-href={{vm.loginUrl}}>Login</a></li><li><a data-ng-href={{vm.registerUrl}}>Create Account</a></li></ul><ul class=\"nav navbar-nav pull-right\" ng-show=vm.getUserIdentity().isLoggedIn><li><a data-ng-href={{vm.manageUserUrl}}>Hello, {{vm.getUserIdentity().name}}</a></li><li><a data-ng-click=vm.logout()>Logout</a></li></ul></div></div></nav>");
$templateCache.put("app/login/login.html","<section class=push-down-64><section class=matter><div class=container><div class=row><div class=\"col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4 well\"><h3 class=text-center>Welcome to {{vm.company}}<form name=loginForm novalidate><div class=row><div class=\"has-error col-xs-12\"><span class=\"help-block has-error\" ng-repeat=\"error in loginForm.serverErrors\"><div>{{error}}</div></span></div><div class=\"form-group col-xs-12\" ng-class=\"{\'has-error\':loginForm.email.$invalid && loginForm.email.$touched}\"><input class=form-control id=email name=email type=text placeholder=Email ng-model=vm.email required></div><div class=\"form-group col-xs-12\" ng-class=\"{\'has-error\':loginForm.password.$invalid && loginForm.password.$touched}\"><input class=form-control type=password id=password name=password placeholder=Password ng-model=vm.password required><validation-error ng-model=loginForm.password error=required message=\"Password is required.\"></validation-error></div><div class=\"col-xs-12 text-right form-group\" style=\"margin-top: -15px;\"><a class=\"btn btn-link\" ng-href={{vm.forgottenPasswordUrl}}>Forgot your password?</a></div><div class=\"form-group col-xs-12\"><a class=\"btn btn-primary pull-left\" ng-click=vm.submit(loginForm) href={{vm.registerUrl}}>Create Account</a> <button class=\"btn btn-success pull-right\" ng-click=vm.submit(loginForm) ng-disabled=loginForm.$invalid>Login</button></div></div></form></h3></div></div></div></section></section>");
$templateCache.put("app/manageBlocks/manageBlocks.html","<section class=mainbar><section class=matter><div class=container><div class=row><h1>Manage Blocks</h1><table class=\"table table-hover\"><thead><th>Name</th><th>Starting</th><th></th></thead><tbody ng-repeat=\"block in vm.blocks\" ng-controller=\"ManageBlock as vm\" ng-init=\"vm.block = block\"><tr><td>{{vm.block.name}}</td><td><display-date format=\"short date\" ng-model=vm.block.start_date></display-date></td><td ng-hide=vm.updating><a ng-click=vm.startUpdating() class=\"btn btn-link\">Manage</a> <a ng-click=vm.delete() class=\"btn link\">Delete</a></td></tr><tr ng-show=vm.updating><td colspan=3><form novalidate name=form><div ng-include src=\"\'block.html\'\"></div></form></td></tr></tbody></table></div></div></section></section><script type=text/ng-template id=block.html><common-input ng-model=\"vm.block.name\" name=\"name\" display-name=\"Name\" type=\"text\" required=\"true\"></common-input> <common-date-time-input ng-model=\"vm.block.start_date\" name=\"start_date\" display-name=\"Start Date\" required=\"true\"></common-date-time-input> <common-date-time-input ng-model=\"vm.block.end_date\" name=\"end_date\" display-name=\"End Date\" required=\"true\"></common-date-time-input> <teacher-dropdown ng-model=\"vm.block.teachers\"></teacher-dropdown> <a class=\"btn btn-default\"ng-click=\"vm.cancel(form)\">{{vm.cancelText}}</a> <a class=\"btn btn-default pull-right\" ng-disabled=\"form.$invalid\" ng-click=\"vm.submit(form)\">{{vm.submitText}}</a> </div></script>");
$templateCache.put("app/manageClasses/manageClasses.html","<section class=mainbar><section class=matter><div class=container><div class=row><h1>Manage Classes</h1><div ng-form=filterForm><h3>Filter</h3><div><common-input ng-model=vm.filter.name.value name=filter_name display-name=Name type=text></common-input><common-input ng-model=vm.filter.startTimeAfter.value name=filter_after display-name=After type=date></common-input><common-input ng-model=vm.filter.startTimeBefore.value name=filter_before display-name=Before type=date></common-input></div><div>Showing: {{vm.classes.length}} classes</div><div><a class=\"btn btn-primary\" ng-click=vm.filterClasses()>Filter</a></div></div><table class=\"table table-hover\"><thead><th>Name</th><th>Starting</th><th></th></thead><tbody ng-repeat=\"class in vm.classes\" ng-controller=\"ManageClass as vm\" ng-init=\"vm.class = class\"><tr><td>{{vm.class.name}}</td><td><display-date format=\"short date\" ng-model=vm.class.start_time></display-date></td><td><div ng-hide=vm.updating><a ng-show=vm.isAdmin ng-click=vm.startUpdating() class=\"btn btn-default\">Manage</a> <a ng-show=vm.isAdmin ng-click=vm.delete() class=\"btn btn-link\">Delete</a> <a ng-href={{vm.classCheckInUrl(vm.class)}} class=\"btn btn-link\">Class Check In</a></div></td></tr><tr ng-if=vm.updating><td colspan=3><form novalidate name=form><div ng-include src=\"\'class.html\'\"></div></form></td></tr></tbody></table></div></div></section></section><script type=text/ng-template id=class.html><common-input ng-model=\"vm.class.name\" name=\"name\" display-name=\"Name\" type=\"text\" required=\"true\"></common-input> <common-date-time-input ng-model=\"vm.class.start_time\" name=\"start_time\" display-name=\"Start Time\" required=\"true\"></common-date-time-input> <common-date-time-input ng-model=\"vm.class.end_time\" name=\"end_time\" display-name=\"End Time\" required=\"true\"></common-date-time-input> <teacher-dropdown ng-model=\"vm.class.teachers\"></teacher-dropdown> <a class=\"btn btn-default\" ng-click=\"vm.cancel(form)\">{{vm.cancelText}}</a> <a class=\"btn btn-default pull-right\" ng-disabled=\"form.$invalid\" ng-click=\"vm.submit(form)\">{{vm.submitText}}</a></script>");
$templateCache.put("app/manageLevels/manageLevels.html","<section class=mainbar><section class=matter><div class=container><div class=row><h1>Manage Levels <a ng-click=vm.generateForAllLevels() class=\"btn btn-default\">Generate Blocks For All</a></h1><table class=\"table table-hover\"><thead><th>Name</th><th></th></thead><tbody ng-repeat=\"level in vm.levels\" ng-controller=\"ManageLevel as vm\" ng-init=\"vm.level = level\"><tr><td>{{vm.level.name}}</td><td><div ng-hide=vm.updating><a ng-click=vm.startUpdating() class=\"btn btn-link\">Manage</a> <a ng-click=vm.generateBlock() class=\"btn btn-link\">Generate Block</a> <a ng-click=vm.delete() class=\"btn btn-link\">Delete</a></div></td></tr><tr ng-show=vm.updating><td colspan=2><form novalidate name=form><div ng-include src=\"\'level.html\'\"></div></form></td></tr></tbody></table></div><div ng-controller=NewLevel class=row><form ng-show=vm.addingNew novalidate name=form><div ng-include src=\"\'level.html\'\"></div></form><a class=\"btn btn-default\" ng-hide=vm.addingNew ng-click=\"vm.addingNew = true;\">Add New Level</a></div></div></section></section><script type=text/ng-template id=level.html><common-input ng-model=\"vm.level.name\" name=\"name\" display-name=\"Name\" type=\"text\" required=\"true\"></common-input> <common-date-time-input ng-model=\"vm.level.start_time\" name=\"start_time\" display-name=\"Start Time\" type=\"date\" required=\"true\"></common-date-time-input> <common-date-time-input ng-model=\"vm.level.end_time\" name=\"end_time\" display-name=\"End Time\" type=\"datetime-local\" required=\"true\"></common-date-time-input> <common-input ng-model=\"vm.level.classes_in_block\" name=\"classes_in_block\" display-name=\"Number of classes in block\" type=\"number\" required=\"true\"></common-input> <common-input ng-model=\"vm.level.class_minutes\" name=\"class_minutes\" display-name=\"Minutes per class\" type=\"number\" required=\"true\"></common-input> <teacher-dropdown ng-model=\"vm.level.teachers\"></teacher-dropdown> <a class=\"btn btn-default\"ng-click=\"vm.cancel(form)\">{{vm.cancelText}}</a> <a class=\"btn btn-default pull-right\" ng-disabled=\"form.$invalid\" ng-click=\"vm.submit(form)\">{{vm.submitText}}</a> </div></script>");
$templateCache.put("app/managePassOptions/managePassOptions.html","<section class=mainbar><section class=matter><div class=container><div class=row><h1>Manage Pass Options</h1><table class=\"table table-hover\"><thead><th>Name</th><th>Cost</th><th></th></thead><tbody ng-repeat=\"pass in vm.passOptions\" ng-controller=\"UpdatePassOptions as vm\" ng-init=\"vm.passOption = pass\"><tr><td>{{vm.passOption.description}}</td><td>{{vm.passOption.cost | currency}}</td><td><div ng-hide=vm.updating><a ng-click=vm.startUpdating() class=\"btn default\">Update</a> <a ng-click=vm.delete() class=\"btn default\">Delete</a></div></td></tr><tr ng-show=vm.updating><td colspan=3><form novalidate name=form><div ng-include src=\"\'passOption.html\'\"></div></form></td></tr></tbody></table></div><div ng-controller=NewPassOptions class=row><form ng-show=vm.addingNew novalidate name=form><div ng-include src=\"\'passOption.html\'\"></div></form><a class=\"btn btn-default\" ng-hide=vm.addingNew ng-click=\"vm.addingNew = true;\">Add New Pass Option</a></div></div></section></section><script type=text/ng-template id=passOption.html><div class=\"form-group col-xs-12\" ng-class=\"{\'has-error\':(form.description.$invalid && form.description.$touched) || form.description.serverError}\"> <input class=\"form-control\" id=\"description\" name=\"description\" type=\"text\" placeholder=\"Description (required)\" ng-model=\"vm.passOption.description\" required/> <validation-error ng-model=\"form.description\" error=\"required\" message=\"Description is required.\"></validation-error> <server-error ng-model=\"form.description\"></server-error> </div> <div class=\"form-group col-xs-12\" ng-class=\"{\'has-error\':(form.cost.$invalid && form.cost.$touched) || form.cost.serverError}\"> <input class=\"form-control\" id=\"cost\" name=\"cost\" type=\"number\" placeholder=\"Price (required)\" ng-model=\"vm.passOption.cost\" required/> <validation-error ng-model=\"form.cost\" error=\"required\" message=\"Price is required.\"></validation-error> <validation-error ng-model=\"form.cost\" error=\"number\" message=\"Price must be a number.\"></validation-error> <server-error ng-model=\"form.cost\"></server-error> </div> <div class=\"form-group col-xs-12\" ng-class=\"{\'has-error\':(form.pass_type.$invalid && form.pass_type.$touched) || form.pass_type.serverError}\"> <div> <label>Pass Type</label> </div> <div class=\"radio\" data-ng-repeat=\"passType in vm.passTypes\"> <label> <input type=\"radio\" name=\"pass_type\" data-ng-model=\"$parent.vm.passOption.pass_type\" ng-value=\"passType.value\" required> {{passType.display}} </label> </div> <validation-error ng-model=\"form.pass_type\" error=\"required\" message=\"Pass Type is required.\"></validation-error> <server-error ng-model=\"form.pass_type\"></server-error> </div> <div class=\"form-group col-xs-12\" ng-class=\"{\'has-error\':(form.weeks_valid_for.$invalid && form.weeks_valid_for.$touched) || form.weeks_valid_for.serverError}\"> <input class=\"form-control\" id=\"weeks_valid_for\" name=\"weeks_valid_for\" type=\"number\" placeholder=\"Weeks Valid For (required)\" ng-model=\"vm.passOption.weeks_valid_for\" required/> <validation-error ng-model=\"form.weeks_valid_for\" error=\"required\" message=\"Weeks valid for is required.\"></validation-error> <validation-error ng-model=\"form.weeks_valid_for\" error=\"number\" message=\"Weeks valid for must be a number.\"></validation-error> <server-error ng-model=\"form.weeks_valid_for\"></server-error> </div> <div class=\"form-group col-xs-12\" ng-class=\"{\'has-error\':(form.classes_valid_for.$invalid && form.classes_valid_for.$touched) || form.classes_valid_for.serverError}\"> <input class=\"form-control\" id=\"classes_valid_for\" name=\"classes_valid_for\" type=\"number\" placeholder=\"Classes Valid For (required)\" ng-model=\"vm.passOption.classes_valid_for\" required/> <validation-error ng-model=\"form.classes_valid_for\" error=\"required\" message=\"Classes valid for is required.\"></validation-error> <validation-error ng-model=\"form.classes_valid_for\" error=\"number\" message=\"Classes valid for must be number.\"></validation-error> <server-error ng-model=\"form.classes_valid_for\"></server-error> </div> <div class=\"form-group col-xs-12\" ng-class=\"{\'has-error\':(form.available_for_purchase.$invalid && form.available_for_purchase.$touched) || form.available_for_purchase.serverError}\"> <div> <input id=\"available_for_purchase\" name=\"available_for_purchase\" type=\"checkbox\" ng-model=\"vm.passOption.available_for_purchase\"/> Available for purchase </div> <server-error ng-model=\"form.available_for_purchase\"></server-error> </div> <div> <a class=\"btn btn-default\"ng-click=\"vm.cancel(form)\">{{vm.cancelText}}</a> <a class=\"btn btn-default pull-right\" ng-disabled=\"form.$invalid\" ng-click=\"vm.submit(form)\">{{vm.submitText}}</a> </div></script>");
$templateCache.put("app/manageStudents/manageStudents.html","<section class=mainbar><section class=matter><div class=container><div class=row><h1>Manage Students</h1><div ng-form=filterForm><h3>Filter</h3><div><common-input ng-model=vm.filter.search name=filter_search display-name=\"Name or Email\" type=text></common-input></div><div>Showing: {{vm.filteredStudents.length}} students</div></div><table class=\"table table-hover\"><thead><th>Name</th><th>Email</th><th></th></thead><tbody ng-controller=ManageStudent ng-init=\"student = outerStudent\" ng-repeat=\"outerStudent in vm.filteredStudents = (vm.students | filter:vm.filter.search | orderBy: \'full_name\')\"><tr ng-click=getStudentInfo()><td>{{student.full_name}}</td><td>{{student.email}}</td><td><a ng-click=delete() class=\"btn btn-link\">Delete</a></td></tr><tr ng-show=showStudent><td colspan=3><div><h3>Passes</h3><p ng-show=\"!student.studentInfo.passes || !student.studentInfo.passes.any()\">No passes</p><table class=\"table table-hover\" ng-hide=\"!student.studentInfo.passes || !student.studentInfo.passes.any()\"><thead><th>Pass Number</th><th>Name</th><th>Payment Status</th><th></th></thead><tbody ng-controller=ManagePass ng-init=\"pass = outerpass\" ng-repeat=\"outerpass in student.studentInfo.passes\"><tr><td>{{pass.pass_number}}</td><td>{{pass.description}}</td><td>{{pass.payment_status}}</td><td><a ng-click=startUpdating() class=\"btn btn-link\">Update</a> <a ng-click=delete() class=\"btn btn-link\">Delete</a></td></tr><tr ng-show=passUpdating><td colspan=4><form novalidate name=form><common-input ng-if=\"pass.pass_type === \'Clip\'\" ng-model=pass.clips_remaining name=clips_remaining display-name=\"Clips Remaining\" type=number required=true></common-input><common-input ng-model=pass.start_date name=start_date display-name=\"Start Date\" type=date required=true></common-input><common-input ng-model=pass.end_date name=end_date display-name=\"End Date\" type=date required=true></common-input></form><a class=\"btn btn-link\" ng-click=cancel()>Cancel</a> <a class=\"btn btn-default pull-right\" ng-disabled=form.$invalid ng-click=submit(form)>Update</a></td></tr></tbody></table><a ng-click=getStudentInfo() class=\"btn btn-link\">Close</a></div></td></tr></tbody></table></div></div></section></section>");
$templateCache.put("app/manageTeachers/manageTeachers.html","<section class=mainbar><section class=matter><div class=container><div class=row><h1>Manage Teachers</h1><table class=\"table table-hover\"><thead><th>Name</th><th></th></thead><tbody ng-repeat=\"teacher in vm.teachers\"><tr><td>{{teacher.full_name}}</td><td><a class=\"btn btn-link\" ng-click=vm.remove(teacher.id)>Remove as teacher</a></td></tr></tbody></table></div><div class=row><user-search ng-model=vm.selectedUser placeholder=\"Enter new teacher\'s name\"></user-search><button class=\"btn btn-primary\" ng-disabled=!vm.selectedUser ng-click=vm.addTeacher()>Add as teacher</button></div></div></section></section>");
$templateCache.put("app/manageUser/manageUser.html","<section class=mainbar><section class=matter><div class=container><div class=row><h1>Manage Your Details</h1><form name=updateForm novalidate><div class=\"col-xs-12 col-sm-6\"><div class=\"form-group col-xs-12\" ng-class=\"{\'has-error\':(updateForm.first_name.$invalid && updateForm.first_name.$touched) || updateForm.first_name.serverError}\"><input class=form-control id=first_name name=first_name type=text placeholder=\"First Name\" ng-model=vm.user.first_name><validation-error ng-model=updateForm.first_name error=required message=\"First name is required.\"></validation-error><server-error ng-model=updateForm.first_name></server-error></div><div class=\"form-group col-xs-12\" ng-class=\"{\'has-error\':(updateForm.surname.$invalid && updateForm.surname.$touched) || updateForm.surname.serverError}\"><input class=form-control id=surname name=surname type=text placeholder=Surname ng-model=vm.user.surname required><server-error ng-model=updateForm.surname></server-error></div><div class=\"form-group col-xs-12\" ng-class=\"{\'has-error\':(updateForm.email.$invalid && updateForm.email.$touched) || updateForm.email.serverError}\"><input class=form-control id=email name=email type=text placeholder=Email ng-model=vm.user.email required><server-error ng-model=updateForm.email></server-error></div><div class=\"form-group col-xs-12\" ng-class=\"{\'has-error\':(updateForm.password.$invalid && updateForm.password.$touched) || updateForm.email.serverError}\"><input class=form-control id=password name=password type=password placeholder=\"Password (Required)\" ng-model=vm.user.password required><validation-error ng-model=registerForm.password error=required message=\"Password is required.\"></validation-error><server-error ng-model=updateForm.password></server-error></div><div class=\"form-group col-xs-12\"><button class=\"btn btn-primary pull-right\" ng-click=vm.updateUser(updateForm) ng-disabled=updateForm.$invalid>Update</button></div></div></form></div></div></section></section>");
$templateCache.put("app/register/newUser.html","<form ng-hide=vm.registrationSuccessful name=registerForm novalidate><div class=row><div class=\"form-group col-xs-12\" ng-class=\"{\'has-error\':(registerForm.first_name.$invalid && registerForm.first_name.$touched) || registerForm.first_name.serverError}\"><input class=form-control id=first_name name=first_name type=text placeholder=\"First Name (required)\" ng-model=vm.newUser.first_name required><validation-error ng-model=registerForm.first_name error=required message=\"First name is required.\"></validation-error><server-error ng-model=registerForm.first_name></server-error></div><div class=\"form-group col-xs-12\" ng-class=\"{\'has-error\':(registerForm.surname.$invalid && registerForm.surname.$touched) || registerForm.surname.serverError}\"><input class=form-control id=surname name=surname type=text placeholder=\"Surname (required)\" ng-model=vm.newUser.surname required><validation-error ng-model=registerForm.surname error=required message=\"Surname is required.\"></validation-error><server-error ng-model=registerForm.surname></server-error></div><div class=\"form-group col-xs-12\" ng-class=\"{\'has-error\':(registerForm.email.$invalid && registerForm.email.$touched) || registerForm.email.serverError}\"><input class=form-control id=email name=email type=text placeholder=\"Email (required)\" ng-model=vm.newUser.email required><validation-error ng-model=registerForm.email error=required message=\"Email is required.\"></validation-error><server-error ng-model=registerForm.email></server-error></div><div class=\"form-group col-xs-12\" ng-class=\"{\'has-error\':(registerForm.password.$invalid && registerForm.password.$touched) || registerForm.email.serverError}\"><input class=form-control id=password name=password type=password placeholder=\"Password (required)\" ng-model=vm.newUser.password required><validation-error ng-model=registerForm.password error=required message=\"Password is required.\"></validation-error><server-error ng-model=registerForm.password></server-error></div><div class=\"form-group col-xs-12\"><button class=\"btn btn-primary pull-right\" ng-click=vm.registerNewUser(registerForm) ng-disabled=registerForm.$invalid>Register</button> <button class=\"btn btn-primary\" ng-click=vm.cancelNewAccount() ng-show=vm.cancelNewAccount>Cancel</button></div></div></form>");
$templateCache.put("app/register/registerUser.html","<section class=push-down-64><section class=matter><div class=container><div class=row><div class=\"col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4 well\"><h3 class=text-center>New User<div ng-include src=\"\'app/register/newUser.html\'\"></div><div ng-show=vm.registrationSuccessful>Thank you, you\'ll receive an email to activate your account shortly.</div></h3></div></div></div></section></section>");
$templateCache.put("app/reportProfit/reportProfit.html","<section class=mainbar><section class=matter><div class=container><div class=row><h1>Profit/Loss Report</h1><form><common-input ng-model=vm.starting type=date name=starting display-name=From></common-input><common-input ng-model=vm.ending type=date name=ending display-name=To></common-input><a ng-click=vm.updateDateRanage() class=\"btn btn-primary\">Update Date Range</a></form><div><h3>Pass Sales</h3><table class=\"table table-striped\"><thead><th>Pass</th><th>Sold</th><th>Revenue</th></thead><tbody><tr ng-repeat=\"pass in vm.profitReport.pass_profit_reports\"><td>{{pass.pass_description}}</td><td>{{pass.total_sold}}</td><td>{{pass.total_revenue | currency}}</td></tr><tr><td>Total</td><td>{{vm.profitReport.total_passes_sold}}</td><td>{{vm.profitReport.total_pass_revenue | currency}}</td></tr></tbody></table></div><div><h3>Block Revenue</h3><table class=\"table table-striped\"><thead><th>Block</th><th>Attendance</th><th>Revenue</th></thead><tbody><tr ng-repeat-start=\"block in vm.profitReport.block_profit_reports\" ng-click=\"block.open = !block.open\"><td>{{block.name}}</td><td>{{block.total_attendance}}</td><td>{{block.total_revenue | currency}}</td></tr><tr ng-repeat-end ng-repeat=\"class in block.class_profit_reports\" ng-show=block.open><td>{{class.name}}</td><td>{{class.total_attendance}}</td><td>{{class.revenue | currency}}</td></tr><tr><td>Total</td><td>{{vm.profitReport.total_block_attendance}}</td><td>{{vm.profitReport.total_block_revenue | currency}}</td></tr></tbody></table></div></div></div></section></section>");
$templateCache.put("app/reportTeacherHours/reportTeacherHours.html","<section class=mainbar><section class=matter><div class=container><div class=row><h1>Teacher Hours</h1><form><common-input ng-model=vm.starting type=date name=starting display-name=From></common-input><common-input ng-model=vm.ending type=date name=ending display-name=To></common-input><a ng-click=vm.getHours() class=\"btn btn-primary\">Update Date Range</a></form><table class=\"table table-hover\"><thead><th>Name</th><th>Solo Classes</th><th>Partnered Classes</th></thead><tbody ng-repeat=\"teacherHour in vm.teacherHours\"><tr><td>{{teacherHour.full_name}}</td><td>{{teacherHour.soloClasses.length}}</td><td>{{teacherHour.partnerClasses.length}}</td></tr></tbody></table></div></div></section></section>");
$templateCache.put("app/resetPassword/resetPassword.html","<section class=push-down-64><section class=matter><div class=container><div class=row><div class=\"col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4 well\"><h3 class=text-center>Reset Password<form name=resetPasswordForm novalidate ng-hide=vm.isSubmitted><div class=row><div class=\"form-group col-xs-12\" ng-class=\"{\'has-error\':resetPasswordForm.password.$invalid && resetPasswordForm.password.$touched || resetPasswordForm.password.serverError}\"><input class=form-control type=password id=password name=password placeholder=Password ng-model=vm.password required><validation-error ng-model=resetPasswordForm.password error=required message=\"Password is required.\"></validation-error><server-error ng-model=resetPasswordForm.password></server-error></div><div class=\"form-group col-xs-12\"><button class=\"btn btn-primary pull-right\" ng-click=vm.submit(resetPasswordForm) ng-disabled=resetPasswordForm.$invalid>Reset</button></div></div></form><div ng-show=vm.isSubmitted>Your password has been reset. <a data-ng-href={{vm.loginUrl}}>Click here to log in</a></div></h3></div></div></div></section></section>");
$templateCache.put("app/userActivation/userActivation.html","<section class=push-down-64><section class=matter><div class=container><div class=row><div class=\"col-lg-3 col-lg-offset-4 well\"><h3 class=text-center>Account Activation</h3><div ng-show=vm.loaded><div ng-show=vm.activationSuccessful>Your account has been activated! <a data-ng-href={{vm.loginUrl}}>Click here to log in</a></div><div ng-show=!vm.activationSuccessful>There was an issue activating your account.</div></div><div ng-hide=vm.loaded>Activating account...</div></div></div></div></section></section>");
$templateCache.put("app/core/directives/filterDirective.html","<div><h3>Filter</h3><div ng-repeat=\"filter in options.fields\" ng-form=filterForm><common-input ng-model=filter.value name={{filter.name}} display-name={{filter.name}} type=text required=false></common-input>{{filter}}</div></div>");}]);