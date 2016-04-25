var expect = require('chai').expect,
    sinon = require('sinon'),
    rewire = require("rewire");

var con = rewire("../console/console.js");
//var testGame = rewire('./cartridges/test');
var sandbox = sinon.sandbox.create();
var gameStub = sandbox.stub({
    gameData: {
        commandCounter : 0,
        gameOver : false,
        introText : 'a',
        outroText : 'b',
        player : {},
        map: {}
    },

    gameActions: {}
});

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
        sandbox.verifyAndRestore(); // Verify all Sinon mocks have been honored
    });

    after(function() {
        // after() is run after all your tests have completed. Do teardown here.
    });

    describe('input look command', function() {

        //our assertations here

        it('should return successful string', function() {

            gameStub.gameData.map = sandbox.stub({

                room1: {
                    firstVisit : true,
                    displayName : 'a',
                    description : 'b'
                }

            });

            gameStub.gameData.player = sandbox.stub({
                currentLocation : 'room1'
            });

            console.log('gamestub',gameStub);

            var revertTestGame = con.__set__("games", {testGame: gameStub});

            expect(con.input('look','testGame')).to.equal('b');

            revertTestGame();
        });
    });
});