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