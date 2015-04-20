/**
 * Ember component to display a bootstrap carousel.
 */
import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    classNames: ['carousel', 'slide'],
    attributeBindings: ['dataRide:data-ride'],
    dataRide: 'carousel',

    anchorId: function () {
        return '#' + this.get('elementId');
    }.property('elementId'),

    /**
     * Returns the photo to display.
     * If no photo were provided, return the default wwoof picture.
     */
    displayedPhotos: function () {
        var photos = this.get('photos');
        if (Ember.isEmpty(photos)) {
            photos = [
                {
                    asBackground: 'background:url(assets/images/wwoof-no-photo.png) center center; background-size:cover;',
                    caption: Ember.I18n.t('host.index.noPhotoCaption')
                }
            ];
        }
        return photos;
    }.property('photos'),

    didInsertElement: function () {

        // Set active class on first photo
        Ember.$('.carousel-inner div.item').first().addClass('active');
        Ember.$('.carousel-indicators li').first().addClass('active');

        // Add values to data-slide-to items
        Ember.$('.carousel-indicators li').each(function (index, li) {
            Ember.$(li).attr('data-slide-to', index);
        });

        // Start the carousel
        Ember.$('.carousel').carousel();
    }
});
