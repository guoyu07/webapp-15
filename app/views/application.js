import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement() {
    Ember.$('.navbar-collapse').click('a:not(.dropdown-toggle)', function(e) {
      // Fix to avoid collapsing on desktop size, check if the button navbar toggle is hidden
      if (Ember.$(e.target).hasClass('dropdown-toggle') || Ember.$('button.navbar-toggle').is(':hidden')) {
        return;
      }
      Ember.$('.navbar-collapse').collapse('hide');
    });
  }
});
