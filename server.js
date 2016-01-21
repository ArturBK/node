var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var Bear     = require('../app/models/bear');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongoose   = require('mongoose');
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database

var port = process.env.PORT || 8080;
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/bears')
    console.log('1');

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
            console.log('2');

        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)
            console.log('3');

        // save the bear and check for errors
        bear.save(function(err) {
		            console.log(err);

            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });
        
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);