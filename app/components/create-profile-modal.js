/**
 * Ember component for create profile modal
 */
import Ember from 'ember';

export default Ember.Component.extend({
    hasBeendisplayed : false,

    displayed: function () {

        if (this.get('session.user.wwoofer.isFulfilled') === false)
            return;

        if (this.get('session.user.host.isFulfilled') === false)
            return;

        if (this.get('session.user.wwoofer.id') == null && this.get('session.user.host.id') == null && this.get('hasBeendisplayed') === false)
        {
            $('#createprofileModal').modal('show');
            this.set('hasBeendisplayed', true);
        }
    }.observes('session.user.wwoofer.isFulfilled','session.user.wwoofer.id', 'session.user.host.isFulfilled', 'session.user.host.id')
});
