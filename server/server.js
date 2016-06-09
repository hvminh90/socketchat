//Khai báo module
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var socketio = require('socket.io');
var fs = require('fs');
var port = process.env.port || 2308;

var app = express();
var server = http.createServer(app);




app.use(express.static(__dirname + '/js'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/assets'));
//Store all JS and CSS in Scripts folder.

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});



//server connected
server.listen(2308, '127.0.0.1');
server.on('listening', function() {
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});


io = socketio.listen(server);

var run = function(socket){
    socket.emit('message', { message: 'Chào mừng chat với Todo' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
}

io.sockets.on('connection', run);
