let express = require('express')
 , router  = express.Router()
 , nano    = require('nano')('http://admin:password@localhost:5984')
 , db      = nano.db.use('food-ordering-app')
 , date    = require('date-and-time')
 , uuidv1 = require('uuid/v1');

 /* -------- Backend Dashboard  ------- */
router.get('/', function(req, res, next) {
  if(req.session.isBackendUserLoggedIn == false){
    res.redirect('/login/backend');
  }else{
    res.render('backend/index', { title:'Admin Dashboard' });
  }
});


 /* -----Backend Categories ------------ */
router.get('/categories',function(req, res, next){

     db.get('_design/all_categories/_view/categories',function(err,body){
       if(err){
         res.send(err);
       }
       var data = {
         section : 'list',
         alert : req.flash('alert'),
         categories : body.rows
       };
       //console.log(data.categories);
       // data.forEach(function(x){
       //   console.log(x);
       // });

       res.render('backend/categories',data);
   });
  //res.render('backend/categories',data);
});
/* -------- Backend Create Categories  ------- */
router.post('/categories/create',function(req, res, next){

  if(req.body.category_name && req.body.description){
     var data = {
      _id : uuidv1(),
      category_name : req.body.category_name,
      description : req.body.description,
      created : date.format(new Date(), 'DD-MM-YYYY'),
      updated : date.format(new Date(), 'DD-MM-YYYY'),
      status : req.body.status
    };
    db.insert(data,data._id).then((body) => {
       req.flash('alert','<br><div class="alert alert-success">New Category Added</div>');
       res.redirect('/backend/categories');
    })
  };
});
router.get('/categories/edit/:id',function(req,res,next){
  db.get('_design/all_categories/_view/categories',{ _id : req.params.id },function(err,body){
    if(err){
      res.send(err);
    }
    var data = {
      section : 'update',
      alert : req.flash('alert'),
      categories : body.rows
    };
    //console.log(data.categories);
    // data.forEach(function(x){
    //   console.log(x);
    // });

    res.render('backend/categories',data);
  });
});



/* -------- Backend Products  ------- */
router.get('/products',function(req, res, next){
  res.render('backend/products', { title:'Admin Products' });
});



/* -------- Backend Orders  ------- */
router.get('/orders',function(req, res, next){
  res.render('backend/orders', { title:'Admin Orders' });
});



/* -------- Backend Payments ------- */
router.get('/payments',function(req, res, next){
  res.render('backend/payments', { title:'Admin Payments' });
});



/* -------- Backend User Management  ------- */
router.get('/users',function(req, res, next){
  res.render('backend/users', { title:'Admin Users' });
});

/* -------- Backend QRCodes  ------- */
router.get('/qrcodes',function(req, res, next){
  res.render('backend/qrcodes', { title:'Admin Table QR Codes' });
});


module.exports = router;
