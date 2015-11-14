/**
 * Ember component for wwoofer membership status.
 */
import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({

  user: null,

  classNames: ['panel'],
  classNameBindings: ['panelClass'],

  /**
   * Returns the CSS class of the panel based on the wwoofer's membership status.
   */
  panelClass: computed('user.hasWwoofMemberships', 'user.latestWwoofMembership.isStillValidInAMonth', function() {
    var hasWwoofMemberships = this.get('user.hasWwoofMemberships');
    var stillGoodInAMonth = this.get('user.latestWwoofMembership.isStillValidInAMonth');

    var panelClass = 'panel-success';
    if (!hasWwoofMemberships) {
      panelClass = 'panel-warning';
    } else if (!stillGoodInAMonth) {
      panelClass = 'panel-warning';
    }

    return panelClass;
  })
});
