var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server, { origins: '*:*' });

server.listen(8080);

io.on('connection', function (socket) {
    console.log("user connected");
    socket.on('addItem', function (data) {
        socket.broadcast.emit('addItem', data);
    });
    socket.on('disconnect', function () {
        console.log("user disconnected");
    });
});



