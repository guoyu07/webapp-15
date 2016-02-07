import Ember from 'ember';

const { computed } = Ember;
const { service } = Ember.inject;

export default Ember.Service.extend({

  i18n: service('i18n'),

  /**
   * Lodging ids.
   */
  lodgingIds: [
    'bedroom',
    'trailer',
    'campsite',
    'yurt-tipi'
  ],

  /**
   * List of all lodgings proposed by the hosts.
   */
  allLodgings: computed('lodgingIds.[]', 'i18n.locale', function() {
    const lodgings = this.get('lodgingIds').map((item)=> {
      return Ember.Object.create({
        id: item,
        label: this.get('i18n').t(`lodgings.${item}`)
      });
    });

    return lodgings;
  })
});
