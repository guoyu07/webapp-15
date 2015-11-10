/**
 * Ember component for date picker.
 */
import Ember from 'ember';

const { observer, computed } = Ember;

export default Ember.Component.extend({

    _selectedDay: null,
    _selectedMonth: null,
    _selectedYear: null,

    selectedDate: null,

    days: computed('_selectedMonth.value', '_selectedYear', function () {
        var days = [];
        var endOfMonth = this.daysInMonth(this.get('_selectedMonth.value'), this.get('_selectedYear'));
        for (var i = 1; i <= endOfMonth; i++) { days.push(i); }
        return days;
    }),

    months: computed(function () {
        var months = [];
        for (var i = 0; i <= 11; i++) {
            months.push({ value: i, name: moment().months(i).format("MMMM") });
        }
        return months;
    }),

    years: computed(function () {
        var years = [];
        for (var i = moment().subtract(18, 'years').year(); i >= 1900; i--) { years.push(i); }
        return years;
    }),

    daysInMonth(month, year) {
        return moment({ month: month, year: year }).endOf('month').date();
    },

    didReceiveAttrs() {
        let selectedDate = this.getAttr('selectedDate');
        if (selectedDate) {
            this.set('_selectedDay', selectedDate.date());
            this.set('_selectedMonth', { value: selectedDate.month() });
            this.set('_selectedYear', selectedDate.year());
        }
    },

    dateChanged: observer('_selectedDay', '_selectedMonth.value', '_selectedYear', function() {
        var day = this.get('_selectedDay');
        var month = this.get('_selectedMonth.value');
        var year = this.get('_selectedYear');

        if (Ember.isEmpty(day) || Ember.isEmpty(month) || Ember.isEmpty(year)) {
            return;
        }

        var daysInMonth = this.daysInMonth(month, year);
        day = (day > daysInMonth) ? daysInMonth : day;

        var date = moment({ day: day, month: month, year: year });
        this.sendAction('dateSelected', date);
    })
});
