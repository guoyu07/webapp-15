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
  this.route('payment', function() {
    this.route('complete');
    this.route('cancel');
    this.route('failure');
  });
  this.route('404', { path: '*path' });
});

export default Router;
