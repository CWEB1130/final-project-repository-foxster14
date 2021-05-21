var express = require('express');
var router = express.Router();
var unirest = require("unirest");

/* GET home page. */
router.get('/', function(req, res, next) {

    //This requests the API data
    var request = unirest("GET", "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/quickAnswer");
     
    request.query({
        "q": "How much vitamin c is in 2 apples?"
    });
    
    request.headers({
        "x-rapidapi-key": "3d87e098eamshea86d0e44071171p12fd88jsnf0328fc90a82",
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "useQueryString": true
    });
    
    
    request.end(function (response) {
        if (response.error) throw new Error(response.error);
        
        var data = JSON.parse(response.body);
        res.render('viewrecipe', {data});
    });
    
    
    //res.render('viewrecipe', { });
});

module.exports = router;