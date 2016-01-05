import Ember from 'ember';
import config from 'webapp/config/environment';
import GooglePageviewMixin from './mixins/google-pageview';

const Router = Ember.Router.extend(GooglePageviewMixin, {
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('contact');
  this.route('reset-password');
  this.resource('hosts', function() {
    this.route('new');
  });
  this.resource('host', { path: '/host/:host_id' }, function() {
    this.route('edit');
    this.route('address');
    this.route('photos');
    this.route('contact');
  });
  this.resource('wwoofers', function() {
    this.route('new');
  });
  this.resource('wwoofer', { path: '/wwoofer/:wwoofer_id' }, function() {
    this.route('edit');
    this.route('address');
    this.route('photo');
  });
  this.resource('users', function() {
    this.route('new');
  });
  this.resource('user', { path: '/user/:user_id' }, function() {
    this.route('edit');
    this.route('change-password');
    this.route('memberships');
    this.route('bookmarks');
  });
  this.resource('memberships', function() {
    this.route('new');
  });
  this.route('payment', function() {
    this.route('complete');
    this.route('cancel');
    this.route('failure');
  });
  this.route('404', { path: "*path" });
});

export default Router;
