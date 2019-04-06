var nano  = require('nano')('http://admin:password@localhost:5984');
var db    = nano.db.use('food-ordering-app');


// Get All User

userModel.getAllUser = async (req, res, next) => {
  try {

   var id = req.params.id ? req.params.id :0;

      db.view('UserDoc', 'User', {}, function(err, body) {
          if (err) console.log(err);

            return res.json(body)
        });

  } catch (error) {
    return next(error)
  }
}


// Get Single User Info

userModel.getOneUser = async (req, res, next) => {
  try {

   var id = req.params.id ? req.params.id :0;

      db.view('UserDoc', 'User', { key:id }, function(err, body) {
          if (err) console.log(err);

            return res.json(body)
        });

  } catch (error) {
    return next(error)
  }
}

// Create User Account

userModel.createUser = async (req, res, next) => {
  try {

     var User = {
     	_id : uuidv1(),
     	userEmail : req.body.email,
     	userPass  : req.body.password,
     	userRole  : req.body.role,
     	userCreated : date.format(new Date(), 'DD-MM-YYYY'),
        userUpdated : date.format(new Date(), 'DD-MM-YYYY'),
        userStatus : req.body.status
     } 

      db.insert(User,User._id, function(err, body) {
          if (err) console.log(err);

            return res.json(body)
        });

  } catch (error) {
    return next(error)
  }
}

// Update User Info

userModel.editUser = async (req, res, next) => {
   try{
      db.update = function(obj, key, callback) {
    var db = this;
    db.get(key, function (error, existing) {
        if(!error) obj._rev = existing._rev;
        db.insert(obj, key, callback);
    });
  }
  var data = {
        userEmail : req.body.email,
     	userRole  : req.body.role,
        userUpdated : date.format(new Date(), 'DD-MM-YYYY'),
        userStatus : req.body.status
  }
  db.update(data,req.body.id, function(err, res) {
    if (err) return console.log('No update!');
    req.flash('alert','<br><div class="alert alert-success">Category Updated</div>');
    res.redirect('/backend/categories');
  });

   }catch(err){
     return next(err);
   }
}


//Delete or Remove User Account

userModel.deleteUser = async (req, res, next) => {
  try {

   db.get(req.params.id).then((body) => {
    db.destroy(req.params.id,body._rev).then((body) => {
       return true;
    });
  });

  } catch (error) {
    return next(error)
  }
}



module.exports = userModel;
