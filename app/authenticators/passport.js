import Ember from 'ember';
import request from 'ic-ajax';
import config from 'webapp/config/environment';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

export default BaseAuthenticator.extend({
  restore(data) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (data && data.user && !Ember.isEmpty(data.user.id)) {
        // Prepare URL
        var url = [config.apiHost, config.apiNamespace, 'users/is-authenticated'].join('/');

        request(url).then(()=> {
          resolve(data);
        }).catch(()=> {
          reject();
        });
      } else {
        reject();
      }
    });
  },
  authenticate(options) {
    // Prepare URL
    var url = [config.apiHost, config.apiNamespace, 'users/login'].join('/');

    // Log the user in
    return request({
      type: 'POST',
      url: url,
      data: {
        username: options.username,
        password: options.password
      }
    });
  },
  invalidate() {
    // Prepare URL
    var url = [config.apiHost, config.apiNamespace, 'users/logout'].join('/');

    // Log the user out
    return request({
      type: 'POST',
      url: url
    });
  }
});
