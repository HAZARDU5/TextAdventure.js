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

        //take single item
        it('should return c taken when item is taken', function() {

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

            expect(gameStub.gameData.map.room1.items.c).to.equal(undefined);

            expect(gameStub.gameData.player.inventory.c.quantity).to.equal(1);

            revertTestGame();
        });

        //test taking a single copy of an item in a room with multiple copies. single copy should remain
        it('should return c taken when item is taken and 1 copy is in inventory and 1 copy remains in room', function() {

            gameStub.gameData.map = sandbox.stub({

                room1: {
                    firstVisit : true,
                    displayName : 'a',
                    description : 'b',
                    items : {
                        c : {
                            displayName : 'c',
                            description : 'd',
                            quantity : 2
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

            //check room has 1 copy of item c left
            expect(gameStub.gameData.map.room1.items.c.quantity).to.equal(1);

            //check player has 1 copy of item c in inventory
            expect(gameStub.gameData.player.inventory.c.quantity).to.equal(1);

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

            //confirm item was actually dropped into room
            expect(gameStub.gameData.map.room1.items.c.quantity).to.equal(1);

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

            //check that player is actually moved to room2
            expect(gameStub.gameData.player.currentLocation).to.equal('room2');

            revertTestGame();
        });
    });

    describe('input die command', function() {

        it('should return You are dead', function() {

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
                inventory : {}
            });

            var revertTestGame = con.__set__("games", {testGame: gameStub});

            expect(con.input('die','testGame')).to.equal('You are dead');

            revertTestGame();
        });
    });

    describe('input load command', function() {

        it('should return gold_mine intro', function() {

            var revertTestGame = con.__set__("games", {});

            expect(con.input('load gold_mine','testGame')).to.equal('Welcome to the Crooked Gulch Gold Mine. What it lacks in safety precautions it more than makes up for in gold. Watch your step and you might just make it out with riches beyond your wildest imagination!\nYou stand at the partially collapsed entrance to the mine. Nearby there is a sign sticking out of a pile of miner helmets. Exit is Inside.');

            revertTestGame();
        });
    });

});