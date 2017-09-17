import Ember from 'ember';
import DS from 'ember-data';
import config from 'webapp/config/environment';

const { computed } = Ember;

export default DS.Model.extend({

  // Attributes
  email: DS.attr('string'),
  password: DS.attr('string'), // Only used for sign up
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  birthDate: DS.attr('string'),
  phone: DS.attr('string'),
  emergencyPhone: DS.attr('string'),
  intro: DS.attr('string'),
  tripMotivation: DS.attr('string'),
  isAdmin: DS.attr('boolean'),
  isSuspended: DS.attr('boolean'),
  locale: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  photo: DS.attr('string'),
  note: DS.attr('string'),

  // Relationships
  address: DS.belongsTo('address', { async: false }),
  host: DS.belongsTo('host', { async: true }),
  memberships: DS.hasMany('membership', { async: true }),
  favorites: DS.hasMany('host', {
    inverse: 'followers',
    async: true
  }),
  writtenReviews: DS.hasMany('reviews', {
    inverse: 'author',
    async: true
  }),
  receivedReviews: DS.hasMany('reviews', {
    inverse: 'reviewee',
    async: true
  }),

  _addresses: computed.collect('host.address', 'address'),
  addresses: computed.filter('_addresses', function (address) {
    return Ember.isPresent(address);
  }),

  wwooferReceivedReviews: computed.filterBy('receivedReviews', 'isHostReview', false),
  displayedWwooferReceivedReviews: computed.filterBy('wwooferReceivedReviews', 'isNew', false),

  getImageUrl(size) {
    let fileName = this.get('photo') || 'default.png';
    return `${config.thumbor.baseUrl}/${size}/photos/users/${fileName}`;
  },

  photoUrlThumb2: computed('photo', function () {
    return this.getImageUrl('250x250');
  }),

  photoUrlThumb1: computed('photo', function () {
    return this.getImageUrl('100x100');
  }),

  photoUrlThumbMini: computed('photo', function () {
    return this.getImageUrl('48x48');
  }),

  conversationUrlThumb1: computed('photo', 'host.thumbnail.urlThumb1', function () {
    let photo = this.get('photo');
    let hostThumbnailUrl = this.get('host.thumbnail.urlThumb1');
    if (photo || !hostThumbnailUrl) {
      return this.getImageUrl('100x100');
    } else {
      return hostThumbnailUrl;
    }
  }),

  conversationUrlThumb2: computed('photo', 'host.thumbnail.urlThumb2', function () {
    let photo = this.get('photo');
    let hostThumbnailUrl = this.get('host.thumbnail.urlThumb2');
    if (photo || !hostThumbnailUrl) {
      return this.getImageUrl('250x250');
    } else {
      return hostThumbnailUrl;
    }
  }),

  isNotAdmin: computed.not('isAdmin'),

  fullName: computed('firstName', 'lastName', function() {
    const firstName = this.get('firstName');
    const lastName = this.get('lastName');
    if (firstName || lastName) {
      return `${firstName} ${lastName}`;
    }
  }),

  isWwooferProfileComplete: computed('intro', 'address.id', function() {
    return Ember.isPresent(this.get('intro')) && Ember.isPresent(this.get('address.id'));
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
  firstMembership: computed.readOnly('sortedMemberships.lastObject'),
  hasActiveMembership: computed.and('hasMemberships', 'latestMembership.isActive'),
  hasNoActiveMembership: computed.not('hasActiveMembership'),

  /**
   * Wwoofer memberships computed properties.
   */
  wwooferMemberships: computed.filterBy('sortedMemberships', 'type', 'W'),
  hasWwooferMemberships: computed.notEmpty('wwooferMemberships'),
  latestWwooferMembership: computed.readOnly('wwooferMemberships.firstObject'),
  firstWwooferMembership: computed.readOnly('wwooferMemberships.lastObject'),
  hasActiveWwooferMembership: computed.and('hasWwooferMemberships', 'latestWwooferMembership.isActive'),

  /**
   * Host memberships computed properties.
   */
  hostMemberships: computed.filterBy('sortedMemberships', 'type', 'H'),
  hasHostMemberships: computed.notEmpty('hostMemberships'),
  latestHostMembership: computed.readOnly('hostMemberships.firstObject'),
  firstHostMembership: computed.readOnly('hostMemberships.lastObject'),
  hasActiveHostMembership: computed.and('hasHostMemberships', 'latestHostMembership.isActive')
});
