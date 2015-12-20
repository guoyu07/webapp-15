import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  departmentsService: service('departments'),
  allowClear: false
});
