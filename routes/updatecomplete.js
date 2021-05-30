var express = require('express');
var router = express.Router();
var fs = require('fs');

function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err)
        }
        try {
            const object = JSON.parse(fileData)
            return cb && cb(null, object)
        } catch(err) {
            return cb && cb(err)
        }
    })
}


router.post('/', function(req, res, next) {

    //testing
    console.log(req.body.changing_attr);
    console.log(req.body.new_value);
    console.log(req.body.email);
    var updatedUser;


    var userRecords = jsonReader('./users.json', (err, originalUser) => {
        if (err) {
            console.log('Error reading file:',err)
            return
        }

   for(var x=0; x < originalUser.length; x++){
        if (originalUser[x].email == req.body.email){
                if (req.body.changing_attr == "email"){
                    originalUser[x].email = req.body.new_value
                }
                if (req.body.changing_attr == "password"){
                    originalUser[x].password = req.body.new_value
                }
                updatedUser = originalUser[x];
                //x = originalUser.length;          
        }
    }
    
    //outputting boxer to console to verify that boxer was created.
    console.log(updatedUser);
    //Render the new boxer object to display view
    res.render('updatecomplete', updatedUser);

    
    fs.writeFileSync('./users.json', JSON.stringify(originalUser), (err) => {
            if (err) console.log('Error writing file:', err)
        })
    })

  });

module.exports = router;