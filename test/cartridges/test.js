/**
 * Created by michael on 25/04/16.
 */
// === Game Data ===
var gameData = {
    commandCounter : 0,
    gameOver : false,
    introText : 'Intro text description.',
    outroText : 'Outro text description.',
    player : {
        currentLocation : 'room1',
        inventory : {},
        flag1 : false
    },
    map : {
        room1 : {
            firstVisit : true,
            displayName : 'Room1',
            description : 'b',
            interactables : {
                interactable1 : { look : 'Interactable1 description' }
            },
            items : {
                item1 : {
                    displayName : 'Item1 Title',
                    description : 'Item1 description',
                    use : function(){return useItem1Function();},
                    quantity : 1,
                    hidden : true
                }
            },
            exits : {
                room2 : {
                    displayName : 'Room2',
                    destination : 'room2'
                }
            },
            setup: function(){

            },
            teardown: function(){

            },
            updateLocation: function(){

            }
        },
        room2 : {
            firstVisit : true,
            displayName : 'Room2',
            description : 'Room2 description',
            exits : {
                room1 : {
                    displayName : 'Room1',
                    destination : 'room1'
                },
                end : {
                    displayName : 'End',
                    destination : 'end'
                }
            }
        },
        end : {
            firstVisit : true,
            description : 'placeholder',
            setup : function(){end();}
        }
    }
};

// === Game Actions ===
var gameActions = {

};

// === Necessary Exports ===
module.exports.gameData = gameData;
module.exports.gameActions = gameActions;

// === Helper Functions ===
function end(){
    if(gameData.player.flag1){
        gameData.map['End'].description = 'You win.';
    } else {
        gameData.map['End'].description = 'You lose.';
    }
    gameData.gameOver = true;
}

function useItem1Function(){
    gameData.player.flag1 = true;
    return 'Used Item1 function.'
}