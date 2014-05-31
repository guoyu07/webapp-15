/**
 * Mocha test helper.
 */
var request = require('supertest');
var url = exports.url = 'http://localhost:3333';
var db = require('../server/models');

/**
 * Logs user in and set the authentication cookie.
 */
login = exports.login = function login(done) {

    // Create a random user
    var email = Math.random().toString(36).substr(2, 5) + '@test.com';
    db.User.create({
        firstName: "Test",
        lastName: "User",
        email: email,
        passwordHash: '64faf5d0b1dc311fd0f94af64f6c296a03045571',
        isAdmin: false
    }).then(function (user) {
        request(url)
            .post('/login')
            .send({ username: email, password: 'plop' })
            .end(function (err, res) {
                res.should.have.status(200);
                exports.authCookie = res.headers['set-cookie'];
                exports.user = user;
                done();
            });
    });
};

/**
 * Mocha hooks.
 */
before(function (done) {
    db.sequelize.options.logging = false;
    done();
});
after(function (done) {
    db.sequelize.options.logging = console.log;
    done();
});
beforeEach(function (done) {
    login(done);
});

/**
 * Sample data.
 */
exports.host = {
    farmName: 'Test Farm',
    shortDescription: 'Short description of the farm',
    fullDescription: 'Full description of the farm',
    isPending: false,
    isSuspended: false
    // userId: helper.user.id
};
exports.photo = {
    fileName: 'test.jpg',
    // hostId: host.id,
    caption: 'foo'
};