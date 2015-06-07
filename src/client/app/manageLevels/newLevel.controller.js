(function () {
    'use strict';

    angular
        .module('app.manageLevels')
        .controller('NewLevel', NewLevel);

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
