

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');

// set our port
var port = process.env.PORT || 3000;

// set up mongoose, assume locally installed
var mongoose   = require('mongoose');
mongoose.connect('mongodb://chsdrinks:charlestonbeer@ds155961.mlab.com:55961/chsdrinks');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// set the static files location for our Ember application
app.use(express.static(__dirname + '/public'));

// //bodyParser Middleware to allow different encoding requests
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());       // to support JSON-encoded bodies


//Routes API
var router = express.Router();
app.use('/', router);
require('./app/routes')(router); // configure our routes

// startup our app at http://localhost:3000
app.listen(port);


// expose app
exports = module.exports = app;