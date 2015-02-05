import Ember from 'ember';


export default Ember.Object.extend(EmberLeaflet.LayerMixin,{
    _newLayer : function() {
        return new L.tileLayer.provider('MapQuestOpen');
    }
});
