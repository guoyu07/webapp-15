/**
 * Created by guillaumez on 2/22/14.
 */

App.Photo = DS.Model.extend({
    fileName: DS.attr('string'),
    caption: DS.attr('string'),
    host: DS.belongsTo('host'),
    completeUrl: function () {
        return this.get('fileName') ? '/host_photos/' + encodeURIComponent(this.get('fileName')) : '';
    }.property('fileName')
});