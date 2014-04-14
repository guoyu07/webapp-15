/**
 * Created by guillaumez on 2/24/14.
 */

App.HostsIndexController = Ember.ArrayController.extend({

    searchTerm: null,
    departmentFilter: null,
    departmentFilterOptionsBinding: 'departments',

    departments: function () {
        return this.store.find('department');
    }.property(),

    parameters: function () {
        return {
            'searchTerm': $.trim(this.get('searchTerm')) || null,
            'dpt': this.get('departmentFilter.id')
        };
    }.property('searchTerm', 'departmentFilter.id'),

    totalHosts: function () {
        return this.store.metadataFor('host').total;
    }.property('content', 'content.@each', 'content.length'),

    actions: {
        searchHosts: function () {
            var self = this;
            this.store
                .find('host', this.get('parameters'))
                .then(function (hosts) {
                    self.set('content', hosts);
                });
        },
        loadMoreHosts: function () {
            // Initialize variables
            var newOffset = this.store.metadataFor('host').offset + 20,
                params = Ember.$.extend(true, this.get('parameters') || {}, {offset: newOffset});

            // Find next page of content and update
            this.store.find('host', params).then(function (hosts) {
                this.get('content').addObjects(hosts.get('content'));
            });

        }
    }
});