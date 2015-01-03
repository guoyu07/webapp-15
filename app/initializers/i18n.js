import Ember from 'ember';

export default {
    name: 'i18n',

    initialize: function (container, app) {

        // Defer loading the application until translation file is loaded
        app.deferReadiness();

        // Attempt to get current locale
        var locale = Ember.$.cookie('locale') || window.navigator.userLanguage || window.navigator.language;

        // Set locale for plurals
        Ember.I18n.locale = locale;

        // Set locale for moment.js
        moment.locale(locale);

        // Inject locale variable in all controllers
        app.register('locale:main', locale, { instantiate: false });
        app.inject('controller', 'locale', 'locale:main');

        // Enable attribute/property translation for form controls
        Ember.TextField.reopen(Ember.I18n.TranslateableAttributes);
        Ember.TextArea.reopen(Ember.I18n.TranslateableAttributes);
        Ember.Select.reopen(Ember.I18n.TranslateableProperties);

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
