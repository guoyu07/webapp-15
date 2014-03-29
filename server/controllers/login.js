/**
 * Created by guillaumez on 3/28/14.
 */
var jwt = require('jwt-simple');
var config = require('../../wwoof-config');
var moment = require('moment');

exports.successCallback = function (req, res) {

    // Generate token
    var now = new Date();
    var payload = {
        userId: req.user.id,
        expirationDate: now.setHours(now.getHours() + 1)
    };
    var token = jwt.encode(payload, config.secret);

    console.log('Authenticated user: ' + req.user.username);
    console.log('Token expires: ' + moment(payload.expirationDate).format('MMMM Do YYYY, h:mm:ss a'));

    // Return the JSON Web Token to the client
    res.send({
        token: token
    });
}