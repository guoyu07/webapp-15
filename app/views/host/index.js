/**
 * Ember view for host index.
 */
import Ember from "ember";

export default Ember.View.extend({
    didInsertElement: function () {
        Ember.$(".host-gallery").swipeshow();
    }
});