// TODO: put all application specific variables here
// nice and neat

var casper = require('casper').create({
// some debug info is nice during coding times
//    verbose: true,
//    logLevel: 'debug',
// Casper sets the viewport quite small initially - so let's enlarge it something an average user may see
    viewportSize: {
        width: 1280,
        height: 576
    }});
casper.test.comment('Hang on to your heads, testing starts!');

// First, let's assert we are able to access to correct Meteor app: Parties example
casper.start('http://localhost:3000/', function() {
    this.test.assertTitle('All Tomorrow\'s Parties', 'App title is as expected');
    this.test.comment('Taking a picture to document our success');
    this.capture('captures/step-1.png');
});

// wait for it - the sign-up drop down may take a little longer
casper.waitForSelector('#login-sign-in-link', function() {
    this.test.assertExists('#login-sign-in-link', 'Login link exists');
    this.click('a#login-sign-in-link');
});

// now create a new account
casper.then(function() {
  this.test.assertExists('#signup-link', 'Sign up link exists');
  this.click('a#signup-link');
  this.test.assertExists('#login-password', 'Password field found');
  this.evaluate(function (username, password) {
         document.querySelector('#login-email').value = username;
         document.querySelector('#login-password').value = password;
     }, {
         username: 'username@example.org',
         password: 'password'
     });
  this.capture('captures/step-2.png');
  this.test.comment('Now we create a new user account');
  this.click('div#login-buttons-password');
  this.capture('captures/step-3.png');
});

// TODO: do something with your newly created account

casper.run();