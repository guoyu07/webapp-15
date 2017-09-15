import DS from 'ember-data';

/**
 * Maintain until December 2017 (at least) to guarantee redirects to user profile.
 */
export default DS.Model.extend({
  user: DS.belongsTo('user', { async: true })
});
