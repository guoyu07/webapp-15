import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveHost() {

      // Get host and address
      let host = this.get('model');

      // Get the user (async)
      host.get('user').then((user)=> {

        // Reset website to null to pass server-side validation (only accept null, and not empty string)
        if (Ember.isEmpty(host.get('webSite'))) {
          host.set('webSite', null);
        }

        // Prepare validation promises
        const validations = [host.validate(), user.validate()];

        // Validate all models
        Ember.RSVP.all(validations).then(()=> {

          // Prepare update promises
          const updates = [host.save(), user.save()];

          // Update host and address
          Ember.RSVP.all(updates).then(()=> {
            this.get('notify').success(this.get('i18n').t('notify.informationUpdated'));
            window.scrollTo(0, 0);
          });
        }).catch(()=> {
          this.get('notify').error(this.get('i18n').t('notify.submissionInvalid'));
          window.scrollTo(0, 0);
        });
      });
    }
  }
});
