var debug = true;

var Utils = require('../classes/Utils.js'); //must always go first!
var GameHelpers = require('../classes/GameHelpers.js'); //must not use

module.exports = function() {

    console.log('Created instance of Watch');

    return {
        displayName: 'Watch',
        description: "A plain wrist watch with a dim back-light. It's not very useful for seeing in the dark.",
        use: function() { return "You look at the watch and press the backlight. A dim glow illuminates the watch. The time reads: " + GameHelpers.getTimeOfDay()},
        interactions: {
            take: "You pick up the watch and put it on your wrist.", //a description or function is required in order to successfully take the item
            light: "You activate the watch light"
        }
    };
};