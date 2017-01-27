var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var async = require('async');
var port = process.env.PORT || 3000;

var app = express();
var httpServer = require('http').Server(app);
var ioServer = require('socket.io')(httpServer);

var myServer = new Server();
myServer.init();

// view engine setup
app.set('views', path.join(__dirname, 'pages'));
app.set('view engine', 'jade');

app.get('/', function(req, res, next) {
    res.render('index', {title: 'Express'});
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets')));

function Server() {
    var _self = this;
    this.usersData = {};
    this.companyData = [];

    this.init = function(){
        console.log('Initializing');
        async.series([
            function(callback) {
                _self.loadUserData(callback);
            },
            function(callback) {
                _self.initSocketServer(callback);
            }
        ], function(err, results){
            if(!err) {
                console.log('Init successfull');
            }
        });
    },
    this.loadUserData = function(callback){
        var data = fs.readFileSync('data.json', 'utf-8');
        _self.usersData = JSON.parse(data);
        callback();
    },
    this.initSocketServer = function(callback){
        ioServer.on('connection', function(socket){
            socket.emit('connected', {users: _self.usersData, filterType: 'white-label'});

            socket.on('findUser', function(data) {
                var id = data.id;
                var user;
                for( var i = 0; i<_self.usersData.length; i++) {
                    if(_self.usersData[i]['id'] === id) {
                        user = _self.usersData[i];
                    }
                }
                socket.emit('userData', {user: user});
            });

            socket.on('add-company', function(companyData) {
                _self.companyData.push(companyData);
                socket.emit('company-saved');
            });

            socket.on('edit-user', function(user) {
                for( var i = 0; i < _self.usersData.length; i++) {
                    if(_self.usersData[i]["id"] == user.data["id"]) {
                        _self.usersData[i] = user.data;
                    }
                }
                socket.emit('update-users', {users: _self.usersData, filterType: user.type});
            });

            socket.on('delete-user', function(userId){
                var idx;
                for( var i = 0; i < _self.usersData.length; i++) {
                    if(_self.usersData[i]["id"] == userId){
                        idx = i;
                    }
                }
                _self.usersData.splice(idx, 1);
                socket.emit('update-users', {users: _self.usersData, filterType: user.type});
            });

            socket.on('add-user', function(user){
                let idx = _self.usersData.length + 1;
                _self.usersData.push(user.data);
                _self.usersData[idx-1]["id"] = idx;
                socket.emit('update-users', {users: _self.usersData, filterType: user.type });
            });
        });
        callback();
    }
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

httpServer.listen(port, function(){
    console.log('Listening port', port);
})

module.exports = app;
