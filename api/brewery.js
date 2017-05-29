var Brewery = require('../models/brewery');

module.exports.getAllBreweries = function(req, res) {
    var hours = parseInt(req.query.hour);

    // Pull the day form the request URL and turn it into string for querying open/close hours
    var dayOpen = `hours.${req.query.day}.open`;
    var dayClose = `hours.${req.query.day}.close`;
    var location = req.query.location;

    // Set query strings for open/close
    let queryOpen = {};
    let queryClose = {};
    let queryLocation = {'location':{ $ne: null }};

    if ((req.query.hour != 'all') && req.query.day) {
        queryOpen[dayOpen] = { $lte: hours };
        queryClose[dayClose] = { $gte: hours };
    } else if (req.query.day === 'any day') {
        queryOpen = {'hours': { $ne: null }};
        queryClose = {'hours': { $ne: null }};
    } else {
        queryOpen[dayOpen] = { $ne: null };
        queryClose[dayClose] = { $ne: null };
    }

    if (req.query.location != 'All Charleston') {
        queryLocation = {'location': location };
    }

    var query = {$and: [queryOpen,queryClose, queryLocation]};

    if (req.query.hour && req.query.day) {
        Brewery.find(query, function(err, breweries) {
            if (err) {
                res.send(err);
            }
            res.json({breweries: breweries});
        });
        return
    } else {
        Brewery.find(function(err, breweries) {
            if (err) {
                res.send(err);
            }
            res.json({breweries: breweries});
        });
        return
    }


};

// module.exports.getFilteredBreweries = function(req, res) {
//
//     // Pull the hours from the request URL
//     var hours = parseInt(req.params.id);
//
//     // Pull the day form the request URL and turn it into string for querying open/close hours
//     var dayOpen = `hours.${req.params.day}.open`;
//     var dayClose = `hours.${req.params.day}.close`;
//
//     // Set query strings for open/close
//     var queryOpen = {};
//     var queryClose = {};
//     queryOpen[dayOpen] = { $lt: hours };
//     queryClose[dayClose] = { $gt: hours };
//
//     Brewery.find({$and: [queryOpen,queryClose]}, function(err, breweries) {
//         res.json({breweries: breweries});
//     });
// };