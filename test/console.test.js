var expect = require('chai').expect,
    rewire = require("rewire");

var con = rewire("../console/console.js");
var testGame = rewire('./cartridges/test');

describe('Console', function() {

    before(function() {
        // The before() callback gets run before all tests in the suite. Do one-time setup here.
        //mockery.enable(); // Enable mockery at the start of your test suite
    });

    beforeEach(function() {
        // The beforeEach() callback gets run before each test in the suite.

    });

    afterEach(function() {
        // The beforeEach() callback gets run after each test in the suite.
    });

    after(function() {
        // after() is run after all your tests have completed. Do teardown here.
    });

    describe('input', function() {

        //our assertations here

        // uses set variables above when running module method

        it('should return successful string', function() {

            var revertRoom1ExitsRoom2Hidden = testGame.__set__("gameData.map.room1.exits.room2.hidden", true);
            var revertTestGame = con.__set__("games", {testGame: testGame});

            expect(con.input('look','testGame')).to.equal('Room1 description');

            revertRoom1ExitsRoom2Hidden();
            revertTestGame();
        });
    });
});