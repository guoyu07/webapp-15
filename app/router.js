App.Router.map(function () {
    this.resource('hosts', { path: '/hosts' }, function () {
        this.route("new");
        this.resource("host", { path: "/:host_id" }, function () {
            this.route("edit");
        });
    }),
    this.resource('wwoofers', { path: '/wwoofers' }, function () {
        this.route("new");
        this.resource("wwoofer", { path: "/:wwoofer_id" }, function () {
            this.route("edit");
        });
    }),
    this.resource('login', { path: '/login' }),
    this.resource('photos', { path: '/photos' }, function () {
        // additional child routes here later
    })
});

App.Router.reopen({
    location: window.history.replaceState ? "history" : "hash",
    rootURL: "/app"
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