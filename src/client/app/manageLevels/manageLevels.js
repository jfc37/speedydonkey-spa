(function () {
    'use strict';

    angular
        .module('app.manageLevels')
        .controller('ManageLevels', ManageLevels)
        .controller('NewLevel', NewLevel);

    ManageLevels.$inject = ['$q', 'logger', 'manageLevelsService'];

    /* @ngInject */
    function ManageLevels($q, logger, manageLevelsService) {
        /*jshint validthis: true */
        var vm = this;
        vm.levels = [];

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

        $scope.vm.submit = function(form) {
            manageLevelsService.create($scope.vm.level).then(function (createdLevel){
                logger.success('New level created');
                $scope.$parent.vm.levels.push(createdLevel);
                $scope.vm.addingNew = false;
                $scope.vm.level = {};
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
})();