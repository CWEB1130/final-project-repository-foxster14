var express = require('express');
var router = express.Router();
var fs = require('fs');
var mysql = require('mysql')
var user = require('../model/userstructure.js');
var connection = mysql.createConnection({
    host: '192.168.56.102',
    user: 'foxsarh',
    password: '123',
    database: 'users'
  })

  router.post('/', function(req, res, next) {

    let userPassword = req.body.password;
    var passwordLength = userPassword.length;

    if (passwordLength >= 8){

        var email = req.body.email; 
        user.email = req.body.email;
        var password = req.body.password;
        user.password = req.body.password;

        console.log(email + password);

        connection.connect()

        connection.query("INSERT INTO account_info (email, password) VALUES ('" + String(email) + "','" + String(password) + "')", 
        function (err, rows, fields) {
        if (err) throw err

        //console.log('The solution is: ', rows[0].solution)
        })

        connection.end()

        let userData = fs.readFileSync('./users.json');
        console.log(userData);
        let siteUsers = JSON.parse(userData);
        siteUsers.push(user); //update user object so I can display new info on next page
        //Write new user data to JSON file
        const usersString = JSON.stringify(siteUsers)
        fs.writeFile('./users.json', usersString, err => {
            //error handling if, issue arises with file, else output to successfully wrote file
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })


        res.render('addeduser', user);

    }

    else {
      res.redirect(req.get('referer'));
      //will add extra error page view if time permits
      console.log("error with password length")
  }
 
    //var connection = mysql.createConnection(connect);


});
  
module.exports = router;