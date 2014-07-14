/**
 * Custom App REST adapter.
 */
import DS from "ember-data";

export default DS.RESTAdapter.extend({
    namespace: 'api',
    ajaxError: function (jqXHR) {
        var error = this._super(jqXHR);

        // Redirect user to login page if we get a 401 from the API
        if (jqXHR && jqXHR.status === 401) {

            // Clear the user
            localStorage.removeItem("user");

            // Logs the user out (redirects to login)
            window.location.replace('/logout');
        }
        return error;
    }
});

