import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['rating'],
  classNameBindings: ['readonly::rating-editable'],

  actions: {
    setRating(rating) {
      this.get('setRating')(rating);
    }
  }
});
