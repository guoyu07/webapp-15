import Ember from 'ember';

export default {
    name: 'i18n',

    initialize: function () {

        // Set default language
        Ember.I18n.locale = "en";

        // Get locale file from server
        var request = Ember.$.get('/public/locales/en.json');

        // Load translations
        request.done(function (data) {
            Ember.I18n.translations = data;
        });

        request.fail(function () {
            Ember.Logger.error('Could not load localization files.');
        });
    }
};