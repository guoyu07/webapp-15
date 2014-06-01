var request = require('supertest');
var helper = require('../helper');
var db = require('../../server/models');

describe('GET /api/hosts', function () {

    it('should return 200', function (done) {
        request(helper.url)
            .get('/api/hosts')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.have.property('hosts');
                res.body.hosts.length.should.be.above(0);
                res.body.hosts.forEach(function (host) {
                    host.isPending.should.be.false;
                });
                done();
            });
    });

    it('should ignore pendingOnly parameter if not an admin', function (done) {
        request(helper.url)
            .get('/api/hosts?pendingOnly=true')
            .set('cookie', helper.authCookie)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.hosts.length.should.be.above(0);
                res.body.hosts.forEach(function (host) {
                    host.isPending.should.be.false;
                });
                done();
            });
    });

    it('should return only pending hosts', function (done) {
        // Create a pending host
        var host = helper.host;
        host.isPending = true;
        db.Host.create(host).then(function (host) {
            // Login as an admin
            return helper.login(true);
        }).then(function () {
            request(helper.url)
                .get('/api/hosts?pendingOnly=true')
                .set('cookie', helper.authCookie)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    res.body.hosts.length.should.be.greaterThan(0);
                    res.body.hosts.forEach(function (host) {
                        host.isPending.should.be.true;
                    });
                    done();
                });
        });
    });
});

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