/**
 * Ember controller for memberships index.
 */
App.MembershipsIndexController = Ember.ArrayController.extend({
    needs: ['memberships'],
    wwoofMembershipsBinding: 'controllers.memberships.wwoofMemberships',
    hostMembershipsBinding: 'controllers.memberships.hostMemberships'
});