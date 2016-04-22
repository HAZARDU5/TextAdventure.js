var debug = true;

var Utils = require('../classes/Utils.js'); //must always go first!
var GameHelpers = require('../classes/GameHelpers.js');

var OldCandy = (debug) ? Utils.requireNoCache('../items/OldCandy.js') : require('../items/OldCandy.js');

module.exports = function(){

    var _textStrings = {

    };

    var oldCandy = new OldCandy(5);

    return {
        firstVisit : true,
        displayName : 'The Glove Compartment',
        description : "Inside the glove compartment you find a bunch of junk.",
        interactables : {
            bushes : {  look : function(){
                return _textStrings.somethingMoves()
            } }
        },
        items : {
            oldCandy : oldCandy
        },
        exits : {
            'the truck interior' : {
                displayName : 'the truck interior',
                destination : 'truck'
            },
            'truck interior' : {
                displayName : 'the truck interior',
                destination : 'truck',
                hidden: true
            },
            'truck' : {
                displayName : 'the truck interior',
                destination : 'truck',
                hidden: true
            },
            'the truck' : {
                displayName : 'the truck interior',
                destination : 'truck',
                hidden: true
            }
        },
        setup: function(){

        },
        teardown: function(){

        },
        updateLocation: function(){
            //this function is run every time an action is taken
            GameHelpers.incrementTimeOfDay();
        }
    };
};