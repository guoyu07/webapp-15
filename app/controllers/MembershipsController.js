/**
 * Ember controller for memberships.
 */
App.MembershipsController = Ember.ArrayController.extend({
    sortProperties: ['expireAt'],
    sortAscending: false
});