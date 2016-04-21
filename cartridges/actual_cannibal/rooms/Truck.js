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
        description : "You are inside the old truck. The seats are worn and tattered. It's quite dusty; you stifle a sneeze as you gaze around the " +
                        "interior. You spot a couple of old magazines, a busted glovebox and an old combat knife.",
        interactables : {
            bushes : {  look : function(){
                return _textStrings.somethingMoves()
            } }
        },
        items : {
            combatKnife : combatKnife
        },
        exits : {
            door : {
                displayName : 'Truck Door',
                destination : 'woodsEast',
                hidden : true
            },
            'the truck door' : {
                displayName : 'the truck door',
                destination : 'woodsEast'
            },
            'truck door' : {
                displayName : 'the truck door',
                destination : 'woodsEast',
                hidden : true
            },
            'the door' : {
                displayName : 'the truck door',
                destination : 'woodsEast',
                hidden : true
            }
        },
        setup: function(){
            return "You grab the truck door handle. It creaks as your force it open. You carefully climb inside."
        },
        teardown: function(){
            return "You grab the truck door handle. It creaks as you force it open. You carefully climb outside."
        },
        updateLocation: function(){
            //this function is run every time an action is taken
            GameHelpers.incrementTimeOfDay();
        }
    };
};