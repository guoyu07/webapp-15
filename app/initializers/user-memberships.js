export default {
    name: 'user-memberships',
    after: 'simple-auth',

    initialize: function (container, app) {
        // Inject the user-memberships service in all controllers and routes
        // TODO: improve this by using the new Ember.inject.service()
        app.inject('controller', 'userMemberships', 'service:user-memberships');
        app.inject('route', 'userMemberships', 'service:user-memberships');
    }
};
