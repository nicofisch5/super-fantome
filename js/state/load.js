/**
 * State 1 - Game initialisation
 *
 * @type {{preload: preload, create: create}}
 */


var loadState = function(game) {

};

loadState.prototype = {

    preload: function() {

        // Image used by tilemap
//

    },

    create: function() {
        // When all assets are loaded, go to the 'menu' state
        this.game.state.start('menu');
    }

};