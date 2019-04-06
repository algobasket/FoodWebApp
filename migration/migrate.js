let db    = require('../config');
let uuidv1 = require('uuid/v1');

const documents = [
  {   _id      : uuidv1(),
      email    : "superadmin@algobasket.com",
      password : "12345",
      status   : 1
  },
  {   _id      : uuidv1(),
      email    : "admin@algobasket.com",
      password : "12345",
      status   : 1
  },
  {   _id      : uuidv1(),
      email    : "kitchen@algobasket.com",
      password : "12345",
      status   : 1
  },
  {   _id      : uuidv1(),
      email    : "staff@algobasket.com",
      password : "12345",
      status   : 1
  },
];
db.bulk({docs:documents}).then((body) => {
  console.log(body);
});
