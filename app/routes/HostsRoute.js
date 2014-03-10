/**
 * Created by guillaumez on 2/24/14.
 */

App.HostsRoute = Ember.Route.extend({

    setupController: function (controller) {
        this.store.find('host', controller.get('parameters'))
            .then(function (hosts) {
                controller.set('content', hosts);
            });
    },
    actions: {

        'searchHosts': function () {

            var controller = this.controllerFor('hosts');

            this.store.find('host', controller.get('parameters'))
                .then(function (hosts) {
                    controller.set('content', hosts);
                });

        },
        'loadMoreHosts': function () {

            // Initialize variables
            var controller = this.controllerFor('hosts'),
                newOffset = controller.get('store').metadataFor('host').offset + 20,
                params = Ember.$.extend(true, controller.get('parameters') || {}, {offset: newOffset});

            // Find next page of content and update
            controller.store.find('host', params).then(function (hosts) {

                var controllerContent = controller.get('content');
                controllerContent.addObjects(hosts.get('content'));
            });

        }
    }
});