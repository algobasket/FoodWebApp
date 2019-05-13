let express = require('express')
 , router   = express.Router()
 , nano     = require('nano')('http://admin:password@localhost:5984')
 , db       = nano.db.use('food-ordering-app')
 , date     = require('date-and-time')
 , uuidv1   = require('uuid/v1');



 /* -----Backend Categories ------------ */
router.get('/',function(req, res, next){
  
     db.get('_design/CategoryDoc/_view/Category',function(err,body){
       if(err){
         res.send(err);
       }

       var data = {
         section : 'list',
         alert : req.flash('alert'),
         categories : (body.total_rows != 0) ? body.rows : 0
       };
       res.render('backend/categories',data);
   });
  
});



/* -------- Backend Create Categories  ------- */

router.post('/create',function(req, res, next){ 

  if(req.body.category_name && req.body.description){
     var data = {
      _id : uuidv1(),
      catName : req.body.category_name,
      catDescription : req.body.description,
      catCreated : date.format(new Date(), 'DD-MM-YYYY'),
      catUpdated : date.format(new Date(), 'DD-MM-YYYY'),
      catStatus : req.body.status
    };
    db.insert(data,data._id).then((body) => {
       req.flash('alert','<br><div class="alert alert-success">New Category Added</div>');
       res.redirect('/backend/categories');
    })
  };
}); 


router.get('/edit/:id',function(req,res,next){
  db.get('_design/CategoryDoc/_view/Category',{ key : req.params.id },function(err,body){
    if(err){
      res.send(err);
    }
    var data = {
      section : 'update',
      alert : req.flash('alert'),
      categories : body.rows
    };
    res.render('backend/categories',data);
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
    category_name : req.body.category_name,
    description   : req.body.description,
    updated : date.format(new Date(), 'DD-MM-YYYY'),
    status : req.body.status
  }
  db.update(data,req.body.id, function(err, res) {
    if (err) return console.log('No update!');
    req.flash('alert','<br><div class="alert alert-success">Category Updated</div>');
    res.redirect('/backend/categories');
  });

});


router.get('/delete/:id',function(req,res,next){
  console.log(req.params.id);
  db.destroy('CategoryDoc',req.params.id).then((body) => {
   console.log(body);
   });
  req.flash('alert','<br><div class="alert alert-danger">Category Deleted</div>');
  res.redirect('/backend/categories');
});


module.exports = router;
