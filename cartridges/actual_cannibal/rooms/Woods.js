var _gameMethods;

module.exports = function(gameMethods){

    _gameMethods = gameMethods;
    
    console.log('Created instance of Woods');

    return {
        firstVisit : true,
        displayName : 'Woods',
        description : "You're walking in the woods.",
        textStrings: {
            somethingMoves: function(){
                if(_gameMethods.getCannibalLocation() == 'Woods'){
                    return "Out of the corner of your eye you spot him: Shia LaBeouf. He emerges from the bushes, " +
                        "following you about 30 feet back."
                }else{
                    return "You think you see something. But it turns out to be the wind rustling the trees."
                }
            }
        },
        interactables : {
            woods : { look : function(){
                return "There's no one around. " + (_gameMethods.getCannibalLocation() == 'Woods') ? 'You feel a chill run up ' +
                'your spine; something moves in the bushes nearby!' : ''
            } },
            something : {  look : function(){
                return _gameMethods.getTextStringMap('Woods','somethingMoves')
            } },
            bushes : {  look : function(){
                return _gameMethods.getTextStringMap('Woods','somethingMoves')
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
            _gameMethods.incrementTimeOfDay();
        }
    };
};