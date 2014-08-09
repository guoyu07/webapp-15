import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

Ember.MODEL_FACTORY_INJECTIONS = true;

Ember.ENV.I18N_COMPILE_WITHOUT_HANDLEBARS = true;

var App = Ember.Application.extend({
    modulePrefix: 'webapp',
    Resolver: Resolver
});

loadInitializers(App, 'webapp');

export default App;
