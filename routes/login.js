var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Customer Login' });
});

router.get('/facebook', function(req, res, next) {
  res.render('index', { title: 'Facebook Login' });
});

router.get('/google', function(req, res, next) {
  res.render('index', { title: 'Google Login' });
});

router.get('/admin', function(req, res, next) {
  res.render('index', { title: 'Admin Login' });
});

module.exports = router;