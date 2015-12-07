import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Service.extend({

  session: service('session'),
  i18n: service('i18n'),

  /**
   * Handles HTTP errors.
   * @param err The error.
   * @param status The status code.
   * @private
   */
  _handleHttpError: function(err, status) {
    switch (status) {

      // Special handling for 401 errors
      case 401:

        var applicationController = this.container.lookup('controller:application');

        // Ignore errors from login page
        if (applicationController && applicationController.get('currentRouteName') === 'login') {
          return;
        }

        // Notify user
        this.get('notify').error(this.get('i18n').t('notify.unauthorizedError'));

        // Invalidate session or redirect
        if (this.get('session.isAuthenticated')) {
          this.get('session').invalidate();
        } else {
          window.location.replace("/login");
        }
        break;

      default:

        this.get('notify').error(this.get('i18n').t('notify.submissionError'));
        trackJs.track(this._convertToError(err));
        Ember.Logger.assert(false, err);
        break;
    }
  },
  /**
   * Converts errors of type 'object' into actual errors.
   * @param err The error.
   * @returns {Error}
   * @private
   */
  _convertToError: function(err) {
    if (Ember.typeOf(err) === 'object') {
      var message = err.responseText || err.responseJson || err.message || err.toString();
      var status = err.status;
      err = new Error(message);
      if (status) {
        err.status = status;
      }
    }
    return err;
  },
  /**
   * Handles errors.
   * Filters errors that are "expected" (login failed, TransitionAborted, ...).
   * Logs errors to console and trackJs.
   * @param err
   */
  handleError: function(err) {

    // Handle ic-ajax errors
    if (err.jqXHR) {
      err = err.jqXHR;
    }

    let status = Ember.get(err, 'errors.firstObject.status');
    if (isNaN(status)) {
      // Ensure that error if of type error
      err = this._convertToError(err);

      // Do not log transition aborted errors
      if (err.message === 'TransitionAborted') {
        return;
      }

      // Log in trackJs and console
      trackJs.track(err);
      Ember.Logger.assert(false, err);
    } else {
      // Special handling for HTTP errors
      this._handleHttpError(err, parseInt(status, 10));
    }
  }
});
