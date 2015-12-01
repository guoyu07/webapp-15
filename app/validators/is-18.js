import Ember from 'ember';
import BaseValidator from 'ember-validations/validators/base';
import moment from 'moment';

const { service } = Ember.inject;

export default BaseValidator.extend({

  i18n: service('i18n'),

  // Max date is 18 years ago
  maxDate: moment().subtract(18, 'year'),

  /**
   * Validates that the selected date is before 18 years ago.
   */
  call: function() {
    var selectedDate = this.model.get(this.property);
    if (!selectedDate || !selectedDate.isValid() || selectedDate.isAfter(this.get('maxDate'))) {
      this.errors.pushObject(this.get('i18n').t('notify.mustBe18'));
    }
  }
});
