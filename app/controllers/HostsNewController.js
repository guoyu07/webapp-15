/**
 * Created by guillaumez on 3/11/14.
 */


App.HostEditController = Ember.ObjectController.extend({
    actions: {
        "saveHost": function () {
            var content = this.get('content');

            // TODO: make to create/update model depending on controller state

            content.save().then(null, function () {
                content.rollback();
            });
        }
    }
});