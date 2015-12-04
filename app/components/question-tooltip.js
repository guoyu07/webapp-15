import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',

  classNames: ['glyphicon glyphicon-question-sign'],

  attributeBindings: ['dataToggle:data-toggle', 'title'],

  dataToggle: 'tooltip',

  title: '',

  didRender() {
    this.$().tooltip();
  }
});
