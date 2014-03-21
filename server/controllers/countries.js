/**
 * API controller for Countries.
 */

var db = require('../models');

exports.index = function(req, res){
    db.Country.findAll()
        .success(function(countries) {
            res.send({
                countries: countries
            });
        });
};