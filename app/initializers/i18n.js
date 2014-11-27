import Ember from 'ember';

export default {
    name: 'i18n',

    initialize: function (container, app) {

        // Set default locale for plurals based on browser's language
        Ember.I18n.locale = window.navigator.userLanguage || window.navigator.language;

        // Enable attribute/property translation for form controls
        Ember.TextField.reopen(Ember.I18n.TranslateableAttributes);
        Ember.TextArea.reopen(Ember.I18n.TranslateableAttributes);
        Ember.Select.reopen(Ember.I18n.TranslateableProperties);

        // Defer loading the application until translation file is loaded
        app.deferReadiness();

        // Get locale file from server
        var request = Ember.$.get('/api/translations');

        // Load translations
        request.done(function (data) {
            Ember.I18n.translations = data;

            // Continue to render the application
            app.advanceReadiness();
        });

        request.fail(function () {
            Ember.Logger.error('Could not load localization file.');
        });
    }
};
