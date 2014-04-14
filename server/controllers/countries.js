/**
 * API controller for Countries.
 */

var db = require('../models');

exports.index = function (req, res) {
    db.Country
        .findAll()
        .success(function (countries) {
            res.send({
                countries: countries
            });
        });
};

exports.single = function (req, res) {
    db.Country
        .find({id: req.params.id})
        .success(function (country) {
            res.send({
                country: country
            });
        })
};
