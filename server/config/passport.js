var LocalStrategy = require('passport-local').Strategy,
    BearerStrategy = require('passport-http-bearer').Strategy,
    db = require('../../server/models'),
    crypto = require('crypto'),
    config = require('../../config'),
    moment = require('moment'),
    jwt = require('jwt-simple');

module.exports = function (passport) {

    // Configure authentication middleware
    passport.use(new LocalStrategy(
        function (username, password, done) {

            console.log('Authenticating user \'' + username + '\'');

            // Process the hash of the password
            var passwordHash = crypto.createHash('sha1').update(password).digest("hex");

            db.User.find({
                where: { email: username }
            }).success(function (user) {
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (user.passwordHash !== passwordHash) {
                    return done(null, false, { message: 'Incorrect password.' });
                }

                db.Token
                    .findOrCreate({id: user.id}, {id: user.id})
                    .success(function (token) {

                        // Generate the token if not present
                        if (!token.token) {
                            var payload = {
                                userId: user.id
                            };
                            token.token = jwt.encode(payload, config.jwt_secret);
                        }

                        // Set the token expiration date (one hour from now)
                        var now = new Date();
                        token.expireAt = now.setHours(now.getHours() + 1);

                        // Save the token
                        token
                            .save()
                            .success(function () {
                                console.log('Authenticated user: ' + user.email);
                                console.log('Token expires: ' + moment(token.expireAt).format('MMMM Do YYYY, h:mm:ss a'));
                                return done(null, user);
                            })
                    })
            })
        }
    ));
    passport.use(new BearerStrategy(
        function (token, done) {

            console.log('Validating user token...');

            db.Token.find({
                where: { token: token }
            }).success(function (dbToken) {

                // Failed authentication if token was not found
                if (!dbToken)
                    return done(null, false);

                // Decode token
                var decodedToken = jwt.decode(token, config.jwt_secret);

                // Make sure the user id in the JWT token matches the id of the token
                if (!decodedToken || !decodedToken.userId || (decodedToken.userId != dbToken.id))
                    return done(null, false);

                // Check whether the token is expired
                var now = new Date();
                if (dbToken.expireAt < now)
                    return done(null, false);

                // Delay the token expiration date to be in 1 hour from now
                dbToken.expireAt = now.setHours(now.getHours() + 1);
                console.log('Token expires: ' + moment(dbToken.expireAt).format('MMMM Do YYYY, h:mm:ss a'));

                // Save the token
                dbToken.save()
                    .success(function () {

                        // Find the user in the DB
                        db.User
                            .find(dbToken.id)
                            .success(function (user) {
                                return done(null, user);
                            })
                            .error(function (err) {
                                return done(null, false);
                            });

                    }).error(function (err) {
                        return done(null, false);
                    });
            })
        }
    ));
};
