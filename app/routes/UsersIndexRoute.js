/**
 * Created by guillaumez on 4/5/2014.
 */

App.UsersIndexRoute = Ember.Route.extend({
    setupController: function (controller) {
        this.store.find('user')
            .then(function (users) {
                controller.set('content', users);
            });
    }
});