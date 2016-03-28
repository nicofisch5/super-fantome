/**
 * State 0 - Boot
 *
 * @type {{create: create}}
 */

var bootState = function(game) {

    // Game environment
    game.name = 'Super fantôme';

};

bootState.prototype = {

    preload: function() {

        new Extra().preload();
        new Player().preload();
        new Enemy().preload();
        new Key().preload();

        game.load.json('level', 'assets/level.json');
        game.load.image('tiles', 'assets/tilemaps/tiles/tiles_spritesheet_small.png');
        game.load.image('pixel', 'assets/pixel.png'); // Particles

    },

    create: function() {

        game.levelNumber = 1;
        game.score = 0;

        if (game.device.desktop) {
            game.lives = 3;
        } else {
            game.lives = 4;
        }

        // If the device is not a desktop, so it's a mobile device
        if (! game.device.desktop) {
            // Set the type of scaling to 'show all'
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            // Center the game on the screen
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;

            // Apply the scale changes
            game.scale.refresh();
        }

        // When all assets are loaded, go to the 'menu' state
        game.state.start('menu');

    }

};
