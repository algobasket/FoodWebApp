var express = require('express');
var router = express.Router();
var nano = require('nano')('http://admin:password@localhost:5984');
var db = nano.db.use('food-ordering-app');



/* GET home page. */
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

  if(req.body.email && req.body.password){
    const q = {
    selector: {
         email: { "$eq": req.body.email },
         password: { "$eq": req.body.password }
      },
       fields: [ "email", "password", "role", "status" ],
       limit:1
     };
    db.find(q).then((body) => {

       if(body.docs.length == 1){
           body.docs.forEach((row) => {
          if(row.email){
            req.session.backendUserEmail  = row.email;
            req.session.backendUserRole   = row.role;
            req.session.backendUserStatus = row.status;
            req.session.isBackendUserLoggedIn = true;
            req.flash('alert',"Login Successful");
            res.redirect('/backend');
           }
          });
       }else{
            req.flash('alert','<div class="alert alert-danger">Invalid Credentials</div>');
            res.redirect('/login/backend');
       }

     });
   };

});

router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
    res.redirect('/login/backend');
  })
});

module.exports = router;
