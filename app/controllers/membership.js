/**
 * Ember controller for membership.
 */
App.MembershipController = Ember.ObjectController.extend({
    isExpired: Ember.computed.lt('expireAt', moment()),
    isStillValidInAMonth: Ember.computed.gt('expireAt', moment().add('months', 1))
});