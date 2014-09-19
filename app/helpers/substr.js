import Ember from 'ember';

export default Ember.Handlebars.registerBoundHelper('substr', function(value, options) {
    var opts = options.hash;
    var start = opts.start || 0;
    var len = opts.max;
    var out = value.substr(start, len);
    if (value.length > len) {
        out += '...';
    }
    return new Ember.Handlebars.SafeString(out);
});