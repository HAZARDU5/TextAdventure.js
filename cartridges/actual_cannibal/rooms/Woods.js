var debug = true;

var Utils = require('../classes/Utils.js'); //must always go first!
var GameHelpers = require('../classes/GameHelpers.js');

module.exports = function(){
    
    console.log('Created instance of Woods');

    console.log(GameHelpers);

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
        displayName : 'Woods',
        description : "You're walking in the woods.",
        interactables : {
            //NOTE: look actions for interactables can only contain text strings
            woods : {
                look : "There's no one around."
            },
            something : {
                look : function(){
                    console.log('Looking at something!');

                    console.log('Gamemethods: ',GameHelpers);

                    return _textStrings.somethingMoves();
                }
            },
            bushes : {  look : function(){
                return _textStrings.somethingMoves()
            } },
            rocks: {
                look: "You look at some nearby rocks. They're very rocky."
            }
        },
        items : {

        },
        exits : {
            north : {
                displayName : 'North',
                destination : 'woodsNorth'
            },
            south : {
                displayName : 'South',
                destination : 'woodsSouth'
            },
            east : {
                displayName : 'East',
                destination : 'woodsEast'
            },
            west : {
                displayName : 'West',
                destination : 'woodsWest'
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