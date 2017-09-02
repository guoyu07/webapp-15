import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({

  users: [],

  queryParams: ['page', 'itemsPerPage', 'searchTerm', 'isSuspended'],

  page: 1,
  itemsPerPage: 20,
  isLoading: false,

  searchTerm: '',
  isSuspended: false,

  /**
   * Process the total number of pages that can be displayed.
   */
  totalPages: computed('users.meta.total', 'itemsPerPage', function() {
    const totalItems = this.get('users.meta.total');
    const itemsPerPage = this.get('itemsPerPage');
    return Math.ceil(totalItems / itemsPerPage);
  }),

  actions: {
    impersonateUser(email) {

      // Authenticate user
      let auth = this.get('session').authenticate('authenticator:impersonation', { email });

      auth.then(()=> {
        this.get('notify').success(this.get('i18n').t('notify.userImpersonated', { email }));

        // Refresh the app
        this.send('userImpersonated');
      });
    }
  }
});
