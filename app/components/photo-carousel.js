import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['carousel', 'slide', 'host-carousel'],
  attributeBindings: ['dataRide:data-ride'],
  dataRide: 'carousel',

  anchorId: computed('elementId', function() {
    return `#${this.get('elementId')}`;
  }),

  didInsertElement() {

    // Set active class on first photo
    Ember.$('.carousel-inner div.item').first().addClass('active');
    Ember.$('.carousel-indicators li').first().addClass('active');

    // Add values to data-slide-to items
    Ember.$('.carousel-indicators li').each(function(index, li) {
      Ember.$(li).attr('data-slide-to', index);
    });

    // Start the carousel
    Ember.$('.carousel').carousel();
  }
});
