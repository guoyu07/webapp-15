/**
 * Ember controller for the App's home page.
 */
import Ember from 'ember';

export default Ember.ObjectController.extend({

    needs: ['application'],
    currentUserBinding: 'controllers.application.currentUser',

    hostProfile: null,
    wwooferProfile: null
});