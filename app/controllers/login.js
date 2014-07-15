/**
 * Ember controller for login.
 */
import Ember from 'ember';
import ValidationsMixin from '../mixins/validations';

export default Ember.ObjectController.extend(ValidationsMixin, {

    needs: 'application',

    actions: {
        login: function () {

            // Validate form then login
            var loginData = this.get('content');
            var self = this;
            loginData.validate().then(function () {
                Ember.$.ajax({
                    type: 'POST',
                    url: WebappENV.SERVER_BASE_URL + '/login',
                    data: {
                        username: loginData.get('username'),
                        password: loginData.get('password')
                    },
                    crossDomain: true,
                    xhrFields: {
                        withCredentials: true
                    }
                }).done(function (data) {

                    // Store the token in the local storage
                    self.set('controllers.application.currentUser', data.user);

                    // Notify user
                    alertify.success("Welcome back!");

                    // Go to home page (refresh the page to get fresh data from the API)
                    window.location.replace('/');
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