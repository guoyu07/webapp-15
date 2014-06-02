/**
 * API controller for Users.
 */
var db = require('../models');
var crypto = require('crypto');
var updatableAttributes = ['firstName', 'lastName', 'birthDate', 'email'];

/**
 * Searches and returns a list of users.
 */
exports.index = function (req, res) {

    // Extract query params
    var limit = isNaN(parseInt(req.query.limit)) ? 20 : parseInt(req.query.limit);
    var offset = isNaN(parseInt(req.query.offset)) ? 0 : parseInt(req.query.offset);

    // Find all hosts matching parameters
    db.User.findAll({
        limit: limit,
        offset: offset,
        include: [
            { model: db.Wwoofer },
            { model: db.Host }
        ]
    }).success(function (users) {

        // Count total hosts
        db.User.count({
            // where: where
        }).on('success', function (count) {
            res.send({
                users: users,
                meta: {
                    offset: offset,
                    limit: limit,
                    total: count
                }
            });
        })
    });
};

/**
 * Searches and returns a single user.
 */
exports.single = function (req, res) {
    db.User.find({
        where: {id: req.params.id}
    }).success(function (user) {
        // Not found
        if (!user)
            res.send(404);

        // Unauthorized
        if (user.id != req.user.id)
            res.send(401);

        res.send({
            user: user
        });
    })
};

/**
 * Creates a new user and sends a confirmation email.
 * TODO: validate the strenght of the password and make sure that no one can sign up as an admin.
 */
exports.create = function (req, res) {

    // Make sure email address is not in use
    db.User.find({
        where: { email: req.body.user.email }
    }).success(function (user) {

        // Email address is already in use
        if (user) {
            res.send(409); // Conflict
        }

        // Create a hash of the password
        var passwordHash = crypto.createHash('sha1').update(req.body.user.password).digest("hex");

        // Create the user
        db.User.create({
            firstName: req.body.user.firstName,
            lastName: req.body.user.lastName,
            email: req.body.user.email,
            passwordHash: passwordHash
        }).success(function (user) {

            // Send email
            res.mailer.send('register', {
                to: user.email,
                subject: 'Welcome to Wwoof France!',
                firstName: user.firstName
            }, function (err) {
                if (err) {
                    console.log(err);
                    res.send(500);
                }
                res.send(201);
            });
        })
    })
};

exports.update = function (req, res) {

    // Make sure email address is not in use
    db.User.count({
        where: {
            email: req.body.user.email,
            id: { ne: req.user.id }
        }
    }).success(function (count) {

        // Email address is already in use
        if (count > 0) {
            res.send(409); // Conflict
        }

        // Find the original user
        db.User.find({
            where: {
                id: req.user.id
            }
        }).success(function (user) {
            if (user) {
                // Update the user
                user.updateAttributes(
                    req.body.user,
                    updatableAttributes
                ).success(function (user) {
                        res.send({ user: user });
                    }).error(function (error) {
                        res.send(500, error);
                    })
            } else {
                res.send(404);
            }
        }).error(function (error) {
            res.send(500, error);
        });
    })
};