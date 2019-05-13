let express = require('express')
 , router  = express.Router()
 , nano    = require('nano')('http://admin:password@localhost:5984')
 , db      = nano.db.use('food-ordering-app')
 , date    = require('date-and-time')
 , uuidv1 = require('uuid/v1');

 /* -------- Backend Dashboard  ------- */
router.get('/', function(req, res, next) {
  if(req.session.isBackendUserLoggedIn == false){
    res.redirect('/login/backend');
  }else{
    res.render('backend/index', { title:'Admin Dashboard' });
  }
});


/* -------- Backend QRCodes  ------- */
router.get('/qrcodes',function(req, res, next){
  res.render('backend/qrcodes', { title:'Admin Table QR Codes' });
});


module.exports = router;
