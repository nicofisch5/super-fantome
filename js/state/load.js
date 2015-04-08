/**
 * State 1 - Game initialisation
 *
 * @type {{preload: preload, create: create}}
 */

var loadState = {

    preload: function() {

        // Image used by tilemap
        this.game.load.image('tiles', 'assets/tilemaps/tiles/tiles_spritesheet_small.png');



    },

    create: function() {
        // When all assets are loaded, go to the 'menu' state
        this.game.state.start('menu');
    }

};