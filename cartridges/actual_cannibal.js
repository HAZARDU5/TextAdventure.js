/**
 *
 * Actual Cannibal Shia LaBeouf
 *
 * @author Michael Andrew (michael@uxvirtual.com
 */

    /*
     You're walking in the woods
     There's no one around and your phone is dead
     Out of the corner of your eye you spot him:
     Shia LaBeouf.

     He's following you, about 30 feet back
     He gets down on all fours and breaks into a sprint
     He's gaining on you
     Shia LaBeouf

     You're looking for you car but you're all turned around
     He's almost upon you now
     and you can see there's blood on his face
     My God, there's blood everywhere!

     Running for you life (from Shia LaBeouf)
     He's brandishing a knife (It's Shia LaBeouf)
     Lurking in the shadows
     Hollywood superstar Shia LaBeouf

     Living in the woods (Shia LaBeouf)
     Killing for sport (Shia LaBeouf)
     Eating all the bodies
     Actual cannibal Shia LaBeouf

     Now it's dark and you seem to have lost him
     but you're hopelessly lost yourself
     Stranded with a murderer
     you creep silently through the underbrush

     Aha! In the distance
     A small cottage with a light on
     Hope! You move stealthily toward it
     but your leg! Ah! It's caught in a bear trap!

     Gnawing off your leg (Quiet, quiet)
     Limping to the cottage (Quiet, quiet)
     Now you're on the doorstep
     Sitting inside: Shia LaBeouf

     Sharpening an axe (Shia LaBeouf)
     But he doesn't hear you enter (Shia LaBeouf)
     You're sneaking up behind him
     Strangling superstar Shia LaBeouf

     Fighting for your life with Shia LaBeouf
     Wrestling a knife from Shia LaBeouf
     Stab him in his kidney
     Safe at last from Shia LaBeouf

     You limp into the dark woods
     blood oozing from your stump leg
     But you have won; you have beaten
     Shia LaBeouf

     Wait! He isn't dead (Shia surprise)
     There's a gun to your head and death in his eyes
     But you can do Jis Jitsu

     Body slam superstar Shia LaBeouf
     Legendary fight with Shia LaBeouf
     Normal Tuesday night for Shia LaBeouf
     You try to swing an axe at Shia Labeouf

     But blood is draining fast from your stump leg
     He's dodging every swipe, he parries to the left
     You counter to the right, you catch him in the neck
     You're chopping his head now
     You have just decapitated Shia Labeouf

     His head Topples to the floor, expressionless
     You fall to your knees and catch your breath
     You're finally safe from Shia Labeouf ...
     */

var moment = require('moment');

// === Game Data ===
var gameData = {
    commandCounter : 0,
    gameOver : false,
    cannibalLocation: 'Woods',
    timeOfDay: moment("20:05:00", "HH:mm:ss"),
    introText : "Welcome to Actual Cannibal, the Text Adventure game! This is loosely based on the horror-comedy" +
                "song 'Actual Cannibal Shia LaBeouf' by Rob Cantor.",
    outroText : 'Thanks for playing!',
    player : {
        currentLocation : 'Woods',
        inventory : {},
        lightSource : false
    },
    map : {
        Woods : {
            firstVisit : true,
            displayName : 'Woods',
            description : "You're walking in the woods.",
            textStrings: {
                somethingMoves: function(){
                    if(getCannibalLocation() == 'Woods'){
                        return "Out of the corner of your eye you spot him: Shia LaBeouf. He emerges from the bushes, " +
                            "following you about 30 feet back."
                    }else{
                        return "You think you see something. But it turns out to be the wind rustling the trees."
                    }
                }
            },
            interactables : {
                woods : { look : function(){
                    return "There's no one around. " + (getCannibalLocation() == 'Woods') ? 'You feel a chill run up ' +
                    'your spine; something moves in the bushes nearby!' : ''
                } },
                something : {  look : function(){
                    return getTextString('Woods','somethingMoves')
                } },
                bushes : {  look : function(){
                    return getTextString('Woods','somethingMoves')
                } },
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
                incrementTimeOfDay();
            }
        }
    }
};

// === Game Actions ===
var gameActions = {
    time: function(){

        var string;

        switch(getTimeOfDay()){
            case 'dusk':
                string = "You look up at the sky. The sky is fading to purple and it's getting hard to see. You feel cold.";
                break;
            case 'night':
                string = "You look up at the sky. It's the middle of the night and you can barely see anything. You feel cold.";
                break;
            case 'dawn':
                string = "You look up at the sky. Golden light is filling the sky as dawn breaks. The sound of crows in the distance fills the air.";
                break;
            case 'morning':
                string = "You look up at the sky. A light morning breeze cools your skin as you gaze at the morning sun.";
                break;
            case 'midday':
                string = "You look up at the sky. The sun is high in the sky and beating down on you.";
                break;
            case 'afternoon':
                string = "You look up at the sky. It's the afternoon and a chill breeze is starting to kick up.";
                break;
            case 'late-afternoon':
                string = "You look up at the sky. The sky is filled with fire; golden orange and yellow. Shadows stretch long away from you, clawing at your ankles. You feel cold.";
                break;
        }

        return string;
    }
};

// === Necessary Exports ===
module.exports.gameData = gameData;
module.exports.gameActions = gameActions;

// === Helper Functions ===

function getTimeOfDay(){

    var timeString;

    if(gameData.timeOfDay.isAfter('20:00') && gameData.timeOfDay.isBefore('22:00')){
        timeString = 'dusk'
    }else if(gameData.timeOfDay.isAfter('22:00') && gameData.timeOfDay.isBefore('05:00')){
        timeString = 'night'
    }else if(gameData.timeOfDay.isAfter('05:00') && gameData.timeOfDay.isBefore('06:00')){
        timeString = 'dawn'
    }else if(gameData.timeOfDay.isAfter('06:00') && gameData.timeOfDay.isBefore('12:00')){
        timeString = 'morning'
    }else if(gameData.timeOfDay.isAfter('12:00') && gameData.timeOfDay.isBefore('13:00')){
        timeString = 'midday'
    }else if(gameData.timeOfDay.isAfter('13:00') && gameData.timeOfDay.isBefore('19:00')){
        timeString = 'afternoon'
    }else if(gameData.timeOfDay.isAfter('19:00') && gameData.timeOfDay.isBefore('20:00')){
        timeString = 'late-afternoon'
    }

    return timeString;
}

function incrementTimeOfDay(){
    gameData.timeOfDay.add(5, 'minutes');
}

function getCannibalLocation(){
    return gameData.cannibalLocation;
}

function getTextString(mapRoom,string){

    console.log(gameData);

    return gameData.map[mapRoom].textStrings[string];
}