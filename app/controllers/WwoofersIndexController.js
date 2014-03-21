/**
 * Created by guillaumez on 3/9/14.
 */

App.WwoofersIndexController = Ember.ArrayController.extend({
    needs: ['wwoofers'],
    contentBinding: 'controllers.wwoofers.arrangedContent'
});