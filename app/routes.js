var breweries = require('../api/brewery');
module.exports = function(router) {

    router.route('/breweries').get(function(req,res) { breweries.getAllBreweries(req,res) });
    // router.route('/breweries?:day=:id').get(function(req,res) { breweries.getFilteredBreweries(req,res) });
    // router.route('*').get(function(req, res) {
    //     res.sendfile('./public/index.html'); // load our public/index.html file
    //
    // });
};