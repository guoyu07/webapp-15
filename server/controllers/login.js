/**
 * Created by guillaumez on 3/28/14.
 */
var db = require('../models');

exports.successCallback = function (req, res) {

    db.Token.find({
        where: { id: req.user.id }
    }).success(function (token) {
            if (!token) {
                res.send(500)
            }

            // Send back the JSON Web Token to the client
            res.send({
                token: token.token
            });
        })
}