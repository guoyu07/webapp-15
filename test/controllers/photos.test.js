var request = require('supertest');
var helper = require('../helper');
var db = require('../../server/models');

describe('GET /api/photos/:id', function () {

    it('should return a single photo', function (done) {
        request(helper.url)
            .get('/api/photos/1')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.have.property('photo');
                res.body.photo.should.have.property('id');
                res.body.photo.id.should.equal(1);
                done();
            });
    });

    it('should return 404 if id not valid', function (done) {
        request(helper.url)
            .get('/api/photos/not-valid')
            .expect(404)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
});

describe('PUT /api/photos/:id', function () {

    it('should return 404 if id not valid', function (done) {
        request(helper.url)
            .put('/api/photos/not-valid')
            .set('cookie', helper.authCookie)
            .send({ photo: {} })
            .expect(404)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('should return 404 if photo belongs to another user', function (done) {
        request(helper.url)
            .put('/api/photos/1')
            .set('cookie', helper.authCookie)
            .send({ photo: {} })
            .expect(404)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('should return 200 if photo was updated', function (done) {
        var host = helper.host;
        host.userId = helper.user.id;
        db.Host.create(host).then(function (host) {
            var photo = helper.photo;
            photo.hostId = host.id;
            return db.Photo.create(photo);
        }).then(function (photo) {
            request(helper.url)
                .put('/api/photos/' + photo.id)
                .set('cookie', helper.authCookie)
                .send({ photo: {} })
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });

    it('should update caption', function (done) {

        var host = helper.host;
        host.userId = helper.user.id;
        db.Host.create(host).then(function (host) {
            var photo = helper.photo;
            photo.hostId = host.id;
            return db.Photo.create(photo);
        }).then(function (photo) {
            photo.caption.should.equal('foo');
            request(helper.url)
                .put('/api/photos/' + photo.id)
                .set('cookie', helper.authCookie)
                .send({ photo: { caption: 'bar' } })
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    res.body.should.have.property('photo');
                    res.body.photo.caption.should.equal('bar');
                    done();
                });
        });
    });
});