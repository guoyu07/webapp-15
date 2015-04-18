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
