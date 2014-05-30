var request = require('supertest');
var helper = require('../helper');
var db = require('../../server/models');


describe('POST /api/hosts/:id', function () {

    it('should return 409 if user already has a host', function (done) {
        var host = helper.host;
        host.userId = helper.user.id;
        db.Host.create(host).then(function (host) {
            request(helper.url)
                .post('/api/hosts')
                .set('cookie', helper.authCookie)
                .send({ host: {} })
                .expect(409)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });

    it('should create a host', function (done) {
        var host = helper.host;
        host.userId = helper.user.id;
        request(helper.url)
            .post('/api/hosts')
            .set('cookie', helper.authCookie)
            .send({ host: host })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.have.property('host');
                res.body.host.userId.should.equal(helper.user.id);
                done();
            });
    });

    it('should create a pending host', function (done) {
        var host = helper.host;
        host.userId = helper.user.id;
        host.isPending = false;
        request(helper.url)
            .post('/api/hosts')
            .set('cookie', helper.authCookie)
            .send({ host: host })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.have.property('host');
                res.body.host.isPending.should.equal(true);
                done();
            });
    });
});