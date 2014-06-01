/**
 * Mocha test helper.
 */
var request = require('supertest-as-promised');
var url = exports.url = 'http://localhost:3333';
var db = require('../server/models');

/**
 * Logs user in and set the authentication cookie.
 */
login = exports.login = function login(isAdmin) {

    // Create a random user
    var email = Math.random().toString(36).substr(2, 5) + '@test.com';
    return db.User.create({
        firstName: "Test",
        lastName: "User",
        email: email,
        passwordHash: '64faf5d0b1dc311fd0f94af64f6c296a03045571',
        isAdmin: isAdmin
    }).then(function (user) {
        // Set the test user
        exports.user = user;
        return request(url)
            .post('/login')
            .send({ username: email, password: 'plop' })
            .expect(200);
    }).then(function (res) {
        // Set the auth cookie and exit
        return exports.authCookie = res.headers['set-cookie'];
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
    login(false).then(function () {
        done();
    });
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