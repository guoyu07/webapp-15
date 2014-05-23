var request = require('supertest');
var helper = require('../helper');

describe('GET /api/memberships', function () {

    before(function (done) {
        helper.login(done);
    });

    it('should return 401 if not authenticated', function (done) {
        request(helper.url)
            .get('/api/memberships')
            .end(function (err, res) {
                if (err) return done(err);
                res.should.have.status(401);
                done();
            });
    });
    it('should return 200 if authenticated', function (done) {
        request(helper.url)
            .get('/api/memberships')
            .set('cookie', helper.authCookie)
            .end(function (err, res) {
                if (err) return done(err);
                res.should.have.status(200);
                done();
            });
    });
});