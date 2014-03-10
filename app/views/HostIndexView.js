/**
 * Created by guillaumez on 3/5/14.
 */

App.HostIndexView = Ember.View.extend({
    didInsertElement: function () {
        $(".host-gallery").swipeshow();
    }
});