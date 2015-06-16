import Ember from 'ember';

export default Ember.Component.extend({

    /**
     * Retrieves and returns the photo model based on the photo ID.
     */
    photo: function() {
        var photoId = this.get('photoId');
        if (!Ember.isEmpty(photoId)) {
            return this.container.lookup("store:main").find('photo', photoId);
        }
    }.property('photoId')

});
