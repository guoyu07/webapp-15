/**
 * Login controller.
 */
var passport = require('passport');

exports.authenticate = passport.authenticate('local', {
    successRedirect: '/#/foo',
    failureRedirect: '/#/login',
    failureFlash: false
});
