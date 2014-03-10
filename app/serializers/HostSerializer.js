/**
 * Created by guillaumez on 2/24/14.
 */

App.HostSerializer = DS.RESTSerializer.extend({
    extractArray: function (store, type, payload) {
        var photos = [];
        var hosts = payload.hosts;
        for (var i = 0; i < hosts.length; i++) {
            if (hosts[i].photos && hosts[i].photos.length) {
                photos = photos.concat(hosts[i].photos);
                hosts[i].photos = hosts[i].photos.mapProperty('id');
            }
        }
        payload.hosts = hosts;
        payload.photos = photos;

        return this._super(store, type, payload);
    },
    extractSingle: function (store, type, payload, id, requestType) {
        var photos = [];
        var host = payload.host;
        if (host.photos.length) {
            photos = host.photos;
            host.photos = host.photos.mapProperty('id');
        }
        payload.host = host;
        payload.photos = photos;

        return this._super(store, type, payload, id, requestType);
    }
});