Ember.Handlebars.helper('error-display', function (errors) {
    if (errors && errors.get('length')) {
        var html = '<span class="error">%@</span>'.fmt(errors.get('firstObject'));
        return new Ember.Handlebars.SafeString(html);
    } else {
        return "";
    }
}, '@each');
