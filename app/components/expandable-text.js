import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  tagName: 'p',
  text: '',
  isExpanded: false,
  truncateAt: 300,

  actions: {
    toggle() {
      this.toggleProperty('isExpanded');
    }
  },

  displayedText: computed('text', 'isExpanded', function() {
    let text = this.get('text');
    let isExpanded = this.get('isExpanded');
    let truncateAt = this.get('truncateAt');

    if (!Ember.isEmpty(text) && !isExpanded && text.length > truncateAt) {
      text = text.slice(0, this.get('truncateAt')).concat('...');
    }

    return text;
  }),

  canExpand: computed('isExpanded', 'text.length', function() {
    return this.get('isExpanded') === false
      && this.get('text.length') > this.get('truncateAt');
  })
});
