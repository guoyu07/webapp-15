/**
 * Custom session for ember-simple-auth.
 */
import Ember from 'ember';
import Session from 'simple-auth/session';

export default Session.extend({
    user: function() {
        var userId = this.get('userId');
        if (!Ember.isEmpty(userId)) {
            return this.container.lookup('store:main').find('user', userId);
        }
    }.property('userId')
});