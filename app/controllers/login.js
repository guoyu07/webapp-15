/**
 * Ember controller for login.
 */
import Ember from 'ember';
import ValidationsMixin from '../mixins/validations';
import config from '../config/environment';

export default Ember.ObjectController.extend(ValidationsMixin, {

    needs: 'application',

    actions: {
        login: function () {

            // Validate form then login
            var loginData = this.get('content');
            var self = this;
            loginData.validate().then(function () {

                // Prepare URL
                var adapter = self.store.adapterFor('application'),
                    url = [ adapter.get('host'), adapter.get('namespace'), 'users/login' ].join('/');

                Ember.$.ajax({
                    type: 'POST',
                    url: url,
                    data: {
                        username: loginData.get('username'),
                        password: loginData.get('password')
                    }
                }).done(function (data) {

                    // Store the token in the local storage
                    self.set('controllers.application.currentUser', data.user);

                    // Notify user
                    alertify.success("Welcome back!");

                    // Go to home page (refresh the page to get fresh data from the API)
                    window.location.replace(config.baseUrl);
                }).fail(function () {
                    // Notify user
                    alertify.error("The email address or password is incorrect.");
                });
            }).catch(function () {
                alertify.error("Your submission is invalid.");
            });
        }
    }
});