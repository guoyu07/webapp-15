import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper('substr', function(property, options) {
    var str = Ember.get(this, property);
    var opts = options.hash;
    var start = opts.start || 0;
    var len = opts.max;
    var out = str.substr(start, len);
    if (str.length > len) {
        out += '...';
    }
    return new Ember.Handlebars.SafeString(out);
});