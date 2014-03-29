/**
 * Custom App REST adapter.
 */

App.ApplicationAdapter = DS.RESTAdapter.extend({
    namespace: 'api/1',
    headers: {
        'Authorization': 'Bearer ' + localStorage['token']
    }
});