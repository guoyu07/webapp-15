/**
 * Ember controller for wwoofers index.
 */
import Ember from 'ember';

export default Ember.ArrayController.extend({
    needs: ['wwoofers'],
    contentBinding: 'controllers.wwoofers.arrangedContent'
});