var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var expressSession = require('express-session');

// Database ==============================
// Connecting to remote DB
var config = require('./config/settings.js');
var databaseURL = 'mongodb://'+config.database.username+':'+config.database.password+'@'+config.database.url;
mongoose.connect(databaseURL);

// Load Schemas
postSchema = require('./config/parks.js').Post;
parkSchema = require('./config/parks.js').Park;
Post = mongoose.model('Post', postSchema);
Park = mongoose.model('Park', parkSchema);
/*
var myPark = new Park();
myPark.username = 'haleakala';
myPark.password = '123';
myPark.name = 'Haleakala National Park';
myPark.location = 'Kula, HI';
myPark.save(function(err, res) {
    if(err) console.log(err);
    console.log('parkSaved');
});
*/
// Server ==================

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passport ===================
require('./config/passport.js')(passport);
app.use(expressSession({ secret: 'thisIsSomeClientSecret' }));
app.use(passport.initialize());
app.use(passport.session());


// routes ==================
var routes = require('./routes/index')(passport);
var dashboard = require('./routes/dashboard')(passport); // Main view

app.use('/', routes);
app.use('/dashboard', dashboard);

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


module.exports = app;
