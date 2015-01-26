import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
    this.route('login');
    this.route('reset-password');
    this.resource('hosts', function () {
        this.route('new');
        this.route('map');
    });
    this.resource('host', { path: '/host/:host_id' }, function () {
        this.route('edit');
    });
    this.resource('wwoofers', function () {
        this.route('new');
    });
    this.resource('wwoofer', { path: '/wwoofer/:wwoofer_id' }, function () {
        this.route('edit');
    });
    this.resource('users', function () {
        this.route('new');
    });
    this.resource('user', { path: '/user/:user_id' }, function () {
        this.route('edit');
        this.route('change-password');
        this.route('memberships');
    });
    this.resource('memberships', function () {
        this.route('new');
    });
    this.route('payment', function () {
        this.route('complete');
        this.route('cancel');
    });
});

export default Router;
