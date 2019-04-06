//------ Connecting CouchDB ---------
let username = 'admin'
   ,password = 'password'
   ,dbname   = 'food-ordering-app'
   ,nano     = require('nano')('http://'+username+':'+password+'@localhost:5984')
   , db      = nano.db.use(dbname);
