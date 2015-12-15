import Ember from 'ember';

const { computed } = Ember;
const { service } = Ember.inject;

export default Ember.Service.extend({

  i18n: service('i18n'),

  /**
   * Capacity ids.
   */
  capacityIds: [
    '1',
    '2',
    '3',
    '4+'
  ],

  /**
   * List of all capacities accepted by the hosts.
   */
  allCapacities: computed('capacityIds.[]', 'i18n.locale', function() {
    var capacities = this.get('capacityIds').map((item)=> {
      return Ember.Object.create({
        id: item,
        label: this.get('i18n').t('host.form.capacity.label', { count: item })
      });
    });

    return capacities;
  })
});
