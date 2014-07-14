/**
 * Ember controller for hosts.
 */
App.HostsController = Ember.ArrayController.extend({

    needs: ['countries'],

    countries: function () {
        return this.get('controllers.countries').filter(function (country) {
            return country.get('isFrance');
        })
    }.property('controllers.countries.@each')

});