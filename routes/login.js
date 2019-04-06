var express    = require('express');
var router     = express.Router();
var nano       = require('nano')('http://admin:password@localhost:5984');
var db         = nano.db.use('food-ordering-app');
var loginModel = require('../models/loginModel');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Customer Login' });
});



router.get('/facebook', function(req, res, next) {
  res.render('index', { title: 'Facebook Login' });
});




router.get('/google', function(req, res, next) {
  res.render('index', { title: 'Google Login' });
});




router.get('/qrAuth/:id',function(req, res, next){
   if(!req.session.table && req.params.id){
     req.session.table = req.params.id;
     req.redirect('/');
   }
});




router.get('/backend',function(req,res,next){
   if(req.session.isBackendUserLoggedIn == true){
    res.redirect('/backend');
  }
   res.render('backend/login',{ alert : req.flash('alert')});
});




router.post('/backend/auth',function(req,res,next){

  return loginModel.loginUser(req,res,next);
  
});


router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
    res.redirect('/login/backend');
  })
});



module.exports = router;
