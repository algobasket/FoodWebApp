var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('backend/siteSettings', { title: 'Admin Dashboard' });
});

module.exports = router;