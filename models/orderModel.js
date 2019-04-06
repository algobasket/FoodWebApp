var nano       = require('nano')('http://admin:password@localhost:5984');
var db         = nano.db.use('food-ordering-app');