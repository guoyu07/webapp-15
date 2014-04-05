var passport = require('passport');
var login = require('./controllers/login');
var users = require('./controllers/users');
var hosts = require('./controllers/hosts');
var photos = require('./controllers/photos');
var departements = require('./controllers/departements');
var wwoofers = require('./controllers/wwoofers');
var countries = require('./controllers/countries');

module.exports = function (app) {

    app.post('/api/request_token', passport.authenticate('local', { session: false }), login.successCallback);

    app.post('/api/sign_up', users.signUp);

    app.get('/api/hosts', hosts.index);
    app.get('/api/hosts/:id', hosts.single);
    app.put('/api/hosts/:id', passport.authenticate('bearer', { session: false }), hosts.update);

    app.get('/api/photos', photos.index);
    app.get('/api/photos/:id', photos.single);
    app.post('/api/photos', photos.create);

    app.get('/api/departements', departements.index);

    app.get('/api/countries', countries.index);

    app.get('/api/wwoofers', passport.authenticate('bearer', { session: false }), wwoofers.index);
    app.get('/api/wwoofers/:id', passport.authenticate('bearer', { session: false }), wwoofers.single);
};
