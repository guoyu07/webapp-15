/**
 * Ember component for datetime picker.
 */
import Ember from 'ember';

export default Ember.Component.extend({
    dateString: null,

    didInsertElement: function () {
        var self = this;
        var dp = Ember.$('#datetimepicker');

        // Initializes picker
        dp.datetimepicker({
            pickTime: false,
            viewMode: 'years',
            defaultDate: this.get('maxDate'),
            maxDate: this.get('maxDate')
        }).on('dp.change', function () {
            self.set('value', dp.data('DateTimePicker').getDate()._d);
        });

        // Disable picker
        if (this.get('disabled')) {
            dp.data('DateTimePicker').disable();
        }

        // Set initial value on first load
        if (this.get('value')) {
            dp.data('DateTimePicker').setDate(this.get('value'));
        }
    }
});
