import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

// Disable caching to fix IE-related bugs
Ember.$.ajaxSetup({ cache: false });

// Scroll to the current anchor (if any)
setTimeout(function() {
  let hash = window.location.hash;
  if (hash) {
    let element = Ember.$(hash);
    if (element) {
      let top = element.offset().top - 60;
      Ember.$('html, body').scrollTop(top);
    }
  }
}, 1500);

loadInitializers(App, config.modulePrefix);

export default App;
