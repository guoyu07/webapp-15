/**
 * Ember controller for French departments.
 */
import Ember from 'ember';

export default Ember.ArrayController.extend({
    sortProperties: ['name'],
    sortAscending: true,
    content: []
});