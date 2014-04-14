/**
 * Created by guillaumez on 2/22/14.
 */

App.Photo = DS.Model.extend({
    fileName: DS.attr('string'),
    caption: DS.attr('string'),
    host: DS.belongsTo('host'),
    completeUrl: function () {
        var baseUrl = 'http://localhost:3333/host_photos/'; // http://wwoof.fr/loggedon/images/
        return this.get('fileName') ? baseUrl + encodeURIComponent(this.get('fileName')) : '';
    }.property('fileName')
});