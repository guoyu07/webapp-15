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
  panelClass: computed('user.hasActiveHostMembership', function() {
    const hasActiveHostMembership = this.get('user.hasActiveHostMembership');

    let panelClass = 'panel-success';
    if (!hasActiveHostMembership) {
      panelClass = 'panel-warning';
    }

    return panelClass;
  })
});
