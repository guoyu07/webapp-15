import Ember from 'ember';
import config from 'webapp/config/environment';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

const { service } = Ember.inject;

export default BaseAuthenticator.extend({

  ajax: service('ajax'),

  restore(data) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (data && data.user && !Ember.isEmpty(data.user.id)) {
        // Prepare URL
        const url = [config.apiHost, config.apiNamespace, 'users/is-authenticated'].join('/');

        this.get('ajax').request(url).then(()=> {
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
    const url = [config.apiHost, config.apiNamespace, 'users/login'].join('/');

    // Log the user in
    return this.get('ajax').request(url, {
      method: 'POST',
      data: {
        username: options.username,
        password: options.password
      }
    });
  },
  invalidate() {
    // Prepare URL
    const url = [config.apiHost, config.apiNamespace, 'users/logout'].join('/');

    // Log the user out
    return this.get('ajax').request(url, {
      method: 'POST'
    });
  }
});
