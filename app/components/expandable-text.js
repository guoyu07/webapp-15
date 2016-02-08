import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  tagName: 'p',
  isExpanded: false,
  truncateAt: 300,

  /**
   * Toggles the "isExpanded" state.
   */
  actions: {
    toggle() {
      this.set('isExpanded', !this.get('isExpanded'));
    }
  },

  /**
   * Truncates the text if not expanded then returns it.
   */
  displayedText: computed('text', 'isExpanded', function() {
    let text = this.get('text');
    if (!Ember.isEmpty(text)) {
      text = this.get('isExpanded') ? text : text.slice(0, this.get('truncateAt')).concat('...');
    }
    return text;
  })
});
