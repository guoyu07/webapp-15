/**
 * Created by MaximeV on 2/4/2015.
 */
import Ember from 'ember';


App.OSMLayer = Ember.Object.extend(EmberLeaflet.LayerMixin,{
    _newLayer : function() {
        return new L.tileLayer.provider('MapQuestOpen');
    }
});
