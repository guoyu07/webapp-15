import Ember from 'ember';

const { computed } = Ember;
const { service } = Ember.inject;

export default Ember.Service.extend({

  store: service('store'),

  departments: computed(function() {
    return this.get('store').find('department');
  }),

  /**
   * Departments sorted by name.
   */
  departmentsSorting: ['name'],
  sortedDepartments: computed.sort('departments', 'departmentsSorting'),

  /**
   * Departments grouped by region name.
   */
  groupedDepartments: computed('departments.[]', function() {
    let departments = this.get('departments');
    let groupedDepartments = [];

    if (departments.get('content')) {

      // Find all region names
      let regionNames = departments.mapBy('regionName').uniq().sort();

      // Group departments by region
      groupedDepartments = regionNames.map(function(regionName) {
        let regionDepartments = departments.filterBy('regionName', regionName);
        return {
          groupName: regionName,
          options: regionDepartments
        };
      });
    }

    return groupedDepartments;
  })
});
