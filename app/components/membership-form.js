import Ember from 'ember';

const { computed } = Ember;
const { service } = Ember.inject;

export default Ember.Component.extend({

  membershipsService: service('memberships'),

  membership: null,

  membershipOptions: computed('membershipsService.membershipOptions.[]', 'membership.type', function() {
    return this.get('membershipsService.membershipOptions').filterBy('type', this.get('membership.type'));
  }),

  showShippingRegions: computed.and('includeBooklet', 'membership.isNew')
});
