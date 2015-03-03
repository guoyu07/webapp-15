import Ember from 'ember';

/**
 * Leaflet Layer for OSM OpenMapQuest
 */
export default Ember.Object.extend(EmberLeaflet.LayerMixin,{
    _newLayer : function() {
        var layer = new L.tileLayer.provider('MapQuestOpen');
        layer._url = 'https://otile{s}-s.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg';
        return layer;
    }
});
