Player = function(game) {

    this.game = game;
    this.sprite = null;
    this.cursors = null;
    this.lastYPosition;
    this.velocity = 150;

};

Player.prototype = {

    preload: function () {

        /**
         * 'player' is the name of the image
         * 'assets/ghost_sprite_final.png' is the folder location
         * 92 is width
         * 70 is height
         * the fifth element is how many frames
         */
        this.game.load.spritesheet('player', 'assets/ghost_sprite_final.png', 92, 70);

    },

    create: function () {

        /**
         * Create a new Sprite with specific position and sprite sheet key.
         * This one is player
         *
         * X position of the new sprite.
         * Y position of the new sprite.
         * key This is the image or texture used by the Sprite during rendering
         */
        this.sprite = this.game.add.sprite(65, this.game.world.height - 180, 'player');

        // this.player size
        this.sprite.scale.setTo(0.5, 0.5);

        // We need to enable physics
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

        // Player physics properties. Give the little guy a slight bounce.
        //this.sprite.body.bounce.y = 0.2;
        // To fall down
        //this.sprite.body.gravity.y = 300;
        this.sprite.body.collideWorldBounds = false;

        // Camera
        this.game.camera.follow(this.sprite);

        // Our two animations, walking left and right.
        this.sprite.animations.add('left', [1], 1, true);
        this.sprite.animations.add('right', [2], 2, true);

        // Keyboard cursor
        this.cursor = this.game.input.keyboard.createCursorKeys();

        /**
         * Checks if sprite is still within the world each frame
         * when it leaves the world it dispatches Sprite.events.onOutOfBounds and optionally kills the sprite (if Sprite.outOfBoundsKill is true).
         */
        this.sprite.checkWorldBounds = true;

        // Pass to the other side
        /*this.sprite.events.onOutOfBounds.add(
            function(sprite) {
                if (sprite.x < 0) {
                    sprite.x = 470;
                } else {
                    sprite.x = 0;
                }
            },
            this.sprite
        );*/

        // Player initial Y position, used for camera follow
        this.lastYPosition = this.game.world.height - (this.game.camera.height / 2);
    },

    update: function() {

        // If the left arrow key is pressed
        if (this.cursor.left.isDown) {
            // Move the player to the left
            this.sprite.animations.play('left');
            this.sprite.body.velocity.x = this.velocity * -1;
        }
        // If the right arrow key is pressed
        else if (this.cursor.right.isDown) {
            // Move the player to the right
            this.sprite.animations.play('right');
            this.sprite.body.velocity.x = this.velocity;
        }
        // If the top arrow key is pressed
        else if (this.cursor.up.isDown) {
            // Move the player to the right
            this.sprite.body.velocity.y = this.velocity * -1;
        }
        // If the bottom arrow key is pressed
        else if (this.cursor.down.isDown) {
            // Move the player to the right
            this.sprite.body.velocity.y = this.velocity;
        }
        // If no one is pressed
        else {
            // Stop the player
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
        }

    },

    render: function() {

        this.game.debug.spriteCoords(this.sprite, 32, 500);

    }

}