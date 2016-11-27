import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate() {
    this.render({ into: 'application' });
  },
  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('review', null);
    }
  }
});
