/**
 * Ember service for months.
 */
import Ember from 'ember';

const { computed } = Ember;
const { service } = Ember.inject;

export default Ember.Service.extend({

  moment: service('moment'),

  /**
   * Returns the months of the year, localized.
   */
  allMonths: computed('moment.locale', function() {
    var moment = this.get('moment');
    var months = [];
    for (var i = 0; i <= 11; i++) {
      months.push(Ember.Object.create({
        id: moment.moment().month(i).format('MM'),
        label: moment.moment().month(i).format('MMMM')
      }));
    }
    return months;
  })
});
