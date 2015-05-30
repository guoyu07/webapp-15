/**
 * Ember controller for wwoofer photo edition.
 */
import Ember from 'ember';
import ValidationsMixin from '../../mixins/validations';

export default Ember.Controller.extend(ValidationsMixin, {

    /**
     * The data-url to send the photo to.
     */
    photoDataUrl: function () {
        return 'api/users/' + this.get('model.user.id') + '/photo';
    }.property('model.user.id'),

    actions: {
        deletePhoto: function () {
            var self = this;
            return new Ember.RSVP.Promise(function(resolve, reject) {

                // Get user
                var user = self.get('model.user');

                // Impersonate the user
                var deleteRequest = Ember.$.ajax({
                    type: 'DELETE',
                    url: self.get('photoDataUrl')
                });

                // Handle success
                deleteRequest.done(function (data) {
                    user.set('photo', null);
                    alertify.success(Ember.I18n.t('notify.photoDeleted'));
                    resolve(data);
                });

                // Handle failure
                deleteRequest.fail(function (err) {
                    reject(err);
                });
            });
        }
    }
});
