window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchMessage: "Ember.create is deprecated in favor of Object.create" },
    { handler: "silence", matchMessage: "`Ember.Handlebars.registerBoundHelper` is deprecated. Please refactor to use `Ember.Helpers.helper`." },
    { handler: "silence", matchMessage: "In Ember 2.0 service factories must have an `isServiceFactory` property set to true. You registered (unknown mixin) as a service factory. Either add the `isServiceFactory` property to this factory or extend from Ember.Service." },
    { handler: "silence", matchMessage: "Ember.Select is deprecated. Consult the Deprecations Guide for a migration strategy." },
    { handler: "silence", matchMessage: "Ember.View is deprecated. Consult the Deprecations Guide for a migration strategy." },
    { handler: "silence", matchMessage: "A property of <webapp@view:-outlet::ember522> was modified inside the didInsertElement hook. You should never change properties on components, services or models during didInsertElement because it causes significant performance degradation." },
    { handler: "silence", matchMessage: "Ember.keys is deprecated in favor of Object.keys" },
    { handler: "silence", matchMessage: "You modified ShouldDisplay(hasVisibleFeatures) twice in a single render. This was unreliable in Ember 1.x and will be removed in Ember 2.0" },
    { handler: "silence", matchMessage: "Your custom serializer uses the old version of the Serializer API, with `extract` hooks. Please upgrade your serializers to the new Serializer API using `normalizeResponse` hooks instead." },
    { handler: "silence", matchMessage: "In Ember Data 2.0, relationships will be asynchronous by default. You must set `user: DS.belongsTo('user', { async: false })` if you wish for a relationship remain synchronous." },
    { handler: "silence", matchMessage: "Calling store.find() with a query object is deprecated. Use store.query() instead." },
    { handler: "silence", matchMessage: "store.push(type, data) has been deprecated. Please provide a JSON-API document object as the first and only argument to store.push." },
    { handler: "silence", matchMessage: "Using store.find(type) has been deprecated. Use store.findAll(type) to retrieve all records for a given type." },
    { handler: "silence", matchMessage: "The default behavior of shouldReloadAll will change in Ember Data 2.0 to always return false when there is at least one \"country\" record in the store. If you would like to preserve the current behavior please override shouldReloadAll in your adapter:application and return true." },
    { handler: "silence", matchMessage: "Using store.pushMany() has been deprecated since store.push() now handles multiple items. You should use store.push() instead." },
    { handler: "silence", matchMessage: "In Ember Data 2.0, relationships will be asynchronous by default. You must set `address: DS.belongsTo('address', { async: false })` if you wish for a relationship remain synchronous." },
    { handler: "silence", matchMessage: "The default behavior of shouldReloadAll will change in Ember Data 2.0 to always return false when there is at least one \"department\" record in the store. If you would like to preserve the current behavior please override shouldReloadAll in your adapter:application and return true." },
    { handler: "silence", matchMessage: "The default behavior of `shouldBackgroundReloadRecord` will change in Ember Data 2.0 to always return true. If you would like to preserve the current behavior please override `shouldBackgroundReloadRecord` in your adapter:application and return false." },
    { handler: "silence", matchMessage: "In Ember Data 2.0, relationships will be asynchronous by default. You must set `photos: DS.hasMany('photo', { async: false })` if you wish for a relationship remain synchronous." }
  ]
};
