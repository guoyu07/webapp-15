/**
 * Ember controller for user edition.
 */
import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        saveUser: function () {

            // Get the user
            var user = this.get('model');

            // Validate and save
            var self = this;
            user.validate().then(function () {
                user.save().then(function () {
                    alertify.success(Ember.I18n.t('notify.informationUpdated'));
                    self.transitionToRoute('index');
                });
            }).catch(function () {
                alertify.error(Ember.I18n.t('notify.submissionInvalid'));
            });
        }
    }
});
