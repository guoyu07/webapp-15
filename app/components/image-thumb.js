import Ember from 'ember';

export default Ember.Component.extend({

    attributeBindings: ['style'],

    /**
     * The complete url of the image to be displayed.
     */
    url: null,

    /**
     * Returns the complete style tag based on the url.
     */
    style: Ember.computed('url', function () {
        var url = this.get('url');
        if (!Ember.isEmpty(url)) {
            var style = `background:url(${url}) center center; background-size:cover`;
            return style.htmlSafe();
        }
    })
});
