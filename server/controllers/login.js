/**
 * Created by guillaumez on 3/28/14.
 */
var db = require('../models');

exports.successCallback = function (req, res) {

    // Get connected user
    var connectedUser = req.user;

    // Data validation
    if (!connectedUser) {
        res.send(500)
    }

    // Find the token of the connected user
    db.Token.find({
        where: { id: connectedUser.id }
    }).success(function (token) {

        // Data validation
        if (!token) {
            res.send(500)
        }

        // Send back the token/user to the client
        res.send({
            token: token.token,
            user: connectedUser
        });
    })
};