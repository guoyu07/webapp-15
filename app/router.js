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
  this.route('become-wwoofer', function () {
    this.route('intro');
    this.route('contact');
  });
  this.route('wwoofers', function() {
  });
  this.route('wwoofer', { path: '/wwoofer/:wwoofer_id' }, function() {
  });
  this.route('users', function() {
    this.route('new');
  });
  this.route('user', { path: '/user/:user_id' }, function() {
    this.route('edit');
    this.route('change-password');
    this.route('memberships');
    this.route('photo');
    this.route('settings');
  });
  this.route('memberships', function() {
    this.route('new');
  });
  this.route('membership', { path: '/membership/:membership_id' }, function() {
    this.route('edit');
  });
  this.route('reviews', function() {
    this.route('new');
  });
  this.route('review', { path: '/review/:review_id' }, function() {
    this.route('edit');
  });
  this.route('conversations', function() {
    this.route('new');
  });
  this.route('conversation', { path: '/conversation/:conversation_id' }, function() {
  });
  this.route('404', { path: '*path' });
  this.route('activation');
});

export default Router;
