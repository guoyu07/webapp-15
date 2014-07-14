/**
 * Ember controller for membership.
 */
import Ember from 'ember';

export default Ember.ObjectController.extend({
    isExpired: Ember.computed.lt('expireAt', moment()),
    isStillValidInAMonth: Ember.computed.gt('expireAt', moment().add('months', 1))
});