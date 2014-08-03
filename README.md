# Wwoof France

This application is intended to facilitate the meeting of WWOOFers from all over the world with organic farmers in France.

The development of this application is done by volunteers and intended to eventually replace the current [WWOOF France](http://www.wwoof.fr) website.

## Getting started

This web application was developed with the javascript framework [Ember.js](http://emberjs.com/).
In order to run this application, you do not need to setup a web server: the command line tool 
[ember-cli](http://www.ember-cli.com) will bootstrap a simple web server and proxy all Ajax calls to a remote WWOOF server.
Note that the actual back-end application is also hosted on GitHub, [over there](https://github.com/wwoof/server).

### Install required software

1. Download and install [Git](http://git-scm.com/). Your terminal should recognize the command `git`.
2. Download and install [Node.js](http://nodejs.org). Your terminal should recognize the commands `node` and `npm`.
3. From your terminal, install [Bower](http://bower.io) via npm: `npm install -g bower`
4. From your terminal, install [ember-cli](http://www.ember-cli.com) via npm: `npm install -g ember-cli`

### Download the source code

1. From your terminal, download the source code: `git clone https://github.com/wwoof/webapp.git`
2. Then move to the project directory: `cd webapp`

### Run the application

1. Install all Node.js and Bower packages: `npm install & bower install`
2. Start the application: `npm start`
3. Browse to [http://localhost:4200](http://localhost:4200)