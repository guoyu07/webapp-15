/**
 * Ember controller for host creation.
 */
import Ember from 'ember';

export default Ember.Controller.extend({

  activitiesService: Ember.inject.service('activities'),
  monthsService: Ember.inject.service('months'),
  staysService: Ember.inject.service('stays'),
  lodgingsService: Ember.inject.service('lodgings'),

  actions: {
    saveHost() {

      // Get the host
      var host = this.get('model');

      // Get the host's user (async)
      host.get('user').then((user)=> {

        // Reset website to null to pass server-side validation (accepts only null, not empty strings)
        if (Ember.isEmpty(host.get('webSite'))) {
          host.set('webSite', null);
        }

        // Prepare validation promises
        var validations = [host.validate(), user.validate()];

        // Validate all models
        Ember.RSVP.all(validations).then(()=> {

          // Create the host
          var promise = host.save();

          // Save the user (phone number)
          promise = promise.then (()=> {
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
