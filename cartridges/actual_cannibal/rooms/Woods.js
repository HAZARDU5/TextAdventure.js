var debug = true;

var Utils = require('../classes/Utils.js'); //must always go first!
var GameHelpers = require('../classes/GameHelpers.js');

module.exports = function(){

    var _textStrings = {
        somethingMoves: function(){
            if(GameHelpers.getCannibalLocation() == 'Woods'){
                return "Out of the corner of your eye you spot him: Shia LaBeouf. He emerges from the bushes, " +
                    "following you about 30 feet back."
            }else{
                return "You think you see something. But it turns out to be the wind rustling the trees."
            }
        }
    };

    return {
        firstVisit : true,
        displayName : 'Central Woods',
        description : "You're walking in the woods. There's no one around. There are some bushes nearby.",
        interactables : {
            bushes : {  look : function(){
                return _textStrings.somethingMoves()
            } }
        },
        items : {

        },
        exits : {
            east : {
                displayName : 'East',
                destination : 'woodsEast'
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