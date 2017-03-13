import Ember from 'ember';
import { isAjaxError, isNotFoundError, isUnauthorizedError } from 'ember-ajax/errors';

const { service } = Ember.inject;

export default Ember.Service.extend({

  notify: service('notify'),
  i18n: service('i18n'),
  session: service('session'),

  /**
   * Invalidates the client session if the server returns 401.
   */
  handleError(error) {

    Ember.assert(error);

    let status = Number(Ember.get(error, 'errors.firstObject.status'));

    if (isUnauthorizedError(error) || status === 401) {

      let currentUrl = window.location.href;

      // Ignore errors from login page
      if (currentUrl.indexOf('login') === -1) {

        this.get('notify').error(this.get('i18n').t('notify.unauthorizedError'));

        // Invalidate session or redirect
        if (this.get('session').get('isAuthenticated')) {
          this.get('session').invalidate();
        } else {
          window.location.replace('/login');
        }
      }
    } else if (isNotFoundError(error) || status === 404) {
      // Ignore 404s
    } else if (isAjaxError(error) || !isNaN(status)) {
      this.get('notify').error({ html: this.get('i18n').t('notify.submissionError') });
    }
  }
});
