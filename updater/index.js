(function (updater) {
    var socketio = require("socket.io");
    updater.init = function (server) {
        var io = socketio.listen(server);
        io.sockets.on("connection", function (socket) {
            console.log("Soket was connected");

            socket.emit("showThis", "Message from server.")
        })

    };
})(module.exports);