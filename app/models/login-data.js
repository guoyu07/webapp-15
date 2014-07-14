/**
 * Ember data transfer object for the login form.
 */
import Ember from 'ember';
import ValidationsMixin from '../mixins/validations';
import Regex from '../utils/regex';

export default Ember.Object.extend(ValidationsMixin, {
    username: null,
    password: null,

    validations: {
        username: {
            presence: true,
            format: {
                with: Regex.EMAIL_ADDRESS
            }
        },
        password: {
            presence: true
        }
    }
});