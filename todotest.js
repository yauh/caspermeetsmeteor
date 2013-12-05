casper.test.begin('Testing Todos Example',4, function(test){

    var  x = require('casper').selectXPath;
    casper.start('http://localhost:3000', function() {
        this.test.assertExists("#lists", "Lists exist");
    });

    casper.then(function() {
        this.test.comment("Let's wait for Tesla, he's the slowest of the bunch");
        casper.waitForSelector('.todo-text', function() {
            this.test.assertTextExists("Tesla", "Found Nikola. Hooray!");
        });
    });

    casper.then(function() {
        this.test.comment('Let us visit the chemists and take a picture');
        this.click(x('//div[@class="tag-list"]/div[3]'));
        this.viewport(1024, 768, function() {
            this.capture('captures/chemists.png');
        });
        this.test.comment('Can we find Tesla? Hopefully not!');
        this.test.assertDoesntExist("Tesla", "Nikola is not a chemist");
    });

    casper.then(function() {
     this.test.comment("Adding another great scientiest");
        casper.waitForSelector('#new-todo', function() {
            this.fillSelectors('#new-todo-box', {
                '#new-todo': 'Walter White',
            }, true);
        });  
        this.waitForSelector(x("//*[contains(@class,'todo-text')][normalize-space()='Walter White']"), function() {
            this.test.assertTextExists("Walter", "Heisenberg is in da house");
        });
    });

    casper.then(function() {
        this.test.comment("Let's take a break");
        this.wait(5000, function() {
            this.echo("I waited for 5 seconds");
        });
        this.test.assertTextExists("Walter", "Walter is still here, we bring in Jesse");
    });

    casper.then(function() {
        this.test.comment("Now get rid of the teacher");
        this.click(x("//*[contains(@class,'todo-text')][normalize-space()='Walter White']/../../div[contains(@class,'destroy')]"));
        this.test.assertDoesntExist("Walter", "No more Walter");
    });

    casper.run(function() {
        test.done();
    });
});