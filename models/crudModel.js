let db = require('../config');

model.create = async (req, res, next) => {
  try {

     db.insert(req.body, function(err, body){
       if(!err){
         return res.json(body)
       }
     });

  } catch (error) {
    return next(error)
  }
}

model.read = async (req, res, next) => {
  try {

   var id = req.params.id ? req.params.id :0;

      db.view(req.design,req.doc, {}, function(err, body) {
          if (err) console.log(err);

            return res.json(body)
        });

  } catch (error) {
    return next(error)
  }
}

model.update = async (req, res, next) => {
  try {

   var id = req.params.id ? req.params.id :0;

      db.view('AllUsers', 'Users', {}, function(err, body) {
          if (err) console.log(err);

            return res.json(body)
        });

  } catch (error) {
    return next(error)
  }
}

model.delete = async (req, res, next) => {
  try {

   var id = req.params.id ? req.params.id :0;

      db.view('AllUsers', 'Users', {}, function(err, body) {
          if (err) console.log(err);

            return res.json(body)
        });

  } catch (error) {
    return next(error)
  }
}

exports.crudModel = model;
