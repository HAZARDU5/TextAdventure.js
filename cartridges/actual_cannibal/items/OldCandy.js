var debug = true;

var Utils = require('../classes/Utils.js'); //must always go first!
var GameHelpers = require('../classes/GameHelpers.js'); //must not use

module.exports = function(quantity) {

    if(quantity === undefined){
        quantity = 1
    }

    return {
        displayName: 'Old Candy',
        quantity: quantity,
        description: "It's sticky and gross.",
        use: function(){
            return "You want to stick it in your mouth, but decide against it."
        }
    };
};