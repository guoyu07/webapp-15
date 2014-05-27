var App = window.App = Ember.Application.create();

require('adapter');
require('serializer');
require('router');

var folderOrder = [ 'lib', 'routes', 'mixins', 'models', 'views', 'controllers', 'components', 'helpers', 'templates', 'serializers' ];

folderOrder.forEach(function (folder) {
    window.require.list().filter(function (module) {
        return new RegExp("^" + folder + "/").test(module);
    }).forEach(function (module) {
        require(module);
    });
});