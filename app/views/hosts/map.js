/**
 * Ember view for host index.
 */
import App from '../../app';
import Ember from 'ember';

App.OSMLayer = Ember.Object.extend(EmberLeaflet.LayerMixin,{
    _newLayer: function() {
        return new L.tileLayer.provider('MapQuestOpen');
    }
});

export default EmberLeaflet.MapView.extend({

    childLayers: [
        App.OSMLayer
    ]
});

Ember.$(window).on("resize", function() {
    if (Ember.$(".leaflet-container")) {
        Ember.$(".leaflet-container").height(Ember.$(window).height() - Ember.$("nav .container").height() - 20);
    }
}).trigger("resize");


