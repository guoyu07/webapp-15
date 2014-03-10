var hosts = require('./controllers/hosts');
var photos = require('./controllers/photos');
var departements = require('./controllers/departements');

module.exports = function(app) {
  app.get('/api/1/hosts', hosts.index);
  app.get('/api/1/hosts/:id', hosts.single);
  app.put('/api/1/hosts/:id', hosts.update);

  app.get('/api/1/photos', photos.index);
  app.get('/api/1/photos/:id', photos.single);
  app.post('/api/1/photos', photos.create)

  app.get('/api/1/departements', departements.index);
};
