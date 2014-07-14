/**
 * Ember route for host edition.
 */
import Ember from 'ember';

export default Ember.Route.extend({
    setupController: function (controller, model) {
        this._super(controller, model);
        var self = this;
        this.store.find('membership', { userId: this.controllerFor('application').get('currentUser.id') }).then(function (memberships) {
            self.controllerFor('memberships').set('content', memberships);
        });
    },
    renderTemplate: function () {
        this.render('hosts/new', { controller: 'host.edit' });
    }
});