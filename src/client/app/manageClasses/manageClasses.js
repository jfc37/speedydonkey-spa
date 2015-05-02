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