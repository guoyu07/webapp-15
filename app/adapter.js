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
            window.location.replace('/app/login');
        }
        return error;
    }
});

