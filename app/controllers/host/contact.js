/**
 * Ember controller for host contact.
 */
import Ember from 'ember';
import ValidationsMixin from '../../mixins/validations';

export default Ember.Controller.extend(ValidationsMixin, {

    message: null,

    messagePlaceholder: function () {
        return 'Bonjour ' + this.get('model.user.firstName') + '!';
    }.property('model.user.firstName'),

    validations: {
        message: {
            presence: true,
            length: { minimum: 50, maximum: 5000 }
        }
    }
});
