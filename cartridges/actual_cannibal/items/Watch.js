var debug = true;

var Utils = require('../classes/Utils.js'); //must always go first!
var GameHelpers = require('../classes/GameHelpers.js'); //must not use

module.exports = function(quantity) {

    if(quantity === undefined){
        quantity = 1
    }

    return {
        displayName: 'Watch',
        description: "A plain wrist watch with a dim back-light. It's not very useful for seeing in the dark.",
        quantity: quantity,
        use: function() { return "You look at the watch and press the backlight. A dim glow illuminates the watch. The time reads: " + GameHelpers.getTimeOfDay()},
        //item interactions currently broken - can't pick up object if interactions present
        /*interactions: {
            light: "You activate the watch light"
        }*/
    };
};