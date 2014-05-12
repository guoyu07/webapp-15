/**
 * Ember component for datetime picker.
 */
App.DatePickerComponent = Ember.Component.extend({

    dateString: null,

    didInsertElement: function () {
        var self = this;
        var dp = $('#datetimepicker').datetimepicker({
            pickTime: false,
            viewMode: 'years'
        }).on("dp.change", function () {
            self.set('value', $('#datetimepicker').data("DateTimePicker").getDate()._d);
        });
    }
});