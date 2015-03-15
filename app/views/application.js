    import Ember from 'ember';

export default Ember.View.extend({
    didInsertElement: function () {
        Ember.$('.navbar-collapse').click('a:not(.dropdown-toggle)', function(e) {
            if(Ember.$(e.target).hasClass('dropdown-toggle')) {
                return;
            }
            Ember.$('.navbar-collapse').collapse('hide');
        });
    }
});
