/*global moment*/
(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('note', note);

    function note(dataUpdateService, logger) {
        var directive = {
            templateUrl: 'app/core/directives/note.html',
            require: ['ngModel'],
            scope: {
                ngModel: '='
            },
            link: function (scope, element, attrs) {
                var updateNoteOptions = {
                    id: scope.ngModel.id,
                    type: getType(attrs.type),
                    note: scope.ngModel.note
                };
                var original;

                scope.vm = scope.vm || {};

                scope.vm.title = getTitle(attrs.type, scope.ngModel);

                scope.vm.edit = function () {
                    original = scope.ngModel.note;
                    scope.vm.editing = true;
                };

                scope.vm.save = function () {
                    updateNoteOptions.note = scope.ngModel.note;
                    dataUpdateService.updateNote(updateNoteOptions).then(function () {
                        logger.success('Updated note');
                    }, function () {
                        logger.error('Issue updating note');
                    });
                    scope.vm.editing = false;
                };

                scope.vm.remove = function () {
                    scope.ngModel.note = '';
                    scope.vm.save();
                };

                scope.vm.cancel = function () {
                    scope.ngModel.note = original;
                    scope.vm.editing = false;
                };

                scope.vm.displayNote = function () {
                    return scope.ngModel.note || 'No note';
                };
            }
        };
        return directive;
    }

    function getType(type) {
        var functionToCall = function () {};
        if (type === 'user') {
            return 'users';
        }

        if (type === 'pass') {
            return 'passes';
        }
        return '';
    }

    function getTitle(type, model) {
        var title = 'Notes for ';
        if (type === 'user') {
            title = title + model.full_name;
        }

        if (type === 'pass') {
            title = title + 'pass ' + model.pass_number;
        }

        return title;
    }

})();
