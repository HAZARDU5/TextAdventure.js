var _gameMethods;

module.exports = function(defaultLocation,gameMethods){

    _gameMethods = gameMethods;

    console.log('Created instance of Cannibal');

    return {

        location: defaultLocation,

        updateLocation: function(){

        }
    };
};