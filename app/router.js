import Ember from 'ember';
import config from './config/environment';
import GooglePageviewMixin from './mixins/google-pageview';

const Router = Ember.Router.extend(GooglePageviewMixin, {
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('reset-password');
  this.route('hosts', function() {
    this.route('new');
  });
  this.route('host', { path: '/host/:host_id' }, function() {
    this.route('edit');
    this.route('address');
    this.route('photos');
    this.route('contact');
  });
  this.route('wwoofers', function() {
    this.route('new');
  });
  this.route('wwoofer', { path: '/wwoofer/:wwoofer_id' }, function() {
    this.route('edit');
    this.route('address');
    this.route('photo');
    this.route('contact');
  });
  this.route('users', function() {
    this.route('new');
  });
  this.route('user', { path: '/user/:user_id' }, function() {
    this.route('edit');
    this.route('change-password');
    this.route('memberships');
    this.route('favorites');
  });
  this.route('memberships', function() {
    this.route('new');
  });
  this.route('reviews', function() {
  });
  this.route('conversations', function() {
  });
  this.route('conversation', { path: '/conversation/:conversation_id' }, function() {
  });
  this.route('404', { path: '*path' });
});

export default Router;
