(function () {
    'use strict';

    angular
        .module('app.managePassOptions')
        .controller('ManagePassOptions', ManagePassOptions);

    ManagePassOptions.$inject = ['$q', 'logger', 'selectOptionService', 'managePassOptionsService', 'validationService'];

    /* @ngInject */
    function ManagePassOptions($q, logger, selectOptionService, managePassOptionsService, validationService) {
        /*jshint validthis: true */
        var vm = this;
        vm.passTypes = [];
        vm.passOptions = [];

        vm.create = function(form) {
            managePassOptionsService.create(vm.newPassOption).then(function (createPassOption){
                logger.success('New pass option created');
                vm.passOptions.push(createPassOption);
                vm.addingNew = false;
                vm.newPassOption = {};
            }, function(errors) {
                validationService.applyServerSideErrors(form, errors);
            });
        };

        vm.delete = function(passOption) {
            managePassOptionsService.deletePassOption(passOption.id).then(function (){
                logger.success('Pass option deleted');
                vm.passOptions.remove(passOption);
            }, function(errors) {
                logger.error("Failed to delete pass option");
            });
        };

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
})();