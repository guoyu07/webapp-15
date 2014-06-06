/**
 * Ember data transfer object for the login form.
 */
App.LoginData = Ember.Object.extend(App.Validations.Mixin, {
    username: null,
    password: null,

    validations: {
        username: {
            presence: true,
            format: {
                with: App.Regex.EMAIL_ADDRESS
            }
        },
        password: {
            presence: true
        }
    }
});