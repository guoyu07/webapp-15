/**
 * Ember service for months.
 */
import Ember from 'ember';

export default Ember.Service.extend({
    /**
     * All months.
     */
    allMonths: function () {
        var months = [];
        for (var i = 0; i <= 11; i++) {
            months.push(Ember.Object.create({
                id: moment().months(i).format("MM"),
                label: moment().months(i).format("MMMM")
            }));
        }
        return months;
    }.property()
});
