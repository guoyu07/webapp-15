/**
 * Custom App REST adapter.
 */
import DS from "ember-data";

export default DS.RESTAdapter.extend({
    host: 'http://localhost:3333',
    namespace: 'api',
    ajax: function (url, method, hash) {
        hash = hash || {}; // hash may be undefined

        // Add support for cross-origin resource sharing (localhost only)
        // TODO: make sure those header are added in dev mode only
        hash.crossDomain = true;
        hash.xhrFields = { withCredentials: true };
        return this._super(url, method, hash);
    },
    ajaxError: function (jqXHR) {
        var error = this._super(jqXHR);

        // Redirect user to login page if we get a 401 from the API
        if (jqXHR && jqXHR.status === 401) {

            // Clear the user
            // localStorage.removeItem("user");

            // Logs the user out (redirects to login)
            // window.location.replace('http://localhost:3333/logout');
        }
        return error;
    }
});

