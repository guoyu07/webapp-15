import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
    modulePrefix: 'webapp',
    Resolver: Resolver
});

loadInitializers(App, 'webapp');

export default App;


Ember.Handlebars.registerBoundHelper('substr', function(value, options) {

    var opts = options.hash;

    var start = opts.start || 0;
    var len = opts.max;

    var out = value.substr(start, len);

    if (value.length > len)
        out += '...';

    return new Handlebars.SafeString(out);
});