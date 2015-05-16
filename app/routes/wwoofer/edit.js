/**
 * Ember route for wwoofer edition.
 */
import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    setupController: function (controller, wwoofer) {
        controller.set('selectedDate', moment(wwoofer.get('birthDate2')));
        controller.set('secondWwooferChecked', !Ember.isEmpty(wwoofer.get('firstName2')));
        this._super(controller, wwoofer);
    },
    renderTemplate: function () {
        this.render('wwoofer/form', { controller: 'wwoofer.edit' });
    }
});
