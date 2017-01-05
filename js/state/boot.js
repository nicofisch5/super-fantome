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

        game.load.json('level', 'assets/json/level.json');
        game.load.json('hud', 'assets/json/hud.json');
        
        game.load.image('tiles', 'assets/tilemaps/tiles/tiles_spritesheet_small.png');
        game.load.image('pixel', 'assets/img/pixel.png'); // Particles

    },

    create: function() {

        game.worldNumber = 1;
        game.levelNumber = 8;
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

        game.state.start('preloader');

    }

};
