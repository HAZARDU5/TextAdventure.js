var debug = true;

var Utils = require('../classes/Utils.js'); //must always go first!
var GameHelpers = require('../classes/GameHelpers.js'); //must not use

module.exports = function(quantity) {

    if(quantity === undefined){
        quantity = 1
    }

    return {
        displayName: 'Combat Knife',
        quantity: quantity,
        description: "The combat knife is slightly rusted, but the blade still looks like it could do some damage.",
        use: "You grasp the combat knife and slash it through the air a few times. It makes a cool swishing sound. You " +
        "feel heroic. Sort of."
    };
};