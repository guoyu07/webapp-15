import BaseValidator from 'ember-validations/validators/base';

export default BaseValidator.extend({

    // Max date is 18 years ago
    maxDate: moment().subtract(18, 'year'),

    /**
     * Validates that the selected date is before 18 years ago.
     */
    call: function() {
        var selectedDate = this.model.get(this.property);
        if (!selectedDate || selectedDate.isAfter(this.get('maxDate'))) {
            this.errors.pushObject(Ember.I18n.t('notify.mustBe18'));
        }
    }
});
