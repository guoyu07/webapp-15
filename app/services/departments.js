import Ember from 'ember';

export default Ember.Object.extend({

    departments: Ember.computed(function () {
        var store = this.container.lookup('store:main');
        return store.find('department');
    }),

    /**
     * Departments sorted by name.
     */
    departmentsSorting: ['name'],
    sortedDepartments: Ember.computed.sort('departments', 'departmentsSorting')
});
