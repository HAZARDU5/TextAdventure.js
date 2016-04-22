var debug = true;

var Utils = require('../classes/Utils.js'); //must always go first!
var GameHelpers = require('../classes/GameHelpers.js');

module.exports = function(){

    var _textStrings = {

    };

    return {
        firstVisit : true,
        displayName : 'East Woods',
        description : "You're walking in the woods. There's no one around. There is a rusting old pick up truck tangled in the undergrowth.",
        interactables : {
            truck : {  look : "It's pretty rusty" }
        },
        items : {

        },
        exits : {
            west : {
                displayName : 'West',
                destination : 'woods'
            },
            truck : {
                displayName : 'Rusty Truck',
                destination : 'truck',
                hidden : true
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