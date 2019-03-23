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
   res.render('backend/login',{ alert : ""} );
});

router.post('/backend/auth',function(req,res,next){
  var alert = "";
  console.log(req.body);
  if(req.body.email && req.body.password){
    const q = {
    selector: {
         email: { "$eq": "admin@admin.com"}
      },
       fields: [ "email", "password", "role", "status" ],
       limit:1
     };
    db.find(q).then((body) => {
       body.docs.forEach((row) => {
          if(row.email){
            req.session.backendUserEmail  = row.email;
            req.session.backendUserRole   = row.role;
            req.session.backendUserStatus = row.status;
            req.session.isBackendUserLoggedIn = true;
            res.redirect('/backend'); 
          }else{
            alert = "Invalid User Please Try Again !";
          }
       });
     });
   };
   res.render('backend/login',{ alert : alert });
});

router.get('/admin', function(req, res, next) {
  res.render('index', { title: 'Admin Login' });
});

module.exports = router;
