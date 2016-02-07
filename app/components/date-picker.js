/**
 * Ember component for date picker.
 */
import Ember from 'ember';
import moment from 'moment';

const { observer, computed } = Ember;
const { service } = Ember.inject;

export default Ember.Component.extend({

  moment: service('moment'),

  _selectedDay: null,
  _selectedMonth: null,
  _selectedYear: null,

  selectedDate: null,

  days: computed('_selectedMonth.value', '_selectedYear', function() {
    let days = [];
    const endOfMonth = this.daysInMonth(this.get('_selectedMonth.value'), this.get('_selectedYear'));
    for (let i = 1; i <= endOfMonth; i++) {
      days.push(i);
    }
    return days;
  }),

  months: computed('moment.locale', function() {
    let months = [];
    for (let i = 0; i <= 11; i++) {
      months.push({
        value: i,
        name: this.get('moment').moment().month(i).format('MMMM')
      });
    }
    return months;
  }),

  years: computed(function() {
    let years = [];
    for (let i = moment().subtract(18, 'years').year(); i >= 1900; i--) {
      years.push(i);
    }
    return years;
  }),

  daysInMonth(month, year) {
    return moment({ month, year }).endOf('month').date();
  },

  didReceiveAttrs() {
    let selectedDate = this.getAttr('selectedDate');

    if (!selectedDate || !selectedDate.isValid()) {
      selectedDate = moment();
    }

    if (selectedDate) {
      this.set('_selectedDay', selectedDate.date());
      this.set('_selectedMonth', { value: selectedDate.month() });
      this.set('_selectedYear', selectedDate.year());
    }
  },

  dateChanged: observer('_selectedDay', '_selectedMonth.value', '_selectedYear', function() {
    let day = this.get('_selectedDay');
    const month = this.get('_selectedMonth.value');
    const year = this.get('_selectedYear');

    if (Ember.isEmpty(day) || Ember.isEmpty(month) || Ember.isEmpty(year)) {
      return;
    }

    const daysInMonth = this.daysInMonth(month, year);
    day = (day > daysInMonth) ? daysInMonth : day;

    let date = moment({ day, month, year });
    this.sendAction('dateSelected', date);
  })
});
