import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveHost() {

      // Get the host
      let host = this.get('host');

      // Reset website to null to pass server-side validation (accepts only null, not empty strings)
      if (Ember.isEmpty(host.get('webSite'))) {
        host.set('webSite', null);
      }

      // Validate the host
      const validation = host.validate();

      validation.then(()=> {

        // Create the host
        let promise = host.save();

        // Inform and redirect user to the address page
        promise.then(()=> {
          this.get('notify').success(this.get('i18n').t('notify.hostCreated'));
          this.transitionToRoute('host.address', host);
        });
      }).catch(()=> {
        this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
      });
    }
  }
});
