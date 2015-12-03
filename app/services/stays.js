import Ember from 'ember';

const { computed } = Ember;
const { service } = Ember.inject;

export default Ember.Service.extend({

  i18n: service('i18n'),

  /**
   * Stay ids.
   */
  stayIds: [
    // 'single-day',
    'less-than-a-week',
    'one-two-weeks',
    'three-four-weeks',
    'more-than-a-month'
  ],

  /**
   * List of all length of stays accepted by the hosts.
   */
  allStays: computed('stayIds.[]', 'i18n.locale', function() {
    var stays = this.get('stayIds').map((item)=> {
      return Ember.Object.create({
        id: item,
        label: this.get('i18n').t('stays.' + item)
      });
    });

    return stays;
  })
});
