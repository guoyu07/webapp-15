import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Service.extend({

    store: service('store'),

    departments: Ember.computed(function () {
        return this.get('store').find('department');
    }),

    /**
     * Departments sorted by name.
     */
    departmentsSorting: ['name'],
    sortedDepartments: Ember.computed.sort('departments', 'departmentsSorting')
});
