import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  classNames: ['error'],

  error: null,
  showError: null
});
