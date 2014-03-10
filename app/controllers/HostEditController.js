/**
 * Created by guillaumez on 2/26/14.
 */

App.HostEditController = Ember.ObjectController.extend({
    actions: {
        "saveHost": function () {
            var content = this.get('content');
            {
                {
                    debugger
                }
            }
            content.save().then(null, function () {
                content.rollback();
            });
        }
    }
});