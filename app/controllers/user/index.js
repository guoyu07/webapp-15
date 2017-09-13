import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({
  showNote: computed.and('user.note', 'sessionUser.user.isAdmin')
});
