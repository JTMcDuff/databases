var db = require('../db/index.js');

var dbConnect = db.dbConnection;


module.exports = {
  messages: {  //get produces all messages currently on DB.
               // SELECT * from messages.
    get: function () {
      return new Promise ( (resolve, reject) => {
        dbConnect.query('SELECT * from messages', (err, results) => {
          if (err) {
           reject(err);
          }
         resolve(results)
         })
      })
      .then( results => {
        console.log("RESULTS: ", results);
        dbConnect.end();
     })
      .catch( err => {
        console.log(err);
        dbConnect.end();
      })

    },
    post: function () {

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};
