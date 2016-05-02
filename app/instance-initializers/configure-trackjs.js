export function initialize(application) {
  const trackJs = application.lookup('service:trackjs');

  trackJs.configure({
    /**
     * Filters errors before reporting them to trackjs.
     */
    onError(payload, err) {
      let reportError = true;

      if (String(err).indexOf('401') > -1) {
        reportError = false;
      } else if (String(err).indexOf('404') > -1) {
        reportError = false;
      }

      return reportError;
    }
  });
}

export default {
  name: 'configure-trackjs',
  initialize
};
