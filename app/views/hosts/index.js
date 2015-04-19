/**
 * Ember view for hosts index.
 */
import Ember from "ember";

export default Ember.View.extend({

    didInsertElement: function () {
        Ember.$("#mainContainer").removeClass( "container" ).addClass( "container-fluid" );
        this.resizeElements();
        Ember.$(window).on("resize", this.resizeElements);
        this.controller.get('mapLayer').invalidateSize();

    },

    resizeElements: function() {
        if (Ember.$('#resultList').is(':hidden')) {

            // resize Map for mobile
            if (Ember.$(".leaflet-container")) {
                Ember.$(".leaflet-container").height(Ember.$(window).height() - Ember.$("nav .container-fluid").height() - Ember.$(".search-box").height() - 20);
            }
        } else {

            // resize Map for desktop
            if (Ember.$(".leaflet-container")) {
                Ember.$(".leaflet-container").height(Ember.$(window).height() - Ember.$("nav .container-fluid").height() - 20);
            }

            if (Ember.$("#resultList")) {
                Ember.$("#resultList").height(Ember.$(window).height() - Ember.$("nav .container-fluid").height() - Ember.$("div.search-box").height() -60);
            }
        }
    }
});

