/**
 * Created by guillaumez on 4/5/2014.
 */

App.User = DS.Model.extend({
    username: DS.attr('string'),
    password: DS.attr('string'),
    firstName: DS.attr('string'),
    lastName: DS.attr('string')
});