import Ember from 'ember';

export default {
    name: 'bootstrap',

    initialize: function () {
        // Automatically bind data-toggle and data-target attributes on link-to
        Ember.LinkView.reopen({
            attributeBindings: ['data-toggle', 'data-target']
        });
    }
}
