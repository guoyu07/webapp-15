/**
 * Created by guillaumez on 2/26/14.
 */

App.Department = DS.Model.extend({
    code: DS.attr('string'),
    name: DS.attr('string'),
    region: DS.attr('string')
});