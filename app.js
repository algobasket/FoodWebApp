var createError  = require('http-errors');
var express      = require('express');
var path         = require('path');
var cookieParser = require('cookie-parser');
var logger       = require('morgan');
var session      = require('express-session');
var flash        = require('connect-flash');
let date         = require('date-and-time');
let async        = require('async');


 //------ Connecting CouchDB ---------

var db    = require('./config');

// ------ Required Models ------------------

// var loginModel    = require('./models/loginModel');
// var userModel     = require('./models/userModel');
// var categoryModel = require('./models/categoryModel');
// var paymentModel  = require('./models/paymentModel');
// var orderModel    = require('./models/orderModel');
// var crudModel     = require('./models/crudModel');

// ------ Required Routers -----------------
var indexRouter   = require('./routes/index');
var usersRouter   = require('./routes/users');
var paymentRouter = require('./routes/payment');
var loginRouter   = require('./routes/login');
var orderRouter   = require('./routes/order');

var backendRouter = require('./routes/backend/index');
var backendCatRouter = require('./routes/backend/category');

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
app.use('/payment',paymentRouter);
app.use('/login',loginRouter);
app.use('/order',orderRouter);

app.use('/backend',backendRouter); 
app.use('/backend/categories',backendCategoriesRouter);
app.use('/backend/products',backendProductsRouter);
app.use('/backend/orders',backendOrdersRouter);
app.use('/backend/payments',backendPaymentsRouter);
app.use('/backend/users',backendUsersRouter);
app.use('/backend/siteSettings',backendSiteSettingsRouter);
app.use('/backend/apiSettings',backendApiSettingsRouter);


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
