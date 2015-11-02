export default {
    name: 'user-memberships',
    after: 'ember-simple-auth',

    initialize: function (container, app) {
        // Inject the user-memberships service in all controllers and routes
        app.inject('controller', 'userMemberships', 'service:user-memberships');
        app.inject('route', 'userMemberships', 'service:user-memberships');
    }
};
