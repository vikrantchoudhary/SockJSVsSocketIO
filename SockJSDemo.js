var express = require('express');
//var http = require('http');
var sockjs = require('sockjs');
//var tty = require('pty.js');
var appPort = process.env['app_port'] || 3000;
var sockJsApp = module.exports = express();      // initializes express app
var sockjs_opts = { sockjs_url: "http://cdn.sockjs.org/sockjs-0.3.min.js" }
var routes = require('./routes');

/* ============== Init sockJsApp app ================ */

// Configuration
sockJsApp.configure(function(){
  sockJsApp.use(express.logger());
  sockJsApp.use(sockJsApp.router);
  sockJsApp.use(express.static(__dirname + '/public'));
});

sockJsApp.configure('development', function(){
  sockJsApp.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

sockJsApp.configure('production', function(){
  sockJsApp.use(express.errorHandler()); 
});
// Routes
sockJsApp.get('/', routes.index);

// Init server
server = sockJsApp.listen(appPort, function() {
  console.log("Express server listening on port %d in %s mode", server.address().port, sockJsApp.settings.env);
});

/* ============== Init WebSockets servers within the sockJsApp app ================ */

// SockJS echo server
sjsEchoServer = sockjs.createServer(sockjs_opts);

sjsEchoServer.on('connection', function(conn) {
  conn.of
  conn.on('data', function(message) {
    console.log("echoing the message: " + message)
    conn.write(message);    // echoing the message
  });
  conn.on('close', function() {});
});


// attach SockJS servers to the main node server
sjsEchoServer.installHandlers(server, { prefix: '/echo' });
