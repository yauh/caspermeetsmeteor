// TODO: put all application specific variables here
// nice and neat
// more - add those as examples:
 // assertTextExists
 // assertTitle
 // assertHttpStatus
 // assertDoesntExist
 // assertUrlMatch
 
var username = 'username@example.org';
var password = 'password';
var meteorUrl = 'http://localhost:3000/';

var casper = require('casper').create({
// some debug info is nice during coding times
    //verbose: true,
    //logLevel: 'debug',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.172 Safari/537.22',
// Casper sets the viewport quite small initially - so let's enlarge it something an average user may see
    viewportSize: {
        width: 1280,
        height: 576
    }});
casper.test.comment('Hang on to your heads, testing starts!');

// First, let's assert we are able to access to correct Meteor app: Parties example
casper.start(meteorUrl, function() {
    this.test.assertTitle('All Tomorrow\'s Parties', 'App title is as expected');
    this.test.comment('Taking a picture to document our success');
    this.capture('captures/01-website.png');

// simple things first
    casper.waitForSelector('#login-buttons', function() {
        this.test.pass('login buttons found');
    }, function() {
        this.test.fail('login buttons missing');
    });

// wait for it - the sign-up drop down may take a little longer
    casper.waitForSelector('#login-sign-in-link', function() {
        this.test.assertExists('#login-sign-in-link', 'Login link exists');
        this.click('a#login-sign-in-link');
    });

// this creates a new acount
    casper.then(function() {
        this.test.assertExists('#signup-link', 'Sign up link exists'); // comment out these 2 lines
        this.click('a#signup-link'); // to simply log in instead of signing up
        this.test.assertExists('#login-password', 'Password field found');
        this.test.assertExists('#login-dropdown-list', 'login dropdown list found');
        this.fillSelectors('#login-dropdown-list', {
            '#login-email': username,
            '#login-password': password
        }, true);
        this.capture('captures/02-logindata.png');
        this.click('div#login-buttons-password');
    });
    casper.waitForSelector('a#login-name-link', function() {
        this.test.pass('We are now logged in');
        this.capture('captures/03-loggedin.png');
    });

});

// TODO: do something with your newly created account
// double click the map
// likely using this.mouseEvent('dblclick', 'selection');
// but how to add some coordinates?

casper.run();