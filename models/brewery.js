var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BrewerySchema = new Schema({

    name: String,
    address: String
});

module.exports = mongoose.model('Brewery', BrewerySchema);