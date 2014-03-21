/**
 * Created by guillaumez on 3/16/14.
 */

App.WwoofersNewController = Ember.ObjectController.extend({
    countries: function () {
        return this.store.find('country');
    }.property()
});