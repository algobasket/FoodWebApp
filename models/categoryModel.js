var nano  = require('nano')('http://admin:password@localhost:5984');
var db    = nano.db.use('food-ordering-app');


// Get All Categories

 module.exports.getAllCategories = async (req, res, next) => {
  try {

    db.view('CategoryDoc', 'Category', {}, function(err, body) {
          if (err) console.log(err);

            return res.json(body.rows)
        });

  } catch (error) {
    return next(error) 
  }
}



// Get All Products

module.exports.getAllProducts = async (req, res, next) => {
  try {

      db.view('ItemDoc', 'Item', {}, function(err, body) {
          if (err) console.log(err);

            return res.json(body)
        });

  } catch (error) {
    return next(error)
  }
}




 





