/**
 * Custom App REST adapter.
 */
import DS from "ember-data";

export default DS.RESTAdapter.extend({
    host: WebappENV.SERVER_BASE_URL,
    namespace: 'api',
    ajax: function (url, method, hash) {
        if (WebappENV.environment === 'development') {
            // Add support for cross-origin resource sharing (localhost only)
            hash = hash || {}; // hash may be undefined
            hash.crossDomain = true;
            hash.xhrFields = { withCredentials: true };
        }
        return this._super(url, method, hash);
    },
    ajaxError: function (jqXHR) {
        var error = this._super(jqXHR);

        // Redirect user to login page if we get a 401 from the API
        if (jqXHR && jqXHR.status === 401) {

            // Clear the user
            localStorage.removeItem("user");

            // Logs the user out (redirects to login)
            window.location.replace(WebappENV.SERVER_BASE_URL + '/logout');
        }
        return error;
    }
});

