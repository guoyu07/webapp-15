import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveHost() {

      // Get the host
      let host = this.get('model');

      // Get the host's user (async)
      host.get('user').then((user)=> {

        // Reset website to null to pass server-side validation (accepts only null, not empty strings)
        if (Ember.isEmpty(host.get('webSite'))) {
          host.set('webSite', null);
        }

        // Prepare validation promises
        const validations = [host.validate(), user.validate()];

        // Validate all models
        Ember.RSVP.all(validations).then(()=> {

          // Create the host
          let promise = host.save();

          // Save the user (phone number)
          promise = promise.then(()=> {
            return user.save();
          });

          // Inform and redirect user to the address page
          promise.then(()=> {
            this.get('notify').success(this.get('i18n').t('notify.hostCreated'));
            this.transitionToRoute('host.address', host);
          });
        }).catch(()=> {
          this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
        });
      });
    }
  }
});
