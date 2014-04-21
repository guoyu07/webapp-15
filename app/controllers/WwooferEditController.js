App.WwoofersEditController = Ember.ObjectController.extend({
    countries: function () {
        return this.store.find('country');
    }.property()
});