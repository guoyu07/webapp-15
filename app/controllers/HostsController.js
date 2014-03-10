/**
 * Created by guillaumez on 2/24/14.
 */

App.HostsController = Ember.ArrayController.extend({

    itemController: 'host',
    content: [],
    searchTerm: null,
    departementFilter: null,
    departementFilterOptionsBinding: 'departements',

    departements: function () {
        return this.store.find('departement');
    }.property(),

    parameters: function () {
        return {
            //'orderBy': sortProperty,
            //'ascending': !!this.get('sortAscending'),
            'searchTerm': $.trim(this.get('searchTerm')) || null,
            'dpt': this.get('departementFilter.id')
        };
    }.property('sortProperties.@each', 'sortAscending', 'searchTerm', 'departementFilter.id')

});