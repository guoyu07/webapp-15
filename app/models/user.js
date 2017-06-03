import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;

export default DS.Model.extend({

  // Attributes
  email: DS.attr('string'),
  password: DS.attr('string'), // Only used for sign up
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  birthDate: DS.attr('string'),
  phone: DS.attr('string'),
  isAdmin: DS.attr('boolean'),
  isSuspended: DS.attr('boolean'),
  locale: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  photo: DS.attr('string'),

  // Relationships
  host: DS.belongsTo('host', { async: true }),
  wwoofer: DS.belongsTo('wwoofer', { async: true }),
  memberships: DS.hasMany('membership', { async: true }),
  favorites: DS.hasMany('host', {
    inverse: 'followers',
    async: true
  }),
  addresses: computed.collect('host.address', 'wwoofer.address'),

  // Computed properties
  completePhotoUrl: computed('photo', function() {
    const photo = this.get('photo');
    if (Ember.isPresent(photo)) {
      const encodedPhoto = encodeURIComponent(photo);
      return `https://s3.amazonaws.com/wwoof-france/photos/users/${encodedPhoto}`;
    } else {
      return '/assets/images/no-photo.png';
    }
  }),

  conversationPhotoUrl: computed('photo', 'completePhotoUrl', 'host.thumbnail.completeUrl', 'host.thumbnailUrl', function () {
    let photo = this.get('photo');
    let thumbnailUrl = this.get('host.thumbnail.completeUrl');
    if (photo || !thumbnailUrl) {
      return this.get('completePhotoUrl');
    } else {
      return this.get('host.thumbnailUrl');
    }
  }),

  isNotAdmin: computed.not('isAdmin'),

  /**
   * Returns the full name of the user.
   */
  fullName: computed('firstName', 'lastName', function() {
    const firstName = this.get('firstName');
    const lastName = this.get('lastName');
    if (firstName || lastName) {
      return `${firstName} ${lastName}`;
    }
  }),

  /**
   * Order memberships by expiration date (most recent first).
   */
  expireAtSortingDesc: ['expireAt:desc'],
  sortedMemberships: computed.sort('memberships', 'expireAtSortingDesc'),

  /**
   * All memberships computed properties.
   */
  hasMemberships: computed.notEmpty('sortedMemberships'),
  latestMembership: computed.readOnly('sortedMemberships.firstObject'),
  hasNonExpiredMembership: computed.and('hasMemberships', 'latestMembership.isNotExpired'),

  /**
   * Wwoofer memberships computed properties.
   */
  wwooferMemberships: computed.filterBy('sortedMemberships', 'type', 'W'),
  hasWwooferMemberships: computed.notEmpty('wwooferMemberships'),
  latestWwooferMembership: computed.readOnly('wwooferMemberships.firstObject'),
  firstWwooferMembership: computed.readOnly('wwooferMemberships.lastObject'),
  hasNonExpiredWwooferMembership: computed.and('hasWwooferMemberships', 'latestWwooferMembership.isNotExpired'),

  /**
   * Host memberships computed properties.
   */
  hostMemberships: computed.filterBy('sortedMemberships', 'type', 'H'),
  hasHostMemberships: computed.notEmpty('hostMemberships'),
  latestHostMembership: computed.readOnly('hostMemberships.firstObject'),
  firstHostMembership: computed.readOnly('hostMemberships.lastObject'),
  hasNonExpiredHostMembership: computed.and('hasHostMemberships', 'latestHostMembership.isNotExpired')
});
