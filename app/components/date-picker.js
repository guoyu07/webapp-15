/**
 * Ember component for date picker.
 */
import Ember from 'ember';

export default Ember.Component.extend({

    selectedDay: null,
    selectedMonth: null,
    selectedYear: null,

    days: function () {
        var days = [];
        var endOfMonth = this.daysInMonth(this.get('selectedMonth.value'), this.get('selectedYear'));
        for (var i = 1; i <= endOfMonth; i++) { days.push(i); }
        return days;
    }.property('selectedMonth.value', 'selectedYear'),

    months: function () {
        var months = [];
        for (var i = 0; i <= 11; i++) {
            months.push({ value: i, name: moment().months(i).format("MMMM") });
        }
        return months;
    }.property(),

    years: function () {
        var years = [];
        for (var i = moment().subtract(18, 'years').year(); i >= 1900; i--) { years.push(i); }
        return years;
    }.property(),

    daysInMonth: function (month, year) {
        return moment({ month: month, year: year }).endOf('month').date();
    },

    selectedDate: function (key, value) {

        // Set date
        if (arguments.length > 1 && value) {
            this.set('selectedDay', value.date());
            if (this.get('selectedMonth')) {
                this.set('selectedMonth.value', value.month());
            }
            this.set('selectedYear', value.year());
        }

        // Get date
        var day = this.get('selectedDay');
        var month = this.get('selectedMonth.value');
        var year = this.get('selectedYear');
        if (day === null || month === null || year === null) { return moment(); }

        var daysInMonth = this.daysInMonth(month, year);
        day = (day > daysInMonth) ? daysInMonth : day;

        return moment({ day: day, month: month, year: year });
    }.property('selectedDay', 'selectedMonth.value', 'selectedYear')
});
