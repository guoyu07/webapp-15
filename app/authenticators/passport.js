/**
 * Custom authenticator for Passport.
 */
import Ember from 'ember';
import config from '../config/environment';
import BaseAuthenticator from 'simple-auth/authenticators/base';

export default BaseAuthenticator.extend({
    restore: function(data) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            if (!Ember.isEmpty(data.user)) {
                resolve(data);
            } else {
                reject();
            }
        });
    },
    authenticate: function(options) {
        return new Ember.RSVP.Promise(function(resolve, reject) {

            // Prepare URL
            var url = [ config.apiHost, config.apiNamespace, 'users/login' ].join('/');

            // Authenticate the user
            var post = Ember.$.ajax({
                type: 'POST',
                url: url,
                data: {
                    username: options.username,
                    password: options.password
                }
            });

            // Handle success
            post.done(function (data) {
                Ember.run(resolve(data));
            });

            // Handle failure
            post.fail(function (err) {
                Ember.run(reject(err));
            });
        });
    },
    invalidate: function () {
        return new Ember.RSVP.Promise(function(resolve, reject) {

            // Prepare URL
            var url = [ config.apiHost, config.apiNamespace, 'users/logout' ].join('/');

            // Log the user out and refresh the page
            var post = Ember.$.ajax({
                type: 'POST',
                url: url
            });

            // Handle success
            post.done(function (data) {
                Ember.run(resolve(data));
            });

            // Handle failure
            post.fail(function (err) {
                Ember.run(reject(err));
            });
        });
    }
});
