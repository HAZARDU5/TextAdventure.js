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
var Woods = require('./actual_cannibal/rooms/Woods.js');

// === Helper Functions ===

var gameMethods = {
    getTimeOfDayAbstract: function(){

        var timeString;

        console.log('Current time: '+gameData.timeOfDay.toString());



        var time8pm = new moment().set({hour:20,minute:0});
        var time9pm = new moment().set({hour:21,minute:0});
        var time5am = new moment().set({hour:5,minute:0});
        var time6am = new moment().set({hour:6,minute:0});
        var time12pm = new moment().set({hour:12,minute:0});
        var time1pm = new moment().set({hour:13,minute:0});
        var time6pm = new moment().set({hour:18,minute:0});

        console.log('Is after 8pm?: '+gameData.timeOfDay.isAfter(time8pm));
        console.log('Is before 9pm?: '+gameData.timeOfDay.isBefore(time9pm));

        if(gameData.timeOfDay.isAfter(time8pm) && gameData.timeOfDay.isBefore(time9pm)){
            console.log('It is dusk');
            timeString = 'dusk'
        }else if(gameData.timeOfDay.isAfter(time9pm) && gameData.timeOfDay.isBefore(time5am)){
            timeString = 'night'
        }else if(gameData.timeOfDay.isAfter(time5am) && gameData.timeOfDay.isBefore(time6am)){
            timeString = 'dawn'
        }else if(gameData.timeOfDay.isAfter(time6am) && gameData.timeOfDay.isBefore(time12pm)){
            timeString = 'morning'
        }else if(gameData.timeOfDay.isAfter(time12pm) && gameData.timeOfDay.isBefore(time1pm)){
            timeString = 'midday'
        }else if(gameData.timeOfDay.isAfter(time1pm) && gameData.timeOfDay.isBefore(time6pm)){
            timeString = 'afternoon'
        }else if(gameData.timeOfDay.isAfter(time6pm) && gameData.timeOfDay.isBefore(time8pm)){
            timeString = 'evening'
        }

        console.log('Timestring: '+timeString);

        return timeString;
    },
    getTimeOfDay: function(){
        return gameData.timeOfDay.format('hh:mma');
    },
    incrementTimeOfDay: function(){
        gameData.timeOfDay.add(5, 'minutes');
    },
    getCannibalLocation: function(){
        return gameData.cannibalLocation;
    },
    getTextStringMap: function(mapRoom,string){

        console.log(gameData);

        return gameData.map[mapRoom].textStrings[string];
    },
    getTextStringItem: function(itemName,string){

        console.log(gameData);
        console.log(itemName);
        console.log(string);

        return gameData.itemStrings[itemName][string];
    }
}

// === Game Data ===
var gameData = {
    commandCounter : 0,
    gameOver : false,
    cannibalLocation: 'Woods',
    timeOfDay: moment("20:05:00", "HH:mm:ss"),
    introText : "Welcome to Actual Cannibal, the Text Adventure game! This is loosely based on the horror-comedy " +
                "song 'Actual Cannibal Shia LaBeouf' by Rob Cantor. This game supports time of day, meaning that the " +
                "in-game time will advance by 5 minutes every action you take. This may affect your ability to see in " +
                "the dark and will have hidden consequences as the game progresses....",
    outroText : 'Thanks for playing!',

    itemStrings: {
        watch: {
            backlight: "You press the backlight button on the watch and a dim glow eminates from it."
        }
    },

    player : {
        currentLocation : 'Woods',
        inventory : {
            watch: {
                displayName: 'Watch',
                description: "A plain wrist watch with a dim back-light. It's not very useful for seeing in the dark.",
                use: function() { return "You look at the watch and press the backlight. A dim glow illuminates the watch. The time reads: " + getTimeOfDay()},
                interactions: {
                    //only default action overrides work here! - you can't define custom interactions - TODO: override the use command to allow this!
                    take: "You pick up the watch and put it on your wrist." //required in order to successfully take the item
                }
            }
        },
        lightSource : false
    },
    map : {
        Woods : new Woods(gameMethods)
    }
};

// === Game Actions ===
var gameActions = {
    time: function(game,command,consoleInterface){

        console.log('Running cartridge command: time');

        //console.log(game.timeOfDay);

        var outputString;

        var timeString = gameMethods.getTimeOfDayAbstract();

        console.log('TimeString: '+timeString);

        switch(timeString){
            case 'dusk':
                outputString = "You look up at the sky. Everything is fading to indigo and purple. It's getting hard to see. You feel cold.";
                break;
            case 'night':
                outputString = "You look up at the sky. It's the middle of the night and you can barely see anything. You feel cold.";
                break;
            case 'dawn':
                outputString = "You look up at the sky. Golden light fills your view as dawn breaks. The sound of crows in the distance fills the air.";
                break;
            case 'morning':
                outputString = "You look up at the sky. A light morning breeze cools your skin as you gaze at the morning sun.";
                break;
            case 'midday':
                outputString = "You look up at the sky. The sun is high above the horizon and beating down on you.";
                break;
            case 'afternoon':
                outputString = "You look up at the sky. It's the afternoon and a chill breeze is starting to kick up.";
                break;
            case 'evening':
                outputString = "You look up at fire-filled sky; golden orange and yellow. Shadows stretch long away from you, clawing at your ankles. You feel cold.";
                break;
            default:
                outputString = "You look up at the sky. It's dark all around. You have no idea what time of day it is.";
                break;
        }

        return outputString;
    },

    wait: function(game,command,consoleInterface){
        return "You wait for a while...";
    },

    take: function(game,command,consoleInterface){
        return eval('gameActions.'+command.action+'(game,command,consoleInterface)');
    },

    use: function(game,command,consoleInterface){
        return eval('gameActions.'+command.action+'(game,command,consoleInterface)');
    }
};

// === Necessary Exports ===
module.exports.gameData = gameData;
module.exports.gameActions = gameActions;











