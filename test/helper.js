/**
 * Mocha test helper.
 */
var request = require('supertest');
var url = exports.url = 'http://localhost:3333';

/**
 * Logs user in and set the authentication cookie.
 */
exports.login = function login(done) {
    request(url)
        .post('/login')
        .send({ username: 'host@foo.com', password: 'plop' })
        .end(function (err, res) {
            res.should.have.status(200);
            exports.authCookie = res.headers['set-cookie'];
            done();
        });
};