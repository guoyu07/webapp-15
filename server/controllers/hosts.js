/**
 * API controller for Hosts.
 */

var passport = require('passport');
var db = require('../models');
var Sequelize = require('sequelize');

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
            dptCondition = req.query.dpt ? { 'address.departmentId': req.query.dpt } : null,
            searchTerm = req.query.searchTerm || '';

        // Find all hosts matching parameters
        db.Host.findAndCountAll({
            include: [
                //{ model: db.Photo, as: 'photos' },
                { model: db.User, as: 'user' },
                { model: db.Address, as: 'address' }
            ],
            limit: limit,
            offset: offset,
            where: Sequelize.and(
                Sequelize.or(
                    ["user.firstName like ?", '%' + searchTerm + '%'],
                    ["user.lastName like ?", '%' + searchTerm + '%']
                ),
                dptCondition
            )
        }).success(function (hosts) {
            res.send({
                hosts: hosts.rows,
                meta: {
                    offset: offset,
                    limit: limit,
                    total: hosts.count
                }
            });
        });
    })(req, res);
};

exports.single = function (req, res) {
    db.Host
        .find({
            include: [
                { model: db.Photo, as: 'photos' },
                { model: db.User, as: 'user' },
                { model: db.Address, as: 'address' }
            ],
            where: {id: req.params.id}
        })
        .success(function (host) {
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