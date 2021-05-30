var express = require('express');
var router = express.Router();
var unirest = require("unirest");

/* GET home page. */
router.post('/', function(req, res, next) {

    var searchQuery = req.body.searchquery;
    console.log(searchQuery);

    //This requests the API data
    var request = unirest("GET", "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/quickAnswer");
     
    request.query({
        "q": searchQuery
    });
    
    request.headers({
        "x-rapidapi-key": "3d87e098eamshea86d0e44071171p12fd88jsnf0328fc90a82",
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "useQueryString": true
    });
    
    
    request.end(function (response) {
        if (response.error) throw new Error(response.error);
        
        var data = response.body;
        console.log(response.body);
        console.log(data);
        console.log(data.answer);
        res.render('viewrecipe', {data});
    });
    
    
    //res.render('viewrecipe', { });
});

module.exports = router;