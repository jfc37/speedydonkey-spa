(function (updater) {

	var socketio = require('socket.io');

	updater.init = function(server) {
		io = socketio.listen(server);

		io.sockets.on('connection', function (socket) {
			console.log('socket was connected');
			socket.on('join room', function(data) {
				socket.join(data.room_name);
				socket.broadcast.to(data.room_name).emit("user joined", data.user);
			});

			socket.on('new message', function(data) {
				socket.broadcast.to(data.room_name).emit("broadcast message", {message: data.message, from: data.from});
			});
		});
	};

})(module.exports);