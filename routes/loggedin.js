var express = require('express');
const { Console } = require('console');
var router = express.Router();
var fs = require('fs');
var userData = require('../users.json');

router.post('/', function(req, res, next) {

    var emailUserEntered = req.body.email; // email user entered
    var passwordUserEntered = req.body.password; //password user entered

    console.log(emailUserEntered);
    console.log(passwordUserEntered);

    var isfound = false; //flag variable (once it finds something, you raise the flag to break the loop)
    for(var i = 0; i < userData.length; i++){

        console.log(userData[i].email);

        if(userData[i].email == emailUserEntered && userData[i].password == passwordUserEntered) {
            isfound = true;
            i = userData.length;
            res.render('loggedin', { email: emailUserEntered});
        }

    }

    if(isfound == false){
        res.redirect(req.get('referer')); //reload page
    }
    
});

module.exports = router;