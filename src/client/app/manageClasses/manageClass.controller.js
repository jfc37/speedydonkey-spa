(function () {
    'use strict';

    angular
        .module('app.manageClasses')
        .controller('ManageClass', ManageClass);

    ManageClass.$inject = ['$scope', 'manageClassesService', 'validationService', 'logger', 'authService'];

    function ManageClass($scope, manageClassesService, validationService, logger, authService) {
        var vm = this;
        $scope.vm.submitText = 'Update';
        $scope.vm.cancelText = 'Close';
        $scope.vm.isAdmin = authService.hasClaim('Admin');
        var copy = {};

        $scope.vm.classCheckInUrl = function (theClass) {
            return '#/class/' + theClass.id + '/check-in';
        };

        $scope.vm.startUpdating = function () {
            copy = angular.copy($scope.vm.class);
            $scope.vm.updating = true;
        };

        $scope.vm.submit = function (form) {
            manageClassesService.update($scope.vm.class).then(function () {
                logger.success('Class updated');
                $scope.vm.updating = false;
            }, function (errors) {
                validationService.applyServerSideErrors(form, errors);
            });
        };

        $scope.vm.delete = function () {
            manageClassesService.deleteClass($scope.vm.class.id).then(function () {
                logger.success('Class deleted');
                $scope.$parent.vm.classes.remove($scope.vm.class);
            }, function (errors) {
                logger.error('Failed to delete class');
            });
        };

        $scope.vm.cancel = function () {
            $scope.vm.class = copy;
            $scope.vm.updating = false;
        };
    }
})();
