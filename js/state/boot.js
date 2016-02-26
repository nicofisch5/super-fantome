/**
 * State 0 - Boot
 *
 * @type {{create: create}}
 */

var bootState = function(game) {

    // Game environment
    game.name = 'Super fantôme';
    game.levelNumber = 1;
    game.score = 0;

};

bootState.prototype = {

    create: function() {

        if (game.device.desktop) {
            game.lives = 3;
        } else {
            game.lives = 4;
        }

        // If the device is not a desktop, so it's a mobile device
        if (! game.device.desktop) {
            // Set the type of scaling to 'show all'
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            // Set the min and max width/height of the game
            /*game.scale.minWidth = 250;
            game.scale.minHeight = 170;
            game.scale.maxWidth = 1000;
            game.scale.maxHeight = 680;*/

            // Center the game on the screen
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;

            // Apply the scale changes
            game.scale.setScreenSize(true);
        }

        // When all assets are loaded, go to the 'menu' state
        game.state.start('load');

    }

};