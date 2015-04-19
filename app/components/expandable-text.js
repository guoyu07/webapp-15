/**
 * Ember component to display an expandable text.
 */
import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'p',
    isExpanded: false,
    truncateAt: 300,

    /**
     * Toggles the "isExpanded" state.
     */
    actions: {
        toggle: function() {
            this.set('isExpanded', !this.get('isExpanded'));
        }
    },

    /**
     * Truncates the text if not expanded then returns it.
     */
    displayedText: function () {
        var text = this.get('text');
        if (!Ember.isEmpty(text)) {
            text = this.get('isExpanded') ? text : text.slice(0, this.get('truncateAt')).concat('...');
        }
        return text;
    }.property('text', 'isExpanded')
});
