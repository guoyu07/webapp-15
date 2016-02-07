/**
 * Ember component for host membership status.
 */
import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({

  user: null,

  classNames: ['panel'],
  classNameBindings: ['panelClass'],

  /**
   * Returns the CSS class of the panel based on the host's membership status.
   */
  panelClass: computed('user.hasHostMemberships', 'user.latestHostMembership.isStillValidInAMonth', function() {
    const hasHostMemberships = this.get('user.hasHostMemberships');
    const stillGoodInAMonth = this.get('user.latestHostMembership.isStillValidInAMonth');

    let panelClass = 'panel-success';
    if (!hasHostMemberships) {
      panelClass = 'panel-warning';
    } else if (!stillGoodInAMonth) {
      panelClass = 'panel-warning';
    }

    return panelClass;
  })
});
