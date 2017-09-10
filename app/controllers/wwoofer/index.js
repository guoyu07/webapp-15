import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({

  showNote: computed.and('model.note', 'sessionUser.user.isAdmin'),

  isLoggedUserProfile: computed('sessionUser.user.id', 'model.user.id', function() {
    return this.get('sessionUser.user.id') === this.get('model.user.id');
  })
});
