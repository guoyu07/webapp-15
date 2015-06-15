import Ember from 'ember';

export default Ember.Component.extend({

    /**
    * Farm photo complete URL
    */
    photo: function () {
        var photoId = this.get('photoId');
        if (!Ember.isEmpty(photoId)) {
            return this.container.lookup("store:main").find('photo', photoId);
        }
    }.property('photoId')

});
