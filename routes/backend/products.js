let express = require('express')
 , router   = express.Router()
 , nano     = require('nano')('http://admin:password@localhost:5984')
 , db       = nano.db.use('food-ordering-app')
 , date     = require('date-and-time')
 , uuidv1   = require('uuid/v1');

 var categoryModel = require('../../models/categoryModel');


 /* -----Backend Categories ------------ */
router.get('/',function(req, res, next){
  
     db.get('_design/ItemDoc/_view/Item',function(err,body){
       if(err){
         res.send(err);
       }
       var categories = categoryModel.getAllCategories(req,res,next);
       var data = {
         section : 'list',
         alert : req.flash('alert'),
         products : (body.total_rows != 0) ? body.rows : 0,
         categories : (categories.total_rows != 0) ? categories.rows : 0
       };
        
       //res.render('backend/products',data);
   });
  
});


router.get('/test',function(req,res,next){ 
      console.log(categoryModel.getAllCategories(req,res));  
});



/* -------- Backend Create Categories  ------- */

router.post('/create',function(req, res, next){ 

  if(req.body.itemName && req.body.itemDescription){
     var data = {
      _id : uuidv1(),
      itemName : req.body.itemName,
      categoryName : req.body.categoryName,
      itemDescription : req.body.itemDescription,
      itemCreated : date.format(new Date(), 'DD-MM-YYYY'),
      itemUpdated : date.format(new Date(), 'DD-MM-YYYY'),
      itemStatus : req.body.itemStatus
    };
    db.insert(data,data._id).then((body) => {
       req.flash('alert','<br><div class="alert alert-success">New Product Added</div>');
       res.redirect('/backend/products');
    })
  };
}); 


router.get('/edit/:id',function(req,res,next){
  db.get('_design/ProductDoc/_view/Product',{ key : req.params.id },function(err,body){
    if(err){
      res.send(err);
    }
    var data = {
      section : 'update',
      alert : req.flash('alert'),
      categories : body.rows
    };
    res.render('backend/products',data);
  });
});


router.post('/edit',function(req,res,next){

  db.update = function(obj, key, callback) {
    var db = this;
    db.get(key, function (error, existing) {
        if(!error) obj._rev = existing._rev;
        db.insert(obj, key, callback);
    });
  }
  var data = {
    itemName : req.body.product_name,
    itemDescription   : req.body.description,
    itemUpdated : date.format(new Date(), 'DD-MM-YYYY'),
    itemStatus : req.body.status
  }
  db.update(data,req.body.id, function(err, res) {
    if (err) return console.log('No update!');
    req.flash('alert','<br><div class="alert alert-success">Product Updated</div>');
    res.redirect('/backend/products');
  });

});


router.get('/delete/:id',function(req,res,next){
  console.log(req.params.id);
  db.destroy('ProductDoc',req.params.id).then((body) => {
   console.log(body);
   });
  req.flash('alert','<br><div class="alert alert-danger">Category Deleted</div>');
  res.redirect('/backend/categories');
});


module.exports = router;
