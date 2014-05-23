/**
 * API controller for Memberships.
 */
var db = require('../models');

exports.index = function (req, res) {

    // Extract query params
    var userIdCondition = req.user.isAdmin ? null : { userId: req.user.id };

    // Find memberships
    db.Membership
        .findAndCountAll({
            where: userIdCondition
        }).success(function (memberships) {
            res.send({
                memberships: memberships.rows,
                meta: {
                    //offset: offset,
                    //limit: limit,
                    total: memberships.count
                }
            });
        }).error(function (error) {
            res.send(500);
        });
};