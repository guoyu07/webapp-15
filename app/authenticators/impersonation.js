/**
 * Custom authenticator for admin impersonation.
 */
import Ember from 'ember';
import config from '../config/environment';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

export default BaseAuthenticator.extend({
  restore: function(data) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!Ember.isEmpty(data.userId)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },
  authenticate: function(options) {
    return new Ember.RSVP.Promise(function(resolve, reject) {

      // Prepare URL
      var url = [config.apiHost, config.apiNamespace, 'users/impersonate'].join('/');

      // Impersonate the user
      var post = Ember.$.ajax({
        type: 'POST',
        url: url,
        data: {
          email: options.impersonatedUserEmail
        }
      });

      // Handle success
      post.done(function(data) {
        resolve({ userId: data.user.id });
      });

      // Handle failure
      post.fail(function(err) {
        reject(err);
      });
    });
  },
  invalidate: function() {
    return new Ember.RSVP.Promise(function(resolve, reject) {

      // Prepare URL
      var url = [config.apiHost, config.apiNamespace, 'users/logout'].join('/');

      // Log the user out and refresh the page
      var post = Ember.$.ajax({
        type: 'POST',
        url: url
      });

      // Handle success
      post.done(function(data) {
        resolve(data);
      });

      // Handle failure
      post.fail(function(err) {
        reject(err);
      });
    });
  }
});
