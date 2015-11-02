/**
 * Ember route for users (admin).
 */
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    queryParams: {
        page: {
            refreshModel: true
        }
    },

    beforeModel(transition) {
        this._super(transition);
        this.controllerFor('users.index').set('isLoading', true);
    },

    model(params) {

        var page = params.page || 1;
        var limit = params.itemsPerPage || 20;
        var offset = (page - 1) * limit;
        var userParams = Ember.merge(params, {
            offset: offset,
            limit: limit
        });

        return this.store.find('user', userParams);
    },

    afterModel() {
        this.controllerFor('users.index').set('isLoading', false);
    },

    setupController(controller, results) {
        controller.set('users', results);
    },

    actions: {
        search() {
            this.refresh();
        }
    }
});
