/** this is to test socketIO */

var express = require('express');
var app = express();
var appPort = process.env['app_port'] || 3000;
var socketIO = require('socket.io');
/*
var index = require("fs").readFileSync(__dirname + "/index.html", "utf8");

*/
/*app.get("/" , function (req,res) {
    res.send("testing");
})

app.use(express.bodyParser());

app.get("/", function(req, res, next) {
    res.send(index);
});*/

app.use(express.static(__dirname + '/index.html',"utf8"));
var io = socketIO.listen(app.listen(appPort));

io.sockets.on('connection', function (socket) {
    socket.on('ferret', function (name, fn) {
        fn('woot');
    });
});

//app.listen(appPort);
/*var io = socketIO.listen(app.listen(appPort));
*//*io.configure(function () {
    io.set('transports', ['xhr-polling']);
    io.set('polling duration', 10);
})
io.sockets.on('connection', function(socket) {
    cosole.log("testing");
    socket.emit('message', {message: 'testing Socket.io '});
    socket.on('send', function (data) {
        console.log("echoing the message: " + data);
        io.sockets.emit('message', data);
    });
})*//*

//var io = require('socket.io').listen(80);
app.use(express.static(__dirname + '/index.html',"utf8"));
io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});*/



console.log("Socket.Io listening the port" + appPort);
