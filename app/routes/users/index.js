/**
 * Ember route for users (admin).
 */
import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    queryParams: {
        page: {
            refreshModel: true
        }
    },

    model: function (params) {

        var page = params.page || 1;
        var limit = params.itemsPerPage || 20;
        var offset = (page - 1) * limit;

        return this.store.find('user', {
            offset: offset,
            limit: limit
        });
    }
});
