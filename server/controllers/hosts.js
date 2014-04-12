/**
 * API controller for Hosts.
 */

var passport = require('passport');
var db = require('../models');

/**
 * Returns a paginated list of hosts.
 * This route can be accessed from non authenticated users, but returns additional data for members.
 */
exports.index = function (req, res) {

    // Manually call the authentication middleware
    passport.authenticate('bearer', { session: false }, function (err, user, info) {

        // Extract query params
        var limit = isNaN(parseInt(req.query.limit)) ? 20 : parseInt(req.query.limit),
            offset = isNaN(parseInt(req.query.offset)) ? 0 : parseInt(req.query.offset),
            dpt = (req.query.dpt || '') + '%',
            searchTerm = req.query.searchTerm || '',
            where = ["contact like ? and zipCode like ?", '%' + searchTerm + '%', dpt + '%'];

        // Find all hosts matching parameters
        db.Host.findAll({
            include: [
                { model: db.Photo, as: 'photos' }
            ],
            limit: limit,
            offset: offset,
            where: where
        }).success(function (hosts) {

                // Count total hosts
                db.Host.count({
                    where: where
                }).on('success', function (count) {
                        res.send({
                            hosts: hosts,
                            meta: {
                                offset: offset,
                                limit: limit,
                                total: count
                            }
                        });
                    })
            });
    })(req, res);
};

exports.single = function (req, res) {
    db.Host.find({
        include: [
            { model: db.Photo, as: 'photos' }
        ],
        where: {id: req.params.id}
    }).on('success', function (host) {
            res.send({
                host: host
            });
        })
};

exports.update = function (req, res) {
    db.Host.find({
        where: { id: req.params.id }
    }).on('success', function (host) {
            if (host) {
                host.updateAttributes({
                    farmName: req.body.host.farmName
                }).success(function (host) {
                        res.send({
                            host: host
                        });
                    });
            } else {
                res.send(404);
            }
        });
};