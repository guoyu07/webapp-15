var express = require('express'),
    path    = require('path'),
    http    = require('http'),
    app     = express(),
    db      = require('./server/models');

app.set('port', process.env.PORT || 3333);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(__dirname + '/public'));

if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

// Add all REST API routes
require('./server/routes')(app);

// Delegate all of the routes we haven't set to the Ember App
app.get('#*', function(request, response) {
  console.log(request.query);
  return response.sendfile('./public/index.html');
});

// Init Sequelize and start server
db
  .sequelize
  .sync({ force: false })
  .complete(function(err) {
    if (err) {
      throw err
    } else {
      http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'))
      })
    }
  });