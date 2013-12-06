// TODO: put all application specific variables here
// nice and neat
// more - add those as examples:
 // assertTextExists
 // assertTitle
 // assertHttpStatus
 // assertDoesntExist
 // assertUrlMatch
 

var meteorUrl = 'http://casperparty.meteor.com/';

casper.options.viewportSize = {width: 1024, height: 768}; // works
casper.options.verbose = true;
casper.options.logLevel = 'debug'; // debug needs you to be verbose, hence the line above!

casper.test.begin('Testing Parties Example',1, function(test){
    // First, let's assert we are able to access to correct Meteor app: Parties example
    casper.start(meteorUrl, function() {
    this.test.assertTitle('All Tomorrow\'s Parties', 'App title is as expected');
});

    casper.run(function() {
        test.done();
    });
});



// TODO: do something with your newly created account
// double click the map
// likely using this.mouseEvent('dblclick', 'selection');
// but how to add some coordinates?
