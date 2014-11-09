(function () {
    'use strict';

    angular
        .module('app.meetingRoom')
        .controller('MeetingRoom', MeetingRoom);

    MeetingRoom.$inject = ['$scope', '$q', '$routeParams', 'dataservice', 'logger'];

    /* @ngInject */
    function MeetingRoom($scope, $q, $routeParams, dataservice, logger) {
        /*jshint validthis: true */
        var socket = {};
        var vm = this;
        vm.users = [];
        vm.messages = [];
        vm.room_name = $routeParams.courseName;
        vm.title = vm.room_name + ' Meeting Room';

        vm.sendMessage = function() {
            socket.emit('new message', { room_name: vm.room_name, message: vm.message, from: 'user1' });
            vm.messages.push({from: 'me', message: vm.message});
            vm.message = '';
        }

        activate();

        function activate() {
            socket = io.connect();
                
            socket.emit("join room", {room_name: $routeParams.courseName, user: 'user1'});


            socket.on("broadcast message", function (message) {
                vm.messages.push(message);
                $scope.$apply();
            });

            socket.on("user joined", function (user) {
                vm.users.push(user);
                $scope.$apply();
            });
        }
    }
})();