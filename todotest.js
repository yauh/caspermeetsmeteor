var casper = require('casper').create({
// some debug info is nice during coding times
verbose: true,
logLevel: 'debug',
userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.172 Safari/537.22',
// Casper sets the viewport quite small initially - so let's enlarge it something an average user may see
viewportSize: {
    width: 1280,
    height: 576
}
});
casper.start('http://localhost:3000', function() {
    this.test.assertExists("#lists", "Lists exist");
});

casper.then(function() {
    this.test.comment('Can we find Tesla?');
    this.test.assertTextExists("Tesla", "Found Nikola");
});

casper.then(function() {
    this.test.comment("Let's wait for Tesla");
    casper.waitForSelector('.todo-text', function() {
        this.test.assertTextExists("Tesla", "Found Nikola");
    });
});

casper.then(function() {
    this.test.comment("Now we'll look at the list");
    this.test.assertEval(function() {
        return __utils__.findAll("li.todo").length >= 6;
    }, "also we got at least six favorite scientiests");
});

casper.then(function() {
    casper.waitForSelector('#new-todo', function() {
       this.fillSelectors('#new-todo-box', {
        '#new-todo': 'Walter White',
    }, true);
   });  
});

casper.run();


