var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Model scanner
router.get('/scanner',function(res, req, next){
  res.render('scanQRCode',{ title: 'Express' });
});

module.exports = router;
