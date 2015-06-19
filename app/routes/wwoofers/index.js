/**
 * Ember route for wwoofers index.
 */
import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    countriesService: Ember.inject.service('countries'),

    beforeModel: function (transition) {
        this._super(transition);
        this.controllerFor('wwoofers.index').set('isLoading', true);
    },
    model: function (params) {
        return Ember.RSVP.hash({
            wwoofers: this.store.find('wwoofer', params),
            // Pre-load the countries so the queryParams binding
            // with the select menu work properly
            countries: this.get('countriesService.countries')
        });
    },
    afterModel: function() {
        this.controllerFor('wwoofers.index').set('isLoading', false);
    },
    setupController(controller, results) {
        controller.set('model', results.wwoofers);
    },
    actions: {
        searchWwoofers: function () {
            this.refresh();
        }
    }
});
