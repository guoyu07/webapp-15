/**
 * Created by guillaumez on 2/24/14.
 */

App.HostsController = Ember.ArrayController.extend({

    itemController: 'host',
    content: [],
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
    }.property('searchTerm', 'departmentFilter.id')

});