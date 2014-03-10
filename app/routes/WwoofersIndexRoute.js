/**
 * Created by guillaumez on 3/9/14.
 */

App.WwoofersIndexRoute = Ember.Route.extend({
    setupController: function (controller) {
        this.store.find('wwoofer')
            .then(function (wwoofers) {
                controller.set('content', wwoofers);
            });
    }
});