import Ember from 'ember';

export function initialize(application) {
  let i18n = application.container.lookup('service:i18n');
  Ember.I18n = i18n;
}

export default {
  name: 'legacy-i18n',
  initialize: initialize
};
