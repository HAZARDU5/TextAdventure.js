var debug = true;

var Utils = require('../classes/Utils.js'); //must always go first!
var GameHelpers = require('../classes/GameHelpers.js');

var CombatKnife = (debug) ? Utils.requireNoCache('../items/CombatKnife.js') : require('../items/CombatKnife.js');

module.exports = function(){

    var _textStrings = {

    };

    var combatKnife = new CombatKnife();

    return {
        firstVisit : true,
        displayName : 'Inside the Old Truck',
        description : "You are inside the old truck. The seats are worn and tattered. It's quite dusty; you stifle a " +
                        "sneeze as you gaze around the interior. The glove compartment is busted open and you see some " +
                        "things inside. There is a pile of rubbish on the passenger seat.",
        interactables : {

        },
        items : {
            combatKnife : combatKnife
        },
        exits : {
            outside : {
                displayName : 'Outside',
                destination : 'woodsEast',
                hidden : false
            },
            compartment : {
                displayName : 'Glove Compartment',
                destination : 'gloveCompartment',
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