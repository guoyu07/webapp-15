/**
 * Created by guillaumez on 4/5/2014.
 */

App.UsersIndexController = Ember.ArrayController.extend({
    needs: ['users'],
    contentBinding: 'controllers.users.arrangedContent'
});