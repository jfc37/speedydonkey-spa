(function (updater) {

    var socketio = require('socket.io');

    updater.init = function (server) {
        io = socketio.listen(server);

        io.sockets.on('connection', function (socket) {
            console.log('socket was connected');
            socket.on('join room', function (data) {
                socket.join(data.roomName);
                socket.broadcast.to(data.roomName).emit("user joined", data.user);
            });

            socket.on('new message', function (data) {
                socket.broadcast.to(data.roomName).emit("broadcast message", {
                    message: data.message,
                    from: data.from
                });
            });
        });
    };

})(module.exports);
