var login = require('./controllers/login');
var hosts = require('./controllers/hosts');
var photos = require('./controllers/photos');
var departements = require('./controllers/departements');
var wwoofers = require('./controllers/wwoofers');
var countries = require('./controllers/countries');

module.exports = function(app) {

  app.post('/login', login.authenticate);

  app.get('/api/1/hosts', hosts.index);
  app.get('/api/1/hosts/:id', hosts.single);
  app.put('/api/1/hosts/:id', hosts.update);

  app.get('/api/1/photos', photos.index);
  app.get('/api/1/photos/:id', photos.single);
  app.post('/api/1/photos', photos.create)

  app.get('/api/1/departements', departements.index);

  app.get('/api/1/countries', countries.index);

  app.get('/api/1/wwoofers', wwoofers.index);
  app.get('/api/1/wwoofers/:id', wwoofers.single);
};
