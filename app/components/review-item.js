import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({

  review: null,

  tagName: 'li',
  classNames: ['list-group-item'],

  attributeBindings: ['componentId:id'],

  componentId: computed('review.id', function () {
    let id = this.get('review.id');
    return `review-${id}`;
  })
});
