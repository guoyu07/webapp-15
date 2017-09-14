import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({

  user: null,

  isCurrentUserProfile: computed('sessionUser.user.id', 'user.id', function() {
    return this.get('sessionUser.user.id') === this.get('model.user.id');
  }),

  showNote: computed.and('user.note', 'sessionUser.user.isAdmin'),

  showEditProfileButton: computed.or('sessionUser.user.isAdmin', 'isCurrentUserProfile')
});
