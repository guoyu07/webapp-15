import Ember from 'ember';

export default Ember.Component.extend({

  attributeBindings: ['style'],

  /**
   * The complete url of the image to be displayed.
   */
  url: null,

  /**
   * The height of the the thumbnail.
   */
  height: 200,

  /**
   * Returns the complete style tag based on the url.
   */
  style: Ember.computed('url', 'height', function() {
    const url = this.get('url');
    const height = this.get('height');
    if (!Ember.isEmpty(url)) {
      const style = `background:url(${url}) center center; background-size:cover; height: ${height}px; border-radius: 3px;`;
      return style.htmlSafe();
    }
  })
});
