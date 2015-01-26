/**
 * Ember view for host index.
 */
import App from "../../app";

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

$(window).on("resize", function() {
    if ($(".leaflet-container"))
        $(".leaflet-container").height($(window).height() - $("nav .container").height() - 20);
}).trigger("resize");
