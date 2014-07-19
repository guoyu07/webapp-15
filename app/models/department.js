/**
 * Created by guillaumez on 2/26/14.
 */
import DS from 'ember-data';
import ValidationsMixin from '../mixins/validations';

export default DS.Model.extend(ValidationsMixin, {
    code: DS.attr('string'),
    name: DS.attr('string'),
    region: DS.attr('string')
});