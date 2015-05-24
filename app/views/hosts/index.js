/**
 * Ember view for hosts index.
 */
import Ember from "ember";

export default Ember.View.extend({

    didInsertElement: function () {
        this.resizeElements();
        Ember.$(window).on("resize", this.resizeElements);
        this.get('controller.mapLayer').invalidateSize();
    },

    resizeElements: function() {

        var windowHeight = Ember.$(window).height();
        var navHeight = Ember.$("nav .container-fluid").outerHeight(true);
        var searchBoxHeight = Ember.$("#hosts-search-box").outerHeight(true);
        var searchTabsHeight = Ember.$("#hosts-search-tabs").outerHeight(true);

        if (Ember.$('#resultList').is(':hidden')) {

            // resize Map for mobile
            if (Ember.$(".leaflet-container")) {
                Ember.$(".leaflet-container").height(windowHeight - navHeight - searchBoxHeight - searchTabsHeight - 50);
            }
        } else {

            // resize Map for desktop
            if (Ember.$(".leaflet-container")) {
                Ember.$(".leaflet-container").height(windowHeight - navHeight - 35);
            }

            if (Ember.$("#resultList")) {
                Ember.$("#resultList").height(windowHeight - navHeight - searchBoxHeight - searchTabsHeight - 55);
            }
        }
    }
});

