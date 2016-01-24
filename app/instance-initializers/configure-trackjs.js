export function initialize(application) {
  const trackJs = application.container.lookup('service:trackjs');

  trackJs.configure({
    /**
     * Filters errors before reporting them to trackjs.
     * Invalidates the client session if the server returns 401.
     */
    onError(payload, err) {
      let reportError = true;

      let notifyService = application.container.lookup('service:notify');
      let i18nService = application.container.lookup('service:i18n');

      // Handle unauthorized errors
      if (String(err).indexOf('401') > -1) {
        reportError = false;

        let applicationController = application.container.lookup('controller:application');
        let sessionService = application.container.lookup('service:session');

        // Ignore errors from login page
        if (applicationController && applicationController.get('currentRouteName') !== 'login') {

          // Notify user
          notifyService.error(i18nService.t('notify.unauthorizedError'));

          // Invalidate session or redirect
          if (sessionService.get('isAuthenticated')) {
            sessionService.invalidate();
          } else {
            window.location.replace("/login");
          }
        }
      } else if (payload && payload.entry === 'ajax') {
        // Handle other Ajax errors
        notifyService.error({ html: i18nService.t('notify.submissionError') });
      }

      return reportError;
    }
  });
}

export default {
  name: 'configure-trackjs',
  initialize: initialize
};
