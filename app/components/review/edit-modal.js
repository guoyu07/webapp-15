import Ember from 'ember';

export default Ember.Component.extend({
  review: null,
  actions: {
    setRating(rating) {
      this.set('review.rating', rating);
    }
  }
});
