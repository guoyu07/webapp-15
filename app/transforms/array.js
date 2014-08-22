import Ember from 'ember';
import DS from 'ember-data';

export default DS.Transform.extend({

    /**
     * If the outgoing json is already a valid javascript array
     * then concatenate its values to a comma separated string.
     * In all other cases, replace it with an empty array.
     * This means null or undefined values automatically become
     * empty arrays when serializing this type.
     */
    serialize: function (serialized) {
        return Ember.typeOf(serialized) === 'array' ? serialized.filter(function (e) {
            return e; // remove empty entries
        }).join(',') : '';
    },

    /**
     * If the incoming data is a javascript array, pass it through.
     * If it is a string, then coerce it into an array by splitting
     * it on commas and trimming whitespace on each element.
     * Otherwise pass back an empty array.  This has the effect of
     * turning all other data types (including nulls and undefined
     * values) into empty arrays.
     */
    deserialize: function (deserialized) {
        switch (Ember.typeOf(deserialized))
        {
            case 'array':
                return deserialized;
            case 'string':
                return deserialized.split(',').map(function (item) {
                    return Ember.$.trim(item);
                });
            default:
                return [];
        }
    }
});
