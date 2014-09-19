import Ember from 'ember';

var Router = Ember.Router.extend({
    location: WebappENV.locationType
});

Router.map(function () {
    this.route('login');
    this.route('reset-password');
    this.resource('hosts', function () {
        this.route("new");
    });
    this.resource("host", { path: "/host/:host_id" }, function () {
        this.route("edit");
    });
    this.resource('wwoofers', function () {
        this.route("new");
    });
    this.resource("wwoofer", { path: "/wwoofer/:wwoofer_id" }, function () {
        this.route("edit");
        this.route('membership');
    });
    this.resource('users', function () {
        this.route("new");
    });
    this.resource("user", { path: "/user/:user_id" }, function () {
        this.route("edit");
    });
    this.resource('memberships', function () {
        this.route('reminders');
    });
    this.route('payment', function () {
        this.route("complete");
        this.route("cancel");
    });
});

export default Router;