/**
 * Ember model for countries.
 */
import DS from 'ember-data';
import ValidationsMixin from '../mixins/validations';

export default DS.Model.extend(ValidationsMixin, {
    code: DS.attr('string'),
    name: DS.attr('string'),
    isFrance: function () {
        return this.get('code') === 'FR';
    }.property('id', 'code')
});