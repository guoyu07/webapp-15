import Ember from 'ember';

export default {
    name: 'i18n',

    initialize: function () {

        // Set default locale for plurals based on browser's language
        Ember.I18n.locale = window.navigator.userLanguage || window.navigator.language;

        // Enable attribute/property translation for form controls
        Ember.TextField.reopen(Ember.I18n.TranslateableAttributes);
        Ember.TextArea.reopen(Ember.I18n.TranslateableAttributes);
        Ember.Select.reopen(Ember.I18n.TranslateableProperties);

        // Get locale file from server
        var request = Ember.$.get('/api/translations');

        // Load translations
        request.done(function (data) {
            Ember.I18n.translations = data;
        });

        request.fail(function () {
            Ember.Logger.error('Could not load localization file.');
        });
    }
};
