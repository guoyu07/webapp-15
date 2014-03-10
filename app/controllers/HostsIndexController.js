/**
 * Created by guillaumez on 2/24/14.
 */

App.HostsIndexController = Ember.ArrayController.extend({

    needs: ['hosts'],

    contentBinding: 'controllers.hosts.arrangedContent',

    totalHosts: function () {
        return this.store.metadataFor('host').total;
    }.property('content', 'content.@each', 'content.length')

});