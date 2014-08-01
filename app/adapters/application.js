/**
 * Custom App REST adapter.
 */
import DS from "ember-data";

export default DS.RESTAdapter.extend({
    namespace: 'api',
    ajaxError: function (jqXHR) {
        var error = this._super(jqXHR);

        // Refresh the page if we get a 401 from the API
        if (jqXHR && jqXHR.status === 401) {

            // Clear the user
            localStorage.removeItem("user");

            // Logs the user out and refresh the page
            Ember.$.ajax({
                type: 'POST',
                url: '/api/users/logout'
            }).done(function () {
                location.reload();
            });
        }
        return error;
    }
});

