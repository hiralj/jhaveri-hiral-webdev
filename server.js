var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

var nutritionix = require('nutritionix')({
    appId: '1ac2ae34',
    appKey: 'cc2652140ce138e579315e4b457170f0'
}, false);

app.get("/api/search/autocomplete/:food_prefix", autocomplete_food_item);
app.get("/api/search/food/:food", find_food);

function autocomplete_food_item(req, res) {
    var food_prefix = req.params.food_prefix;
    nutritionix
        .autocomplete({q: food_prefix})
        .then(
            function (response) {
                var result = [];
                for(var i in response) {
                    result.push(response[i].text);
                }
                res.send(result);
            }
        );
}

function find_food(req, res) {
    var food = req.params.food;
    nutritionix
        .search({
            q: food,
            limit: 10,
            search_nutrient: 'calories'
        })
        .then(
            function (response) {
                res.send(response.results);
            }
        );
}

// ensure you are passing a string with queries delimited by new lines.
// nutritionix
//     .natural(ingredients.join('\n'))
//     .then(
//         function (response) {
//             console.log(response);
//         }
//     );

// nutritionix
//     .autocomplete({ q: 'cheddar che' })
//     .then(
//         function (response) {
//             console.log(response);
//         }
//     );

// nutritionix
//     .search({
//         q: 'milk',
//         limit: 30,
//         search_nutrient: 'calories'
//     })
//     .then(
//         function(items) {
//             console.log(items.results.length);
//             for(var i in items.results) {
//                 console.log("Item name: ", items.results[i]);
//             }
//         }
//     );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(cookieParser());
// app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(session({
    secret: "This is secret code",
    resave: true,
    saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// require ("./test/app.js")(app);
require("./assignment/app.js")(app);
require("./project/app.js")(app);

var ipaddress = process.env.IP;
var port = process.env.PORT || 3000;

app.listen(port, ipaddress);
