var moment = require('moment');

var GameHelpers = function() {

    console.log('Created GameHelpers singleton');

    var _gameData;

    console.log('Set gameData value of GameHelpers singleton: ',_gameData);

    return {

        setGameData : function (gameData) {
            _gameData = gameData;
        },

        getTimeOfDayAbstract: function () {

            var timeString;

            console.log('Current time: ' + _gameData.timeOfDay.toString());

            var time8pm = new moment().set({hour: 20, minute: 0});
            var time9pm = new moment().set({hour: 21, minute: 0});
            var time5am = new moment().set({hour: 5, minute: 0});
            var time6am = new moment().set({hour: 6, minute: 0});
            var time12pm = new moment().set({hour: 12, minute: 0});
            var time1pm = new moment().set({hour: 13, minute: 0});
            var time6pm = new moment().set({hour: 18, minute: 0});

            console.log('Is after 8pm?: ' + _gameData.timeOfDay.isAfter(time8pm));
            console.log('Is before 9pm?: ' + _gameData.timeOfDay.isBefore(time9pm));

            if (_gameData.timeOfDay.isAfter(time8pm) && _gameData.timeOfDay.isBefore(time9pm)) {
                console.log('It is dusk');
                timeString = 'dusk'
            } else if (_gameData.timeOfDay.isAfter(time9pm) && _gameData.timeOfDay.isBefore(time5am)) {
                timeString = 'night'
            } else if (_gameData.timeOfDay.isAfter(time5am) && _gameData.timeOfDay.isBefore(time6am)) {
                timeString = 'dawn'
            } else if (_gameData.timeOfDay.isAfter(time6am) && _gameData.timeOfDay.isBefore(time12pm)) {
                timeString = 'morning'
            } else if (_gameData.timeOfDay.isAfter(time12pm) && _gameData.timeOfDay.isBefore(time1pm)) {
                timeString = 'midday'
            } else if (_gameData.timeOfDay.isAfter(time1pm) && _gameData.timeOfDay.isBefore(time6pm)) {
                timeString = 'afternoon'
            } else if (_gameData.timeOfDay.isAfter(time6pm) && _gameData.timeOfDay.isBefore(time8pm)) {
                timeString = 'evening'
            }

            console.log('Timestring: ' + timeString);

            return timeString;
        },

        getTimeOfDay: function () {

            console.log('Gamedata: ', _gameData);

            return _gameData.timeOfDay.format('hh:mma');
        },
        incrementTimeOfDay: function () {
            _gameData.timeOfDay.add(5, 'minutes');
        },
        getCannibalLocation: function () {
            return _gameData.cannibal.location;
        },
        getTextStringMap: function (mapRoom, string) {

            console.log(_gameData);

            return _gameData.map[mapRoom].textStrings[string];
        },
        getTextStringItem: function (itemName, string) {

            console.log(_gameData);
            console.log(itemName);
            console.log(string);

            return _gameData.itemStrings[itemName][string];
        }
    }
};

var gameHelpers = new GameHelpers();

module.exports = gameHelpers;


