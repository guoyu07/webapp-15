/**
 * Ember component for datetime picker.
 */
App.DatePickerComponent = Ember.Component.extend({

    dateString: null,

    didInsertElement: function () {
        var self = this;
        var dp = $('#datetimepicker');

        // Initializes picker
        dp.datetimepicker({
            pickTime: false,
            viewMode: 'years'
        }).on('dp.change', function () {
            self.set('value', dp.data('DateTimePicker').getDate()._d);
        });

        // Set max date (today)
        dp.data('DateTimePicker').setMaxDate(new Date());

        // Set initial value on first load
        if (this.get('value')) {
            dp.data('DateTimePicker').setDate(this.get('value'));
        }
    }
});