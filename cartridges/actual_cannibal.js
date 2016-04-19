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

// === Game Data ===
var gameData = {
    commandCounter : 0,
    gameOver : false,
    introText : "Welcome to Actual Cannibal, the Text Adventure game! This is loosely based on the comedy " +
                "song 'Actual Cannibal Shia LaBeouf' by Rob Cantor.",
    outroText : 'Thanks for playing!',
    player : {
        currentLocation : 'Woods',
        inventory : {},
        lightSource : false,
        cannibalLocation: 'Woods'
    },
    map : {
        'Woods' : {
            firstVisit : true,
            displayName : 'Woods',
            description : "You're walking in the woods, it's dark and eerie.",
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
                something : {  look : this.map.Woods.textStrings.somethingMoves },
                bushes : {  look : this.map.Woods.textStrings.somethingMoves }
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

            }
        }
    }
};

// === Game Actions ===
var gameActions = {

}

// === Necessary Exports ===
module.exports.gameData = gameData;
module.exports.gameActions = gameActions;

// === Helper Functions ===


function getCannibalLocation(){
    return gameData.cannibalLocation;
}