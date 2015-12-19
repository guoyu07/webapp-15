import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  tagName: 'span',

  classNames: ['glyphicon'],

  classNameBindings: ['iconClass'],

  attributeBindings: ['dataToggle:data-toggle', 'title', 'position:data-placement'],

  dataToggle: 'tooltip',

  iconClass: computed('icon', function () {
    return `glyphicon-${this.get('icon')}`;
  }),

  icon: 'question-sign',

  title: '',

  position: null,

  didRender() {
    this.$().tooltip();
  }
});
