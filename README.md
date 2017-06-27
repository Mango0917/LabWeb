[![Soundpad Logo](./public/images/logo.png)]

## About SoundpadLab
The SoundPad Lab uses 3D audio to create assistive technology, universally accessible interfaces, multi-modal interfaces, and to discover patterns in big data. We also research the perceptual requirements necessary to render realistic spatial sound using headphones in virtual environments.

Our research interests include Human Computer Interaction in the contexts of 3D Audio Processing, Multi-modal Interfaces, Psycho-acoustics, and Virtual Environments.

## To run site locally:

To run site:
* Download Repository from Github
* Navigate to project folder
* Run NPM install
* Run Bower install
* set environment variables:
* export MONGOLAB_URI='XXXXXX'; (this is to set mongo database url)
* export emailAddress='XXXX'(this is email to send notifications too)
* export PASSWORD='XXXX'(put your email password)
* export PRIVATE_KEY='XXX'(use private api key from google reCAPTCHA)
* run grunt (if this fails initially, you may need to use grunt -f)

Site is organized into modules for each major section on the site. Each module folder will have a client and server side folder, each with sections specific to that modules code. The client side will have the views and html files here, and the server side will have the database data models. 

### Git Workflow
* NEVER work on master branch.
* master branch should only be updated when dev branch is merged into it
* each feature/user story should have its own branch off of dev branch
* first person creating the feature branch off dev  should push the new branch so others can collaborate
```bash
git checkout -b branchName
git push origin branchName
```
* to collaborate, copy in the new feature branch from origin and switch into it:
```bash
git checkout -b branchName origin/branchName
```
* work on your feature branch only until it is ready to be integrated into the main project
* once it is ready, go on GitHub and send a Pull Request for this branch to be merged into dev branch

### Libraries used
* angular-file-upload 1.1.5,
* ngmap
* jquery
* angular-ui-calendar
* fullcalendar
* moment
* eonasdan-bootstrap-datetimepicker
* angular-recaptcha
* nya-bootstrap-select






This site runs using the Mean.js stack, described below:

[![MEAN.JS Logo](http://meanjs.org/img/logo-small.png)](http://meanjs.org/)

## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
  * Node v5 IS NOT SUPPORTED AT THIS TIME! 
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).
* Ruby - [Download & Install Ruby](https://www.ruby-lang.org/en/documentation/installation/)
* Bower - You're going to use the [Bower Package Manager](http://bower.io/) to manage your front-end packages. Make sure you've installed Node.js and npm first, then install bower globally using npm:

```bash
$ npm install -g bower
```

* Grunt - You're going to use the [Grunt Task Runner](http://gruntjs.com/) to automate your development process. Make sure you've installed Node.js and npm first, then install grunt globally using npm:

```bash
$ npm install -g grunt-cli
```

* Sass - You're going to use [Sass](http://sass-lang.com/) to compile CSS during your grunt task. Make sure you have ruby installed, and then install Sass using gem install:

```bash
$ gem install sass
```

* Gulp - (Optional) You may use Gulp for Live Reload, Linting, and SASS or LESS.

```bash
$ npm install gulp -g
```


## Quick Install
Once you've downloaded the boilerplate and installed all the prerequisites, you're just a few steps away from starting to develop your MEAN application.

The first thing you should do is install the Node.js dependencies. The boilerplate comes pre-bundled with a package.json file that contains the list of modules you need to start your application. To learn more about the modules installed visit the NPM & Package.json section.

To install Node.js dependencies you're going to use npm again. In the application folder run this in the command-line:

```bash
$ npm install
```

This command does a few things:
* First it will install the dependencies needed for the application to run.
* If you're running in a development environment, it will then also install development dependencies needed for testing and running your application.
* Finally, when the install process is over, npm will initiate a bower install command to install all the front-end modules needed for the application

## Running Your Application
After the install process is over, you'll be able to run your application using Grunt, just run grunt default task:

```
$ grunt
```

Your application should run on port 3000 with the *development* environment configuration, so in your browser just go to [http://localhost:3000](http://localhost:3000)

That's it! Your application should be running. To proceed with your development, check the other sections in this documentation.
If you encounter any problems, try the Troubleshooting section.

* explore `config/env/development.js` for development environment configuration options

### Running in Production mode
To run your application with *production* environment configuration, execute grunt as follows:

```bash
$ grunt prod
```

* explore `config/env/production.js` for production environment configuration options


### Running with TLS (SSL)
Application will start by default with secure configuration (SSL mode) turned on and listen on port 8443.
To run your application in a secure manner you'll need to use OpenSSL and generate a set of self-signed certificates. Unix-based users can use the following command:

```bash
$ sh ./scripts/generate-ssl-certs.sh
```

Windows users can follow instructions found [here](http://www.websense.com/support/article/kbarticle/How-to-use-OpenSSL-and-Microsoft-Certification-Authority).
After you've generated the key and certificate, place them in the *config/sslcerts* folder.

Finally, execute grunt's prod task `grunt prod`
* enable/disable SSL mode in production environment change the `secure` option in `config/env/production.js`


## Testing Your Application
You can run the full test suite included with MEAN.JS with the test task:

```bash
$ grunt test
```

This will run both the server-side tests (located in the app/tests/ directory) and the client-side tests (located in the public/modules/*/tests/).

To execute only the server tests, run the test:server task:

```bash
$ grunt test:server
```

And to run only the client tests, run the test:client task:

```bash
$ grunt test:client
```
