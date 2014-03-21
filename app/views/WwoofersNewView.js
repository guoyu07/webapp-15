/**
 * Created by guillaumez on 3/16/14.
 */

App.WwoofersNewView = Ember.View.extend({
    didInsertElement: function () {
        $('#datetimepicker1').datetimepicker({
            pickTime: false,
            viewMode: 'years'
        });
        $('#datetimepicker2').datetimepicker({
            pickTime: false,
            viewMode: 'years'
        });
    }
});