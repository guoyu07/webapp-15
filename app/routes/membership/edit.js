import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import moment from 'moment';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  membershipsService: service('memberships'),

  setupController(controller, model) {
    controller.set('membership', model);
    if (model.get('birthDate2')) {
      controller.set('selectedDate', moment(model.get('birthDate2')));
    }
    if (model.get('paymentType')) {
      let paymentTypeId = model.get('paymentType');
      let paymentType = this.get('membershipsService.paymentTypeOptions').findBy('id', paymentTypeId);
      controller.set('paymentType', paymentType);
    }
  }
});
