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
                this.route('membership');
            });
        }),
        this.resource('login', { path: '/login' }),
        this.resource('users', { path: '/users' }, function () {
            this.route("new");
            this.resource("user", { path: "/:user_id" }, function () {
                this.route("edit");
            });
        })
});

App.Router.reopen({
    location: window.history.replaceState ? "history" : "hash",
    rootURL: "/app"
});