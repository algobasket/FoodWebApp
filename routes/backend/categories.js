let express = require('express')
 , router   = express.Router()
 , nano     = require('nano')('http://admin:password@localhost:5984')
 , db       = nano.db.use('food-ordering-app')
 , date     = require('date-and-time')
 , uuidv1   = require('uuid/v1');



 /* -----Backend Categories ------------ */
router.get('/backendCategories',function(req, res, next){

   //   db.get('_design/CategoryDoc/_view/Category',function(err,body){
   //     if(err){
   //       res.send(err);
   //     }
   //     // var data = {
   //     //   section : 'list',
   //     //   alert : req.flash('alert'),
   //     //   categories : body.rows
   //     // };
   //     var data = {};
   //     console.log(body);
   //     // data.forEach(function(x){
   //     //   console.log(x);
   //     // });

   //     //res.render('backend/categories',data);
   // });
  //res.render('backend/categories',data);
  res.send("ok");
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
  db.get('_design/all_categories/_view/categories',{ key : req.params.id },function(err,body){
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


router.post('/categories/edit/',function(req,res,next){

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


router.delete('/categories/delete/:id',function(req,res,next){
  db.delete('Category',{ key : req.params.id });
});


module.exports = router;
