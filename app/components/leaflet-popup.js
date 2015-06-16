import Ember from 'ember';

export default Ember.Component.extend({

    /**
     * Host id.
     */
    hostId: null,

    /**
     * Host farm name.
     */
    farmName: null,

    /**
     * Photo file name.
     */
    photo: null,

    /**
     * Returns the photo URL to display based on the photo property.
     */
    photoUrl: function() {
        var photo = this.get('photo');
        var photoUrl;
        if (Ember.isEmpty(photo)) {
            photoUrl = "assets/images/wwoof-no-photo.png";
        } else {
            photoUrl = "https://s3.amazonaws.com/wwoof-france/photos/hosts/" + photo;
        }
        return photoUrl;
    }.property('photo')

});
