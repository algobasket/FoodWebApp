var nano       = require('nano')('http://admin:password@localhost:5984');
var db         = nano.db.use('food-ordering-app');


// ***** Secured Backend Login Auth ******

exports.loginUser = async(req,res,next) => {
   try{
      if(req.body.email && req.body.password){
    const q = {
    selector: {
         userEmail: { "$eq": req.body.email },
         userPass: { "$eq": req.body.password }
      },
       fields: [ "userEmail", "userPass", "userRole", "userStatus" ],
       limit:1
     };

    db.find(q).then((body) => {
        console.log(body);
       if(body.docs.length == 1){
           body.docs.forEach((row) => {
          if(row.userEmail){
            req.session.backendUserEmail  = row.userEmail;
            req.session.backendUserRole   = row.userRole;
            req.session.backendUserStatus = row.userStatus;
            req.session.isBackendUserLoggedIn = true;
            req.flash('alert',"Login Successful");
            res.redirect('/backend');
           }
          });
       }else{
            req.flash('alert','<div class="alert alert-danger">Invalid Credentials</div>');
            res.redirect('/login/backend');
       }
     });

   };
   }catch(err){
     return next(err)
   }
}
