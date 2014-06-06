/**
 * Custom App REST adapter.
 */

App.ApplicationAdapter = DS.RESTAdapter.extend({
    namespace: 'api',
    headers: {
        'Authorization': localStorage['token'] ? 'Bearer ' + localStorage['token'] : null
    },
    ajaxError: function (jqXHR) {
        var error = this._super(jqXHR);

        // Redirect user to login page if authentication fails
        if (jqXHR && jqXHR.status === 401) {

            // Clear the user
            this.set('currentUser', null);

            // Redirect to login
            window.location.replace('/logout');
        }
        return error;
    }
});

