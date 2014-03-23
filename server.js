var express = require('express'),
    path = require('path'),
    http = require('http'),
    app = express(),
    db = require('./server/models'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

// Configure express app
app.set('port', process.env.PORT || 3333);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'thisisnotasecretyet' }));
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

// Development only
app.configure('development', function(){
    app.use(express.errorHandler());
})

// Add all REST API routes
require('./server/routes')(app);

// Delegate all of the routes we haven't set to the Ember App
app.get('/app/#*', function (request, response) {
    console.log(request.query);
    return response.sendfile('./public/index.html');
});

// Configure authentication middleware
passport.use(new LocalStrategy(
    function (username, password, done) {
        db.User.find({
            where: {username: username}
        }).on('success', function (user) {
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.password == password) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                console.log('User authenticated');
                return done(null, user);
            })
    }
));
passport.serializeUser(function (user, done) {
    console.log('Serializing user...');
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    db.User.find({
        where: {id: id}
    }).on('success', function (user) {
            done(null, user);
        })
});

// Init Sequelize and start server
db
    .sequelize
    .sync({ force: false })
    .complete(function (err) {
        if (err) {
            throw err
        } else {
            http.createServer(app).listen(app.get('port'), function () {
                console.log('Express server listening on port ' + app.get('port'))
            })
        }
    });