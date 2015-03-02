import Ember from 'ember';

/**
 * Leaflet Layer for OSM OpenMapQuest
 */
export default Ember.Object.extend(EmberLeaflet.LayerMixin,{
    _newLayer : function() {
        return new L.tileLayer.provider('MapQuestOpen');
    }
});
