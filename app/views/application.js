import Ember from 'ember';

export default Ember.View.extend({
    didInsertElement: function () {
        $('.navbar-collapse').click('a:not(.dropdown-toggle)', function(e) {
            if(Ember.$(e.target).hasClass('dropdown-toggle')) {
                return;
            }
            $('.navbar-collapse').collapse('hide');
        });
    }
});
