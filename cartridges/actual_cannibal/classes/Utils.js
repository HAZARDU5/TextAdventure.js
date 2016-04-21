//NOTE: requires server relaunch to read updates to this file!

var Utils = {
    invalidateRequireCacheForFile: function(filePath){
        delete require.cache[require.resolve(filePath)];
    },

    /**
     * Require No Cache
     *
     * Require the module at filePath, ignoring previous cached version.
     * Note filePath is relative to the Utils module. See usage example below.
     *
     * @usage `var Watch = (debug) ? Utils.requireNoCache('../items/Watch.js') : require('../items/Watch.js');`
     *
     * @param filePath
     * @returns {!Object}
     */
    requireNoCache: function(filePath){
        this.invalidateRequireCacheForFile(filePath);
        return require(filePath);
    }
};

module.exports = Utils;