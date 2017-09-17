import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  tagName: 'p',
  text: '',
  isExpanded: false,
  truncateAt: 300,

  /**
   * Toggles the "isExpanded" state.
   */
  actions: {
    toggle() {
      this.toggleProperty('isExpanded');
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

    text = Ember.Handlebars.Utils.escapeExpression(text);
    text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
    return Ember.String.htmlSafe(text);
  }),

  canExpand: computed('isExpanded', 'text.length', function() {
    return this.get('isExpanded') === false
      && this.get('text.length') > this.get('truncateAt');
  })
});
