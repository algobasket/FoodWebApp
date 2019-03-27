var createError  = require('http-errors');
var express      = require('express');
var path         = require('path');
var cookieParser = require('cookie-parser');
var logger       = require('morgan');
var session      = require('express-session');
var flash        = require('connect-flash');
let date         = require('date-and-time');


 //------ Connecting CouchDB ---------
var nano = require('nano')('http://admin:password@localhost:5984');
var db   = nano.db.use('food-ordering-app');

// ------ Router ------------
var indexRouter   = require('./routes/index');
var usersRouter   = require('./routes/users');
var backendRouter = require('./routes/backend');
var paymentRouter = require('./routes/payment');
var loginRouter   = require('./routes/login');
var orderRouter   = require('./routes/order');

var app = express();


// ---------- Middlewares -----------------
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(session({
  secret:"algobasket is cool",
  resave: false,
  saveUninitialized: false
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());


app.use('/', indexRouter);
app.use('/users',usersRouter);
app.use('/backend',backendRouter);
app.use('/payment',paymentRouter);
app.use('/login',loginRouter);
app.use('/order',orderRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
