App.Router.map(function () {
    this.resource('hosts', { path: '/hosts' }, function () {
        this.resource("host", { path: "/:host_id" }, function () {
            this.route("edit");
        });
    }),
        this.resource('photos', { path: '/photos' }, function () {
            // additional child routes here later
        }),
        this.resource('wwoofers', { path: '/wwoofers' }, function () {
            // additional child routes here later
        })
});

App.PhotosIndexRoute = Ember.Route.extend({
    model: function () {
        return this.store.find('photo').then(function (photos) {
            console.log(photos);
            console.log("found " + photos.get('length') + " photos");
            return photos;
        });
    }
});