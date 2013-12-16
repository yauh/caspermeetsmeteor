 var username = 'username@example.org';
 var password = 'password';
 var meteorUrl = 'http://localhost:3000/';
 casper.options.viewportSize = {width: 1024, height: 768};

//casper.options.verbose = true;
//casper.options.logLevel = 'debug'; // debug needs you to be verbose, hence the line above!

casper.test.comment('Hang on to your heads, testing starts!');

casper.test.begin('Testing Parties Example',8, function(test){
    // First, let's assert we are able to access to correct Meteor app: Parties example
    casper.start(meteorUrl, function() {
        this.test.assertTitle('All Tomorrow\'s Parties', 'App title is as expected');
        this.test.comment('Taking a picture to document our success');
        this.capture('captures/parties-website.png');
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
    });

    casper.then(function() {
        this.mouse.doubleclick(200,200);
        this.capture('captures/parties-doubleclick.png');
    });
     //this creates a new acount
     casper.then(function() {
        // uncomment the next 2 lines in order to sign up instead of logging in
         //this.test.assertExists('#signup-link', 'Sign up link exists'); 
         //this.click('a#signup-link'); 
         this.test.assertExists('#login-password', 'Password field found');
         this.test.assertExists('#login-dropdown-list', 'login dropdown list found');
         this.fillSelectors('#login-dropdown-list', {
           '#login-email': username,
           '#login-password': password
       }, true);
         this.click('div#login-buttons-password');
     });
     casper.then(function() {
         casper.waitForSelector('a#login-name-link', function() {
           this.test.pass('We are now logged in');
       });
     });

     casper.then(function() {
        this.mouse.doubleclick(500,450);
         casper.waitForSelector('div.modal', function() {
           this.test.pass('The modal shows up');
       });
     });

     casper.then(function() {
         this.evaluate(function() {
            document.querySelector('.title').value = 'Casper likes to party';
            document.querySelector('.description').value = 'Nothing serious, it is just a test event.';
        });
         this.click('a.save');
     });
     
     casper.then(function() {
       casper.waitForSelector('g.circles', function() {
         this.test.pass('The party is save');
     });
   });
     casper.run(function() {
        test.done();
    });
 });