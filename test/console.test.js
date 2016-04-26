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

    //look command should return the current room description
    describe('input look command', function() {

        it('should return b when room is described', function() {

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

    //can only take items in the current room
    describe('input take command', function() {

        it('should return c when taken', function() {

            gameStub.gameData.map = sandbox.stub({

                room1: {
                    firstVisit : true,
                    displayName : 'a',
                    description : 'b',
                    items : {
                        c : {
                            displayName : 'c',
                            description : 'd',
                            quantity : 1
                        }
                    }
                }

            });

            gameStub.gameData.player = sandbox.stub({
                currentLocation : 'room1',
                inventory : { //inventory object must be set in order for test to work

                }
            });

            var revertTestGame = con.__set__("games", {testGame: gameStub});

            expect(con.input('take c','testGame')).to.equal('c taken');

            revertTestGame();
        });
    });

    //use items in inventory or current room
    describe('input use item command', function() {

        it('should return e when used', function() {

            gameStub.gameData.map = sandbox.stub({

                room1: {
                    firstVisit : true,
                    displayName : 'a',
                    description : 'b',
                    items : {}
                }

            });

            gameStub.gameData.player = sandbox.stub({
                currentLocation : 'room1',
                inventory : {
                    c : {
                        displayName : 'c',
                        description : 'd',
                        use: function(){
                            return "e"
                        },
                        quantity : 1
                    }
                }
            });

            var revertTestGame = con.__set__("games", {testGame: gameStub});

            expect(con.input('use c','testGame')).to.equal('e');

            revertTestGame();
        });

        it('should return error when c is used - not in inventory', function() {

            gameStub.gameData.map = sandbox.stub({

                room1: {
                    firstVisit : true,
                    displayName : 'a',
                    description : 'b',
                    items : {
                        c : {
                            displayName : 'c',
                            description : 'd',
                            use: function(){
                                return "e"
                            },
                            quantity : 1
                        }
                    }
                }

            });

            gameStub.gameData.player = sandbox.stub({
                currentLocation : 'room1',
                inventory : {}
            });

            var revertTestGame = con.__set__("games", {testGame: gameStub});

            expect(con.input('use c','testGame')).to.equal("Can't do that.");

            revertTestGame();
        });
    });

    //interact with items
    describe('input interact item command', function() {

        it('should return error when interacted in inventory', function() {

            gameStub.gameData.map = sandbox.stub({

                room1: {
                    firstVisit : true,
                    displayName : 'a',
                    description : 'b',
                    items : {}
                }

            });

            gameStub.gameData.player = sandbox.stub({
                currentLocation : 'room1',
                inventory : {
                    c : {
                        displayName : 'c',
                        description : 'd',
                        interactions : {
                            interaction1: "e"
                        },
                        quantity : 1
                    }
                }
            });

            var revertTestGame = con.__set__("games", {testGame: gameStub});

            expect(con.input('interaction1 c','testGame')).to.equal("I don't know how to do that.");

            revertTestGame();
        });

        it('should return e when interacted - not in inventory', function() {

            gameStub.gameData.map = sandbox.stub({

                room1: {
                    firstVisit : true,
                    displayName : 'a',
                    description : 'b',
                    items : {
                        c : {
                            displayName : 'c',
                            description : 'd',
                            interactions : {
                                interaction1: "e"
                            },
                            quantity : 1
                        }
                    }
                }

            });

            gameStub.gameData.player = sandbox.stub({
                currentLocation : 'room1',
                inventory : {}
            });

            var revertTestGame = con.__set__("games", {testGame: gameStub});

            expect(con.input('interaction1 c','testGame')).to.equal('e');

            revertTestGame();
        });
    });

    //can only drop item in player's inventory
    describe('input drop inventory item command', function() {

        it('should return c dropped', function() {

            gameStub.gameData.map = sandbox.stub({

                room1: {
                    firstVisit : true,
                    displayName : 'a',
                    description : 'b',
                    items : {}
                }

            });

            gameStub.gameData.player = sandbox.stub({
                currentLocation : 'room1',
                inventory : {
                    c : {
                        displayName : 'c',
                        description : 'd',
                        quantity : 1
                    }
                }
            });

            var revertTestGame = con.__set__("games", {testGame: gameStub});

            expect(con.input('drop c','testGame')).to.equal('c dropped');

            revertTestGame();
        });
    });

    describe('input go direction command', function() {

        it('should return d when room2 is described', function() {

            gameStub.gameData.map = sandbox.stub({

                room1: {
                    firstVisit : true,
                    displayName : 'a',
                    description : 'b',
                    items : {},
                    exits : {
                        c : {
                            displayName : 'c',
                            destination : 'room2',
                            hidden : true
                        }
                    }
                },
                room2: {
                    firstVisit : true,
                    displayName : 'c',
                    description : 'd',
                    items : {}
                }

            });

            gameStub.gameData.player = sandbox.stub({
                currentLocation : 'room1',
                inventory : {}
            });

            var revertTestGame = con.__set__("games", {testGame: gameStub});

            expect(con.input('go c','testGame')).to.equal('d');

            revertTestGame();
        });
    });

});