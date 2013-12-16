var meteorUrl = 'http://localhost:3000/';

// Start your testing
casper.start(meteorUrl, function() {
	this.test.assertTitle('Todos', 'App title is as expected');
	this.test.comment('Taking a picture to document our success');
	this.capture('captures/snapshot.png');

	casper.then(function() {
        // do something else
    });

});

// don't forget to run your tests
casper.run();
