/**
 * Ember controller for users index.
 */
import Ember from 'ember';

export default Ember.ArrayController.extend({
    needs: ['users'],
    contentBinding: 'controllers.users.arrangedContent'
});