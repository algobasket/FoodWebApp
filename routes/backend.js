var express = require('express');
var router = express.Router();

/* GET Admin page. */
router.get('/', function(req, res, next) {
  if(!req.session.admin){
    res.redirect('/login/backend');
  }else{
    res.render('backend/index', { title:'Admin Dashboard' });
  }
});


// Admin Categories
router.get('/categories',function(res, res, next){
  res.render('backend/categories', { title:'Admin Categories' });
});



// Admin products
router.get('/products',function(res, res, next){
  res.render('backend/products', { title:'Admin Products' });
});



// Admin Orders
router.get('/orders',function(res, res, next){
  res.render('backend/orders', { title:'Admin Orders' });
});



// Admin payments
router.get('/payments',function(res, res, next){
  res.render('backend/payments', { title:'Admin Payments' });
});



// Admin users
router.get('/users',function(res, res, next){
  res.render('backend/users', { title:'Admin Users' });
});


module.exports = router;
