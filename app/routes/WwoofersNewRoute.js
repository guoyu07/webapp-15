/**
 * Ember route for wwoofer creation.
 */
App.WwoofersNewRoute = Ember.Route.extend({
    model: function () {

        // Get the current user id
        var userId = this.controllerFor('application').get('currentUser.id');
        if (!userId) {
            this.transitionTo('index');
        }

        // Create a new wwoofer record attached to the current logged in user
        var address = this.store.createRecord('address');
        var self = this;
        return this.store.find('user', userId).then(function (user) {
            return self.store.createRecord('wwoofer', {
                user: user,
                address: address
            });
        });
    },
    setupController: function (controller, model) {
        this._super(controller, model);
        this.controllerFor('countries').set('content', this.store.find('country'));
        this.controllerFor('departments').set('content', this.store.find('department'));
    }
});