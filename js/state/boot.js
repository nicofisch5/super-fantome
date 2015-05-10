/**
 * State 0 - Boot
 *
 * @type {{preload: preload, create: create}}
 */

var bootState = {

    preload: function() {

    },

    create: function() {

        // Game environment
        this.game.name = 'Super fantôme';
        this.game.levelNumber = 1;
        this.game.score = 0;
        this.game.lives = 2;

        // If the device is not a desktop, so it's a mobile device
        if (! this.game.device.desktop) {
            // Set the type of scaling to 'show all'
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            // Set the min and max width/height of the game
            /*this.game.scale.minWidth = 250;
            this.game.scale.minHeight = 170;
            this.game.scale.maxWidth = 1000;
            this.game.scale.maxHeight = 680;*/

            // Center the game on the screen
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;

            // Apply the scale changes
            this.game.scale.setScreenSize(true);
        }

        // When all assets are loaded, go to the 'menu' state
        this.game.state.start('load');

    }

};