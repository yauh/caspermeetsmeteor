var casper = require('casper').create();
casper.start('http://localhost:3000', function() {
	this.test.assertExists("#lists", "Lists exist");
});
casper.then(function() {
	this.test.info("That's informative.");
	this.test.comment('Just showing the difference between info and comment.');
});
casper.run();