/**
 * Created by guillaumez on 4/5/2014.
 */

var db = require('../models');
var nodemailer = require("nodemailer");
var crypto = require('crypto');

exports.signUp = function (req, res) {

    db.User.find({
        where: { username: req.user.username }
    }).success(function(user) {
        if (user) { res.send(409) } // Conflict - User already exists

        var passwordHash = crypto.createHash('sha1').update(req.user.password).digest("hex")

        db.User.create({
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            username: req.user.username,
            passwordHash: passwordHash
        }, ['username', 'passwordHash'])
            .success(function(task) {
            // you can now access the newly created task via the variable task
        })

        // Send back the JSON Web Token to the client
        res.send({
            token: token.token
        });
    })

    // create reusable transport method (opens pool of SMTP connections)
    var smtpTransport = nodemailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
            user: "foo@gmail.com",
            pass: "test"
        }
    });

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: "Guillaume Zurbach <guillaume.zurbach@gmail.com>",
        to: "foo@bar.com",
        subject: "Pouet",
        html: "<b>Hello world ✔</b>"
    }

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
        }

        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });
}