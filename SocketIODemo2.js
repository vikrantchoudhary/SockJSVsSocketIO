/** this is to test socketIO */
/*var express = require('express');
var app = express();
var appPort = process.env['app_port'] || 3000;
var socketIO = require('socket.io');*/

var appPort = process.env['app_port'] || 3000;
var app = require('http').createServer(handler)
    , io = require('socket.io').listen(app)
    , fs = require('fs')

app.listen(appPort);

function handler (req, res) {
    fs.readFile(__dirname + '/index2.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});
