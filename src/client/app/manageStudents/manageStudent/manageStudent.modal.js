(function () {
    'use strict';

    angular
        .module('app.manageStudents')
        .factory('manageStudentModal', manageStudentModal);

    /*@ngInject*/
    function manageStudentModal($q, $uibModal, userRepository, managePassModal, doNotEmailRepository, niceAlert, pageReloader) {
        var modalInstance;
        var viewModel = {
            doNotEmailText: doNotEmailText,
            changeStudentDoNotEmail: changeStudentDoNotEmail,
            deleteStudent: confirmDeleteStudent,
            openPass: openPass
        };

        var service = {
            open: openModal
        };

        function openModal(student) {
            var deferred = $q.defer();

            userRepository.get(student.id).then(function (user) {
                viewModel.student = user;

                modalInstance = $uibModal.open({
                    templateUrl: 'app/manageStudents/manageStudent/manageStudent.html',
                    controller: 'ModalInstanceCtrl',
                    size: 'lg',
                    resolve: {
                        viewModel: function () {
                            return viewModel;
                        }
                    }
                });

                modalInstance.result.then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
            }, function () {
                niceAlert.error('Problem getting ' + student.firstName + ' information.');
            });

            return deferred.promise;
        }

        function doNotEmailText() {
            if (viewModel.student.doNotEmail) {
                return 'Include in email list';
            } else {
                return 'Remove from email list';
            }
        }

        function changeStudentDoNotEmail() {
            var request;

            if (viewModel.student.doNotEmail) {
                request = doNotEmailRepository.allowEmails(viewModel.student).then(function () {
                    niceAlert.success(viewModel.student.firstName + ' has been added back onto the email list.');
                }, function () {
                    niceAlert.error('Problem adding ' + viewModel.student.firstName + ' back onto the email list.');
                });
            } else {
                request = doNotEmailRepository.disallowEmails(viewModel.student).then(function () {
                    niceAlert.success(viewModel.student.firstName + ' has been removed from the email list.');
                }, function () {
                    niceAlert.error('Problem removing ' + viewModel.student.firstName + ' from the email list.');
                });
            }

            request.then(function () {
                viewModel.student.doNotEmail = !viewModel.student.doNotEmail;
            });
        }

        function confirmDeleteStudent() {
            niceAlert.confirm('Are you sure you want to delete ' + viewModel.student.fullName + '? This action can not be undone.', deleteStudent);
        }

        function deleteStudent() {
            userRepository.delete(viewModel.student).then(function () {
                niceAlert.success(viewModel.student.firstName + ' has been deleted.');
            }, function () {
                niceAlert.error('Problem deleting ' + viewModel.student.fullName + '.');
            }).finally(function () {
                modalInstance.close();
                pageReloader.reload();
            });
        }

        function openPass(pass) {
            modalInstance.close();
            managePassModal.open(pass).finally(function () {
                openModal(viewModel.student);
            });
        }

        return service;
    }
}());
