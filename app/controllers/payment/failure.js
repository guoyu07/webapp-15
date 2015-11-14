/**
 * Ember controller for payment failure.
 */
import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['reason', 'membershipType'],
  reason: '',
  membershipType: ''
});
