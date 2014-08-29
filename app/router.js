import Ember from 'ember';

var Router = Ember.Router.extend({
    location: WebappENV.locationType
});

Router.map(function () {
    this.resource('hosts', { path: '/hosts' }, function () {
        this.route("new");
        this.resource("host", { path: "/:host_id" }, function () {
            this.route("edit");
        });
    });
    this.resource('wwoofers', { path: '/wwoofers' }, function () {
        this.route("new");
        this.resource("wwoofer", { path: "/:wwoofer_id" }, function () {
            this.route("edit");
            this.route('membership');
        });
    });
    this.route('login');
    this.route('reset-password');
    this.resource('users', { path: '/users' }, function () {
        this.route("new");
        this.resource("user", { path: "/:user_id" }, function () {
            this.route("edit");
        });
    });
    this.resource('memberships', { path: '/memberships' }, function () {
    });
    this.resource('payment', { path: '/payment' }, function () {
        this.route("complete");
        this.route("cancel");
    });
});

export default Router;