/**
 * Ember controller for the App's home page.
 */
App.IndexController = Ember.ObjectController.extend({

    needs: ['application'],
    currentUserBinding: 'controllers.application.currentUser',

    hostProfile: null,
    wwooferProfile: null
});