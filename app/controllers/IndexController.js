/**
 * Ember controller for the App's home page.
 */
App.IndexController = Ember.ObjectController.extend({

    needs: ['application'],
    hosts: [],
    wwoofers: [],
    currentUserBinding: 'controllers.application.currentUser',

    hostProfile: function () {
        return this.get('hosts') ? this.get('hosts').objectAt(0) : null;
    }.property('hosts'),

    wwooferProfile: function () {
        return this.get('wwoofers') ? this.get('wwoofers').objectAt(0) : null;
    }.property('wwoofers')
});